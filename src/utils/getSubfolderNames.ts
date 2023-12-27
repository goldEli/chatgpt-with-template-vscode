import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function getSubfolderNames(folderPath: string): string[] {
  try {
    // 使用同步方式读取目录
    const subfolders = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    return subfolders;
  } catch (error) {
    vscode.window.showErrorMessage(
      `Error getting subfolder names: ${error}`
    );
    return [];
  }
}
