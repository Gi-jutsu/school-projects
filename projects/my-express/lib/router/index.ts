import { parse, UrlWithStringQuery } from 'url';
import { Route, Request, Response } from './interfaces';

export default class Router {
  private routes: Route[] = [];
  private middlewares: Function[] = [];

  buildRegex(url: string): RegExp {
    let regex = url.replace(/\//g,'\\/');

    regex = regex.replace(/:(\w*)(\((\w*)\))?/g, (item) => {
      const [,variableName,,variableType=''] = item.match(/:(\w*)(\((\w*)\))?/) as RegExpMatchArray;
      let regexValue: string = '\\w*';

      switch (variableType) {
        case 'integer':
          regexValue = '\\d*';
          break;
      }

      return `(?<${variableName}>${regexValue})`;
    });

    return new RegExp(`^${regex}(\\?(.*))?$`);
  }

  addRoute (method: string, url: string, callback: (req: Request, res: Response) => void): void {
    const regex: RegExp = this.buildRegex(url);
    const newRoute = {method, url, regex, callback};
    const index = this.routes.findIndex((r): boolean => (r.method === method && r.url === url));

    (index === -1) ?
      this.routes.push(newRoute)
    : this.routes[index] = newRoute;
  }

  async dispatch (req: Request, res: Response): Promise<void> {
    const { method, url } = req;

    for (const middleware of this.middlewares) {
      await new Promise( resolve => {
        middleware(req, res, () => resolve());
      });
    }

    const route: (Route|undefined) = this.routes.find( (r): (Route|undefined) => {
      const match = r.regex.exec((url) ? url:'');
      if (match) {
        const variables = (match.groups) ? match.groups:{};
        req.params = { ...req.params, ...variables};

        return r;
      }
    });

    if (route) {
      route.callback(req, res);
    } else {
      res.writeHead(404);
      res.write('404 What were you looking for ?');
      res.end();
    }
  }

  public use(callback: (req: Request, res: Response, next: Function) => void) {
    this.middlewares.push(callback);
  }
}

export { Request, Response }
