import {
  add,
  compose,
  composeN,
  create,
  depth,
  sum,
  filter,
  groupBy,
  map,
  memoize,
  partial,
  reduce,
  sub,
} from './exercises'

// :: 01 Deep Array
const array = [1, [[2], 3], [4], 5, [6, 42, [[86], [[12]], 1337]], 1]

console.log('01 Deep Array')
console.log('-------------')
console.log('=> calculate the sum of a deep array', sum(array))
console.log('=> calculate the depth of the array', depth(array))
console.log('=> find the largest value in a tree', '::TODO')
console.log('=> find the smallest value in a tree', '::TODO')

// :: 02 Creating array
console.log('\n 02 Creating array')
console.log('-------------')
console.log('=> Creating array', create<number>(1, 4, 7))

// :: 03 Adding into Array
const arrayToAdd = create<number>(1, 4, 7)

console.log('\n 03 Adding into Array')
console.log('-------------')
console.log('=> Creating array', add(arrayToAdd, 5, 8, 34))

// :: 04 Removing into Array
const arrayToSub = create<number>(1, 2, 8)

console.log('\n 04 Removing into Array')
console.log('-------------')
console.log('=> Removing into array', sub(arrayToSub, 2, 8))

// :: 05 Compose
const add10 = (a: number): number => a + 10
const subtract5 = (a: number): number => a - 5

console.log('\n 05 Compose')
console.log('-------------')
console.log('=> Compose 2 functions', compose(add10, subtract5)(20))

// :: 06 Compose Nary
const multiply2 = (a: number): number => a * 2

console.log('\n 06 Compose Nary')
console.log('-------------')
console.log('=> Compose N functions', composeN(subtract5, add10, multiply2)(5))

// :: 07 Partial
const multiply = (a: number, b: number): number => a * b
const multiply10 = partial<number>(multiply, 10)

console.log('\n 07 Partial')
console.log('-------------')
console.log('=> Using partially applied function', multiply10(10))

// :: 08 Memoize
const fibonacci = (n: number): number =>
  n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)

const memoizedFibonacci = memoize(fibonacci)

console.log('\n 08 Memoize')
console.log('-------------')
console.log('=> Compose N functions', memoizedFibonacci(20))

// :: 09 GroupBy
const users = [
  { name: 'Dylan', age: 22 },
  { name: 'Ruben', age: 18 },
  { name: 'Ewan', age: 21 },
  { name: 'Can', age: 22 },
]

console.log('\n 09 GroupBy')
console.log('-------------')
console.log(
  '=> Compose N functions',
  groupBy(users, value => value.age),
)

// :: 10 Map
const arrayToMap = [1, 2, 3]

console.log('\n 10 Map')
console.log('-------------')
console.log(
  '=> Map function',
  map(arrayToMap, value => value + 1),
)

// :: 11 Filter
const arrayToFilter = [1, 2, 3]

console.log('\n 11 Filter')
console.log('-------------')
console.log(
  '=> Filter function',
  filter(arrayToFilter, value => value === 1),
)

// :: 12 Reduce
const arrayToReduce = [1, 2, 3]

console.log('\n 12 Reduce')
console.log('-------------')
console.log(
  '=> Reduce function',
  reduce(arrayToReduce, (a, b) => a + b, 0),
)
