type Fn<A> = (a: A) => A

export const composeN = <A>(...functions: Fn<A>[]) => (x: A) =>
  functions.reduce((y, fn) => fn(y), x)
