import * as path from "path";
import { rootPath } from "../utils/vscodeEnv";
import { workspace } from "vscode";

export const extensionName = "chatgpt-with-template";
export const commands = {
  chatTemplate: `${extensionName}.chatTemplate`,
};

export const chatTemplateDirName = "chatTemplate";

export const chatTemplateDir = path.resolve(rootPath, "./chatTemplate");

export const chatTemplateRepoUrl =
  "https://github.com/goldEli/chatgpt-with-template-vscode-material.git"; // 替换为你的 GitHub 仓库 URL

export const extensionConfig = (() => {
  const hostname = workspace
    .getConfiguration(extensionName)
    .get<string>("hostname", "api.openai.com");
  const apiPath = workspace
    .getConfiguration(extensionName)
    .get<string>("apiPath", "/v1/chat/completions");
  const apiKey = workspace
    .getConfiguration(extensionName)
    .get<string>("apiKey", "");
  const model = workspace
    .getConfiguration(extensionName)
    .get<string>("model", "gpt-3.5-turbo");
  const maxTokens = workspace
    .getConfiguration(extensionName)
    .get<number>("maxTokens", 2000);
  const temperature = workspace
    .getConfiguration(extensionName)
    .get<number>("temperature", 0.3);
  const ai = workspace
    .getConfiguration(extensionName)
    .get<string>("ai", "gemini");
  const proxy = workspace
    .getConfiguration(extensionName)
    .get<string>("proxy", "http://127.0.0.1:7890");

  const geminiApiKey = workspace
    .getConfiguration(extensionName)
    .get<string>("geminiApiKey", "");
  return {
    proxy,
    geminiApiKey,
    ai,
    hostname,
    apiPath,
    apiKey,
    model,
    maxTokens,
    temperature,
  };
})();
