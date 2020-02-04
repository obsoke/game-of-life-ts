import * as Seeders from './seeders';

/**
 * Three rules of Conway's Game of Life
 * With a 10x10 grid of cells, a cell is either populated (true) or empty (false)
 *
 * 1. Any live cell with two OR three neighbours survives
 * 2. Any dead cell with three live neighbours becomes a live cell
 * 3. All other live cells die in the next generation
 */

// Constants
const CELLS_PER_DIM = 50; // # of cells per row/column
const CANVAS_CELL_DIMENSION = 20;
const TOTAL_CELLS = CELLS_PER_DIM * CELLS_PER_DIM;
const LIVE_NEIGHBOURS_ALLOWED = [2, 3];
const NEIGHBOUR_REVIVAL_COUNT = 3;

// Get canvas 2D context
const canvas: HTMLCanvasElement = document.getElementById(
  'canvas'
)! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
ctx.fillStyle = 'black';

// Create main state
let previousCells: boolean[] = [];
const currentCells: boolean[] = [];

// Create seed
for (let i = 0; i < TOTAL_CELLS; ++i) {
  previousCells.push(false);
  currentCells.push(false);
}

// Test: Glider pattern
// previousCells = Seeders.createGlider(previousCells, CELLS_PER_DIM);

// Test: Random seed I found online
previousCells = Seeders.createRandomScene(previousCells, CELLS_PER_DIM);

// Function to find neighbour
const topLeftIdx = (idx: number) => idx - (CELLS_PER_DIM - 1);
const topIdx = (idx: number) => idx - CELLS_PER_DIM;
const topRightIdx = (idx: number) => idx - (CELLS_PER_DIM + 1);
const left = (idx: number) => idx - 1;
const right = (idx: number) => idx + 1;
const bottomLeftIdx = (idx: number) => idx + (CELLS_PER_DIM - 1);
const bottomIdx = (idx: number) => idx + CELLS_PER_DIM;
const bottomRightIdx = (idx: number) => idx + (CELLS_PER_DIM + 1);
const neighbourFn = [
  topLeftIdx,
  topIdx,
  topRightIdx,
  left,
  right,
  bottomLeftIdx,
  bottomIdx,
  bottomRightIdx
];

/**
 * Calculate the number of live neighbours given an index.
 * A cell can have neighbours in 8 direction: up, down, left, right
 * and diagonals.
 * @param currentIdx Current index to calculate neighbours for.
 */
function countLiveNeighbours(currentIdx: number): number {
  let liveNeighbours = 0;

  for (const checkNeighbour of neighbourFn) {
    const neighbourIdx = checkNeighbour(currentIdx);
    if (neighbourIdx < 0 || neighbourIdx >= TOTAL_CELLS) continue;

    if (previousCells[neighbourIdx] === true) liveNeighbours++;
  }

  return liveNeighbours;
}

/**
 * Update the state.
 */
function update() {
  // only update at 30fps

  for (let y = 0; y < CELLS_PER_DIM; ++y) {
    for (let x = 0; x < CELLS_PER_DIM; ++x) {
      const idx = CELLS_PER_DIM * y + x;
      const isCellAlive = previousCells[idx];
      const liveNeighbourCount = countLiveNeighbours(idx);

      if (
        isCellAlive &&
        LIVE_NEIGHBOURS_ALLOWED.indexOf(liveNeighbourCount) !== -1
      ) {
        currentCells[idx] = true;
      } else if (
        !isCellAlive &&
        liveNeighbourCount === NEIGHBOUR_REVIVAL_COUNT
      ) {
        currentCells[idx] = true;
      } else {
        currentCells[idx] = false;
      }
    }
  }
}

/**
 * Clear the buffer & draw the current state to a 2D canvas.
 */
function draw() {
  // clear previous screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < CELLS_PER_DIM; ++y) {
    for (let x = 0; x < CELLS_PER_DIM; ++x) {
      if (currentCells[CELLS_PER_DIM * y + x]) {
        ctx.fillRect(
          x * CANVAS_CELL_DIMENSION,
          y * CANVAS_CELL_DIMENSION,
          CANVAS_CELL_DIMENSION,
          CANVAS_CELL_DIMENSION
        );
      }
    }
  }
}

/**
 * Main loop that gets called (ideally) 60 times a second.
 */
function loop(ts: number) {
  update();
  draw();

  previousCells = [...currentCells];

  requestAnimationFrame(loop);
}

// Begin loop
requestAnimationFrame(loop);
