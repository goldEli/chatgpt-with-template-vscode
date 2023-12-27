import * as vscode from "vscode";
import { getSelectedText } from "../utils/getSelectedText";
import { compileEjs } from "../utils/ejs";

const { window } = vscode;

export const chatTemplate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chatgpt-with-template.chatTemplate",
      async () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const selectedText = getSelectedText();

        const items: vscode.QuickPickItem[] = [
          { label: "===下载默认模板===", description: "" },
          { label: "驼峰命名", description: "" },
          { label: "Option 3", description: "" },
        ];

        const selectedOption = await vscode.window.showQuickPick(items, {
          placeHolder: "选择模板",
        });
        vscode.window.showInformationMessage(
          `your select selectedOption: ${selectedOption}, ${typeof selectedOption}`
        );

        if (selectedOption?.label === items[1].label) {
          const code = compileEjs(
            `你是一个为程序员提供命名的助手，你将得到一个功能描述，并为他命名。
          功能描述：<%= rawSelectedText %>。命名规则：小驼峰。命名的长度限制为10。
          只返回命名内容。`,
            { rawSelectedText: selectedText }
          );
          vscode.window.showInformationMessage(`You selected: ${code}`);
        }

        // vscode.window.showInformationMessage(
        //   `your select word: ${selectedText}`
        // );
      }
    )
  );
};
