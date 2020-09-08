import myExpress from './lib/MyExpress';
import { Request, Response } from './lib/router';

const app = myExpress();

app.use( (req: Request, res: Response, next: Function) => {
  console.log('Time: %d', Date.now());
  next();
});

app.static('/static');

app.get('/api', (req: Request, res: Response) => {
  res.json({ hello: 'From API' });
});

app.get('/home', (req: Request, res: Response) => {
  app.render('home', { name: 'Ch0pper', weight: 33.1337}, (error, html) => {
    if (error) {
      res.json({ error: error.message });
    } else {
      res.send(html);
    }
  });
});

app.get('/user/:id(integer)', (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`The user id is ${id}`);

  res.json({ id });
});

app.get('/user/:id/books/:id_books', (req: Request, res: Response) => {
  const { id, id_books } =  req.params;
  res.json({ id, id_books });
});

app.get('/users', (req: Request, res: Response) => {
  const { limit, status } = req.qParams;
  console.log(`The limitation is ${limit} for ${status} users`)

  res.json({ limit, status });
});

app.listen(8080);
