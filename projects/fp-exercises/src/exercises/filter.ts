type FilterCallback<A> = (value: A, index: number, array: A[]) => Boolean

export const filter = <A>(array: A[], fn: FilterCallback<A>): A[] => {
  const a: A[] = []

  for (let i = 0; i < array.length; i++) {
    const value = array[i]

    if (fn(value, i, array)) {
      a.push(value)
    }
  }

  return a
}
