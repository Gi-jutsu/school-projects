type Fn<A, B> = (a: A) => B

export const compose = <A, B, C>(f: Fn<A, B>, g: Fn<B, C>): ((x: A) => C) => (
  x: A,
) => g(f(x))
