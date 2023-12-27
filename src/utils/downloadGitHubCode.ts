import * as vscode from "vscode";
import * as cp from "child_process";
import * as path from "path";
import * as fsExtra from "fs-extra";

export async function downloadGitHubCode(
  repoUrl: string,
  targetFolder: string
): Promise<void> {
  try {
    // 使用 git clone 命令下载 GitHub 代码
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Downloading GitHub Code",
        cancellable: false,
      },
      async (progress, token) => {
        const gitCloneCommand = `git clone ${repoUrl} ${targetFolder}`;
        await executeCommand(gitCloneCommand);
      }
    );

    // 删除 .git 文件夹
    const gitFolder = path.join(targetFolder, ".git");
    await fsExtra.remove(gitFolder);

    vscode.window.showInformationMessage(
      `GitHub code downloaded to ${targetFolder}`
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      `Error downloading GitHub code: ${error}`
    );
  }
}

function executeCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || stdout || "Failed to execute command."));
      } else {
        resolve();
      }
    });
  });
}
