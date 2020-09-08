import { parse, UrlWithStringQuery } from 'url';
import {
  createServer, Server, IncomingMessage, ServerResponse,
} from 'http';
import { readFile, readdir } from 'fs';
import { join, extname } from 'path';

import Router, { Request, Response } from './router';
import TemplateEngine from './TemplateEngine';

type Params = Record<string, string|number>;
type Callback = (req: Request, res: Response) => void;
type RenderCallback = (err: (Error|null), html: string) => void;

class MyExpress {
  [x: string]: any;

  private server: Server = createServer();

  private router: Router = new Router();

  private templateEngine: TemplateEngine = new TemplateEngine();

  public mimeType: Record<string, string> = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpeg',
  }

  constructor() {
    this.initialize();
  }

  private initialize() {
    ['GET', 'POST', 'PUT', 'DELETE', 'ALL'].forEach((method:string): void => {
      this[method.toLowerCase()] = (path: string, callback: Callback): void => {
        this.router.addRoute(method, path, callback);
      };
    });

    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const request: Request = this.overrideRequest(req);
      const response: Response = this.overrideResponse(res);

      this.router.dispatch(request, response);
    });
  }

  private overrideResponse(res: ServerResponse): Response {
    const response = res as Response;

    const json = (item: Object): void => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(item));
      res.end();
    };

    const send = (content: string) => {
      res.setHeader('Content-Type', 'text/html');
      res.write(content);
      res.end();
    };

    response.json = json;
    response.send = send;

    return response;
  }

  private overrideRequest(req: IncomingMessage) {
    const request: Request = req as Request;
    const { query }: UrlWithStringQuery = parse((request.url) ? request.url : '');

    if (!request.qParams) request.qParams = {};

    if (query) {
      query.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        request.qParams = { ...request.qParams, [key]: value };
      });
    }

    return request;
  }

  public use(callback: (req: Request, res: Response, next: Function) => void) {
    this.router.use(callback);
  }

  public render(filePath: string, params: Params, callback: RenderCallback): void {
    this.templateEngine.render(filePath, params, callback);
  }

  public static(path: string) {
    const folderPath: string = join(process.cwd(), path);
    readdir(folderPath, (err: (NodeJS.ErrnoException|null), files): void => {
      if (err) throw err;

      files.forEach((file: string): void => {
        this.router.addRoute('GET', `/${file}`, (req: Request, res: Response): void => {
          const filePath: string = join(folderPath, file);
          const fileExtension: string = extname(file).replace('.', '');

          readFile(filePath, (readErr: (NodeJS.ErrnoException|null), data: Buffer): void => {
            if (readErr) throw readErr;

            res.setHeader('Content-Type', this.mimeType[fileExtension]);
            res.write(data);
            res.end();
          });
        });
      });
    });
  }

  listen(port:number):void {
    this.server.listen(port);

    console.log(`Server Is listening on http://localhost:${port}`);
  }
}

export default () => new MyExpress();
