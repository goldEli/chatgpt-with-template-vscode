import * as vscode from "vscode";

const { window } = vscode;

export const chatTemplate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chatgpt-with-template.chatTemplate",
      () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage(
          "Hello World from chatgpt-with-template!"
        );
      }
    )
  );
};
