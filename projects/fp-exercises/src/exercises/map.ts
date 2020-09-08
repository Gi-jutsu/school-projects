type MapCallback<A, B> = (value: A, index: number, array: ReadonlyArray<A>) => B

export const map = <A, B>(
  array: ReadonlyArray<A>,
  fn: MapCallback<A, B>,
): B[] => {
  const a: B[] = []

  // Iterative way, may be using recursive to respect Functional Programming concept
  for (let i = 0; i < array.length; i++) {
    a.push(fn(array[i], i, array))
  }

  return a
}
