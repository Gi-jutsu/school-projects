import { IncomingMessage } from 'http';

export interface Request extends IncomingMessage {
  params: Record<string, (string|number)>,
  qParams: Record<string, (string|number)>
}
