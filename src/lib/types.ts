export type Player = 'X' | 'O';

export interface GameState {
  board: (Player | null)[];      // length 9
  turn: Player;                   // 'X' | 'O'
  placed: Record<Player, number>; // how many placed (≤3)
  fifo: Record<Player, number[]>; // queue of indices (FIFO)
  phase: 'placing' | 'moving';
  winner: Player | null;
  winLine?: number[];             // indices of winning line
  moveCount: number;
}

export interface Move {
  type: 'place' | 'move';
  to: number;       // destination index
  from?: number;    // source index (only for 'move')
}

// 3×3 board adjacency map (center connected to all 8 neighbors)
// Index layout:
// 0 1 2
// 3 4 5
// 6 7 8
export const ADJACENCY: Record<number, number[]> = {
  0: [1, 3, 4],
  1: [0, 2, 3, 4, 5],
  2: [1, 4, 5],
  3: [0, 1, 4, 6, 7],
  4: [0, 1, 2, 3, 5, 6, 7, 8], // center connects to all
  5: [1, 2, 4, 7, 8],
  6: [3, 4, 7],
  7: [3, 4, 5, 6, 8],
  8: [4, 5, 7],
};

