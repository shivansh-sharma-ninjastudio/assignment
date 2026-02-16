export const presetBoard = [
  [1, 0, 0, 4],
  [0, 4, 3, 0],
  [0, 2, 1, 0],
  [3, 0, 0, 2],
];

export function isValidSudoku(board: (number | string)[][]): boolean {
  const parsedBoard: number[][] = board.map((row) =>
    row.map((cell) => {
      if (typeof cell === "number") return cell;
      if (cell === "." || cell === "") return 0;
      const num = parseInt(cell, 10);
      return isNaN(num) ? 0 : num;
    }),
  );

  for (let i = 0; i < 4; i++) {
    if (!isValidSet(parsedBoard[i])) return false; // Check row

    const col = parsedBoard.map((row) => row[i]);

    if (!isValidSet(col)) return false; // Check col
  }

  // Check 2x2 subgrids
  for (let r = 0; r < 4; r += 2) {
    for (let c = 0; c < 4; c += 2) {
      const subgrid: number[] = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          subgrid.push(parsedBoard[r + i][c + j]);
        }
      }
      if (!isValidSet(subgrid)) return false;
    }
  }

  return true;
}

function isValidSet(arr: number[]): boolean {
  const nums = arr.filter((n) => n !== 0);
  if (nums.length !== 4) return false;
  const set = new Set(nums);
  return set.size === 4 && nums.every((n) => n >= 1 && n <= 4);
}
