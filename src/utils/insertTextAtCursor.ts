import * as vscode from "vscode";

export function insertTextAtCursor(text: string): void {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const position = editor.selection.active;

    editor.edit((editBuilder) => {
      editBuilder.insert(position, text);
    });
  } else {
    vscode.window.showWarningMessage("No active text editor");
  }
}
