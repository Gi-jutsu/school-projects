import { readFile, existsSync } from 'fs';
import { join } from 'path';

type Params = Record<string, string|number>;
type Callback = (err: (Error|null), html: string) => void;

export default class TemplateEngineV2 {
  TemplateMethod: { [key: string]: (c: string, v?:number) => string } = {};

  private readonly WWW_DIRECTORY = 'www';

  private readonly TEMPLATE_PAGE_DIRECTORY = 'pages';

  private readonly TEMPLATE_EXTENSION = '.html.mustache';

  constructor() {
    this.initialize();
  }

  public render(fileName: string, params: Params, callback: Callback): void {
    const filePath = join(
      this.TEMPLATE_PAGE_DIRECTORY,
      `${fileName}${this.TEMPLATE_EXTENSION}`,
    );

    if (!existsSync(filePath)) callback(new Error('File not found'), '');

    readFile(filePath, (error: (NodeJS.ErrnoException|null), data: Buffer) => {
      if (error) callback(error, '');

      let html = data.toString();

      if (params) {
        const regex = /{{ ?(\w+)(( ?[|] ?)((\w+)(:(\w+))?))? ?}}/gi;
        const regexConditional = /{{? *if? *(.*)? *}}((\n(.*))*) {{? *endif? *}}/gm;
        html = html.replace(regexConditional, (_, ...args: any[]): string => {
          let [condition] = args;
          const [, content] = args;

          condition = condition.replace(/["]?([a-zA-Z-_]+)["]?/g, (item: string, ...conditionArgs: any[]) => {
            const [otherVariable] = conditionArgs;

            return (item.includes('"')) ? item : `params.${item}`;
          });

          /* eslint-disable no-eval */
          return (!eval(condition)) ? '' : content.trim(); // Désolé Majdi :'( pas eu le temps de refacto cette partie !
        });

        html = html.replace(regex, (_, ...args: any[]): string => {
          const [key,,,, setting,, settingValue] = args;
          let value: string = `${params[key]}`;

          if (!setting) return value;

          value = (settingValue)
            ? this.TemplateMethod[setting](value, settingValue)
            : this.TemplateMethod[setting](value);

          return value;
        });
      }

      callback(null, html);
    });
  }

  initialize() {
    this.TemplateMethod = {
      upper: this.upper,
      lower: this.lower,
      fixed: this.fixed,
    };
  }

  upper(content: string): string {
    return content.toUpperCase();
  }

  lower(content: string): string {
    return content.toLowerCase();
  }

  fixed(content: string, value?: number): string {
    return parseFloat(content).toFixed(value).toString();
  }
}
