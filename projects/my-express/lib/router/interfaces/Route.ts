export interface Route {
  method: string,
  url: string,
  regex: RegExp,
  callback: Function
}
