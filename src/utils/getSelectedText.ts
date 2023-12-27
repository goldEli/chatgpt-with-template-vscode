import * as vscode from "vscode";

export function getSelectedText(): string | undefined {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const selection = editor.selection;
    return editor.document.getText(selection);
  }

  vscode.window.showWarningMessage("No active text editor");
  return undefined;
}
