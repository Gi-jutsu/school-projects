type ReduceCallback<A> = (
  previousValue: A,
  currentValue: A,
  index: number,
  array: ReadonlyArray<A>,
) => A

export const reduce = <A>(
  array: ReadonlyArray<A>,
  callback: ReduceCallback<A>,
  initialValue: A,
): A => {
  let previous = initialValue

  for (let i = 0; i < array.length; i++) {
    previous = callback(previous, array[i], i, array)
  }

  return previous
}
