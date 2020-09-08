type Fn<A, B> = (a: A) => B

export const groupBy = <A, B>(array: A[], fn: Fn<A, B>): Map<B, A[]> => {
  const collection = new Map<B, A[]>()

  array.map(value => {
    const key = fn(value)

    if (!collection.has(key)) {
      collection.set(key, [])
    }
    collection.get(key).push(value)
  })

  return collection
}
