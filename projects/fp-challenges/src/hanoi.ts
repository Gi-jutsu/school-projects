type Disk = number
type Stake = Disk[]
type StakeLabel = 'A' | 'B' | 'C'

type Board = { [key in StakeLabel]: Stake}

/**
 * @name move
 * @param {Stake} source
 * @param {Stake} destination
 * @description move the last element from source to destination
 * @return {[Stake, Stake]} - Return moved version of source and destination
 */
function move(source: Stake, destination: Stake): [Stake, Stake] {
  return [
    [...source.slice(0, -1)],
    [...destination, ...source.slice(-1)],
  ]
}

/**
 * @name initializeBoard
 * @param {number} n - Number of Disks
 * @description Initialize a board with n Disk on A Stake
 * @return {Board}
 */
export function initializeBoard(n: number) {
  return {
    A: [...Array(n)]
      .map((_, i) => i + 1)
      .reverse(),
    B: [],
    C: [],
  }
}

/**
 * @name initializeHanoi
 * @param {number} n - Number of Disks
 * @description Initialize hanoi function
 * @return {(source: StakeLabel, destination: StakeLabel, auxiliary: StakeLabel, n: number) => Board}
 */
export function initializeHanoi(n: number) {
  const board = initializeBoard(n)

  function hanoi(source, destination, auxiliary, height: number = n): Board {
    if (height === 1) {
      //console.log(`Move Disk 1 from ${source} to ${destination}`, board)
      const [movedA, movedC] = move(board[source], board[destination])
      board[source] = movedA
      board[destination] = movedC

      return board
    }

    hanoi(source, auxiliary, destination, height - 1)

    //console.log(`Move Disk ${height} from ${source} to ${destination}`, board)
    const [movedA, movedC] = move(board[source], board[destination])
    board[source] = movedA
    board[destination] = movedC

    return hanoi(auxiliary, destination, source, height - 1)
  }

  return hanoi
}

// TEST
const hanoi = initializeHanoi(30)
console.log(
  'Final Board',
  hanoi('A', 'C', 'B'),
)

/*
  1. Determine the minimum number of displacements necessary to solve the problem by function of N (the number of disks).
    O(2^n)

  2. Assume it takes 42 seconds to move a disc, how long will the game last with thirty discs working day and night ?
   Number of displacements = O(2^30)
   Number of displacements = 1073741823

   Solving Time = Number Of displacements * 42
   Solving Time = 45097156566 seconds
 */