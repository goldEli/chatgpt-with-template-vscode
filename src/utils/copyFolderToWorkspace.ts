import * as vscode from "vscode";
import * as path from "path";
import * as fsExtra from "fs-extra";
import { extensionName } from "../config";

export async function copyFolderToWorkspace(
  sourceFolder: string,
  targetFolder: string
): Promise<void> {
  try {
    let wf = vscode?.workspace?.workspaceFolders?.[0].uri.path ;
    let f = vscode?.workspace?.workspaceFolders?.[0].uri.fsPath ; 

   const message = `YOUR-EXTENSION: folder: ${wf} - ${f}` ;

    vscode.window.showInformationMessage(message);
    // 获取插件的绝对路径
    const extensionPath =
      vscode.extensions.getExtension(extensionName)?.extensionPath;

    if (extensionPath) {
      // 构造源文件夹的完整路径
      const sourceFolderPath = path.join(extensionPath, sourceFolder);

      // 使用 fs-extra 的 copy 方法，设置 overwrite 选项为 true，确保覆盖目标文件夹
      await fsExtra.copy(sourceFolderPath, targetFolder, { overwrite: true });

      vscode.window.showInformationMessage(
        `Folder copied successfully to ${targetFolder}`
      );
    } else {
      vscode.window.showErrorMessage("Failed to get extension path");
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error copying folder: ${error}`);
  }
}
