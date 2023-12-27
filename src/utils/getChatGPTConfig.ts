import { workspace } from 'vscode';
import { extensionName } from '../config';

export const getChatGPTConfig = () => {
    const hostname = workspace
      .getConfiguration(extensionName)
      .get<string>('hostname', 'api.openai.com');
    const apiPath = workspace
      .getConfiguration(extensionName)
      .get<string>('apiPath', '/v1/chat/completions');
    const apiKey = workspace
      .getConfiguration(extensionName)
      .get<string>('apiKey', '');
    const model = workspace
      .getConfiguration(extensionName)
      .get<string>('model', 'gpt-3.5-turbo');
    const maxTokens = workspace
      .getConfiguration(extensionName)
      .get<number>('maxTokens', 2000);
    const temperature = workspace
      .getConfiguration(extensionName)
      .get<number>('temperature', 0.3);
  
    return {
      hostname,
      apiPath,
      apiKey,
      model,
      maxTokens,
      temperature,
    };
  };