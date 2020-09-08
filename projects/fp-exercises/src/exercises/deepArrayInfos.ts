type RecursiveArray<A> = Array<number | RecursiveArray<A>>

export const sum = (array: RecursiveArray<number>): number =>
  array.reduce<number>(
    (total, value) =>
      typeof value === 'number' ? total + value : total + sum(value),
    0,
  )

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const depth = (array: RecursiveArray<any>): number =>
  Array.isArray(array) ? 1 + Math.max(...array.map(depth)) : 0
