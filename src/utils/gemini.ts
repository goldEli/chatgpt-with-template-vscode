import { extensionConfig } from "../config";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(extensionConfig.geminiApiKey);
const { setGlobalDispatcher, ProxyAgent } = require("undici");
const dispatcher = new ProxyAgent({
  uri: new URL(extensionConfig.proxy).toString(),
});
console.log(extensionConfig)
//全局fetch调用启用代理
setGlobalDispatcher(dispatcher);

export async function getAnswerByGemini(prompt: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    console.log("start fetch");
    const result = await model.generateContent(prompt);
    console.log("result:", result);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error(error);
  }
}
