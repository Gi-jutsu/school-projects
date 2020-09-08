import { countNQueensSolutions } from './queens'

const [n] = process.argv.slice(-1)

const nSolutions = countNQueensSolutions(
  parseInt(n),
)

console.log(nSolutions)