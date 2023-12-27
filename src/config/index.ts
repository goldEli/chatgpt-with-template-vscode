import * as path from "path";
import { rootPath } from "../utils/vscodeEnv";

export const extensionName = "chatgpt-with-template";
export const commands = {
  chatTemplate: `${extensionName}.chatTemplate`,
};

export const chatTemplateDirName = "chatTemplate";

export const chatTemplateDir = path.resolve(rootPath, "./chatTemplate");

export const chatTemplateRepoUrl =
"https://github.com/goldEli/chatgpt-with-template-vscode-material.git"; // 替换为你的 GitHub 仓库 URL