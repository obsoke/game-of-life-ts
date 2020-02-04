/**
 * Creates a "Glider".
 */
export function createGlider(
  cells: boolean[],
  cellsPerDimension: number
): boolean[] {
  cells[1] = true;
  cells[cellsPerDimension + 2] = true;
  cells[cellsPerDimension * 2] = true;
  cells[cellsPerDimension * 2 + 1] = true;
  cells[cellsPerDimension * 2 + 2] = true;

  return cells;
}

/**
 * Creates a random test scene.
 * Found at https://stackoverflow.com/questions/9598552/a-suitable-game-of-life-seed-for-testing
 */
export function createRandomScene(
  cells: boolean[],
  cellsPerDimension: number
): boolean[] {
  // pseudo still lifes
  cells[cellsPerDimension * 1 + 2] = true;
  cells[cellsPerDimension * 4 + 2] = true;
  cells[cellsPerDimension * 1 + 3] = true;
  cells[cellsPerDimension * 2 + 3] = true;
  cells[cellsPerDimension * 3 + 3] = true;
  cells[cellsPerDimension * 4 + 3] = true;

  cells[cellsPerDimension * 1 + 5] = true;
  cells[cellsPerDimension * 2 + 5] = true;
  cells[cellsPerDimension * 3 + 5] = true;
  cells[cellsPerDimension * 4 + 5] = true;
  cells[cellsPerDimension * 1 + 6] = true;
  cells[cellsPerDimension * 4 + 6] = true;

  // hacker emblmen (?)
  cells[cellsPerDimension * 3 + 1] = true;
  cells[cellsPerDimension * 1 + 2] = true;
  cells[cellsPerDimension * 3 + 2] = true;
  cells[cellsPerDimension * 2 + 3] = true;
  cells[cellsPerDimension * 3 + 3] = true;

  return cells;
}
