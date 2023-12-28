import * as vscode from "vscode";
import { getSelectedText } from "../utils/getSelectedText";
import { compileEjs, compileEjsFile } from "../utils/ejs";
import { copyFolderToWorkspace } from "../utils/copyFolderToWorkspace";
import { getRootPath } from "../utils/context";
import { downloadGitHubCode } from "../utils/downloadGitHubCode";
import * as path from "path";
import { rootPath } from "../utils/vscodeEnv";
import {
  chatTemplateDir,
  chatTemplateRepoUrl,
  extensionConfig,
} from "../config";
import { getSubfolderNames } from "../utils/getSubfolderNames";
import { getChatGPTConfig } from "../utils/getChatGPTConfig";
import { createChatCompletion } from "../utils/openai";
import {
  pasteToEditor,
  readFileContent,
  showErrorMessage,
  showMessage,
} from "../utils";
import { getAnswerByGemini } from "../utils/gemini";
import { insertTextAtCursor } from "../utils/insertTextAtCursor";

const { window } = vscode;

export const chatTemplate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chatgpt-with-template.chatTemplate",
      async () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const selectedText = getSelectedText();
        const names = getSubfolderNames(chatTemplateDir);

        const items: vscode.QuickPickItem[] = [
          { label: "===下载默认模板===", description: "" },
          ...names?.map((item) => {
            return {
              label: item,
            };
          }),
        ];

        const selectedOption = await vscode.window.showQuickPick(items, {
          placeHolder: "选择模板",
        });

        // download
        if (selectedOption?.label === items[0].label) {
          //   copyFolderToWorkspace("../chatTemplate", getRootPath());

          await downloadGitHubCode(chatTemplateRepoUrl, chatTemplateDir);
          return;
        }
        const p = path.resolve(
          rootPath,
          `./chatTemplate/${selectedOption?.label}/template.ejs`
        );
        const code = await compileEjsFile(p, {
          rawSelectedText: selectedText,
        });

        showMessage(`You selected: ${selectedText}`);
        showMessage(`Your prompt: ${code}`);
        if (selectedOption?.label?.startsWith("insert")) {
          pasteToEditor(code);
          return;
        }

        if (selectedOption?.label) {
          if (extensionConfig.ai === "openai") {
            const config = getChatGPTConfig();
            const res = await createChatCompletion({
              hostname: config.hostname,
              apiPath: config.apiPath,
              apiKey: config.apiKey,
              model: config.model,
              messages: [{ role: "user", content: code }],
              maxTokens: config.maxTokens,
              // handleChunk: options.handleChunk,
            });
            showMessage(`chatgpt answer: ${res}`);
            pasteToEditor(res);
            return;
          }
          const res = await getAnswerByGemini(code);
          showMessage(`chatgpt answer: ${res}`);
          pasteToEditor(res);
        }

        // vscode.window.showInformationMessage(
        //   `your select word: ${selectedText}`
        // );
      }
    )
  );
};
