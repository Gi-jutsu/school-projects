import { ServerResponse } from 'http';

export interface Response extends ServerResponse {
  send: (html: string) => void,
  json: (item: Object) => void
}
