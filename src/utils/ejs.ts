import * as ejs from "ejs";

export const compileEjs = (templateString: string, model?: ejs.Data) =>
  ejs.render(templateString, model);

export const compileEjsFile = (fileName: string, model?: ejs.Data) => {
  return ejs.renderFile(fileName, model);
};
