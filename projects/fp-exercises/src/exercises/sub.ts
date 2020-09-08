export const sub = <T>(array: T[], ...values: T[]): T[] =>
  array.filter(value => values.indexOf(value) === -1)
