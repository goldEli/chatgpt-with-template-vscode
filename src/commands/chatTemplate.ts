import * as vscode from "vscode";
import { getSelectedText } from "../utils/getSelectedText";
import { compileEjs } from "../utils/ejs";
import { copyFolderToWorkspace } from "../utils/copyFolderToWorkspace";
import { getRootPath } from "../utils/context";
import { downloadGitHubCode } from "../utils/downloadGitHubCode";
import * as path from "path";
import { rootPath } from "../utils/vscodeEnv";
import { chatTemplateDir, chatTemplateRepoUrl } from "../config";
import { getSubfolderNames } from "../utils/getSubfolderNames";
import { getChatGPTConfig } from "../utils/getChatGPTConfig";
import { createChatCompletion } from "../utils/openai";
import { pasteToEditor } from "../utils";

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

        if (selectedOption?.label) {
          const code = compileEjs(
            `你是一个为程序员提供命名的助手，你将得到一个功能描述，并为他命名。
          功能描述：<%= rawSelectedText %>。命名规则：小驼峰。命名的长度限制为10。
          只返回命名内容。`,
            { rawSelectedText: selectedText }
          );
          const config = getChatGPTConfig();
          vscode.window.showInformationMessage(`You selected: ${code}`);
          const res = await createChatCompletion({
            hostname: config.hostname,
            apiPath: config.apiPath,
            apiKey: config.apiKey,
            model: config.model,
            messages: [{ role: "user", content: code }],
            maxTokens: config.maxTokens,
            // handleChunk: options.handleChunk,
          });
          vscode.window.showInformationMessage(
            `chatgpt answer: ${res}`
          );
          pasteToEditor(res)
        }

        // vscode.window.showInformationMessage(
        //   `your select word: ${selectedText}`
        // );
      }
    )
  );
};
