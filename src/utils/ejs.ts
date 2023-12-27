import * as ejs from "ejs";

export const compileEjs = (templateString: string, model?: ejs.Data) =>
  ejs.render(templateString, model);
