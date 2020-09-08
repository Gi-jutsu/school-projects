/**
 * @name countNQueensSolutions
 * @param n - number of queens to place
 * @description Count the available solutions of N Queen problem using bits
 * @return {number} - Return number of solutions
 */
export function countNQueensSolutions(n: number): number {
  let nSolutions = 0

  function recursive(leftDiagonal: number, columns: number, rightDiagonal: number): void {
    const N_BIT_MAX = Math.pow(2, n) - 1

    // Check if all columns are occupied, if true then solution is complete
    if (columns === N_BIT_MAX) {
      nSolutions++
      return
    }

    // Bits sequence representing by "1" the available columns
    let availableColumns = ~(leftDiagonal | rightDiagonal | columns)

    while (availableColumns & N_BIT_MAX) {
      // Retrieve the available column for the current row
      const availableColumn = availableColumns & -availableColumns
      availableColumns -= availableColumn

      recursive(
        (leftDiagonal | availableColumn) >> 1, // Keep track of diagonal for next recursive
        columns | availableColumn,
        (rightDiagonal | availableColumn) << 1, // Keep track of diagonal for next recursive
      )
    }
  }

  recursive(0, 0, 0)
  return nSolutions
}