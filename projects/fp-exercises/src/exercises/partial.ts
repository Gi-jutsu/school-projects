type Fn<A> = (...args: A[]) => A

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const partial = <A>(fn: Fn<A>, ...args: any[]): Fn<A> =>
  fn.bind(null, ...args)
