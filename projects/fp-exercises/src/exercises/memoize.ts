// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn<A> = (...args: any[]) => A

export const memoize = <A>(fn: Fn<A>): Fn<A> => {
  const memo: Record<string, A> = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]): A => {
    const stringifiedArgs = JSON.stringify(args)

    if (memo.hasOwnProperty(stringifiedArgs)) {
      return memo[stringifiedArgs]
    }

    memo[stringifiedArgs] = fn(...args)
    return memo[stringifiedArgs]
  }
}
