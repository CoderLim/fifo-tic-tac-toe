import { Player, GameState, Move, ADJACENCY } from './types';

export function createInitialState(): GameState {
  return {
    board: Array(9).fill(null),
    turn: 'X',
    placed: { X: 0, O: 0 },
    fifo: { X: [], O: [] },
    phase: 'placing',
    winner: null,
    moveCount: 0,
  };
}

export function checkWinner(board: (Player | null)[]): Player | null {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal \
    [2, 4, 6], // diagonal /
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export function isAdjacent(from: number, to: number): boolean {
  return ADJACENCY[from]?.includes(to) || false;
}

export function getValidMoves(state: GameState): Move[] {
  if (state.winner) return [];

  const moves: Move[] = [];

  if (state.phase === 'placing') {
    // Can place on any empty cell
    for (let i = 0; i < 9; i++) {
      if (state.board[i] === null) {
        moves.push({ type: 'place', to: i });
      }
    }
  } else {
    // Moving phase: only FIFO head piece can move to any empty cell
    const fifoQueue = state.fifo[state.turn];
    if (fifoQueue.length > 0) {
      const from = fifoQueue[0]; // FIFO head
      
      // Can move to any empty cell
      for (let i = 0; i < 9; i++) {
        if (state.board[i] === null) {
          moves.push({ type: 'move', from, to: i });
        }
      }
    }
  }

  return moves;
}

export function makeMove(state: GameState, move: Move): GameState {
  const newState: GameState = {
    ...state,
    board: [...state.board],
    placed: { ...state.placed },
    fifo: {
      X: [...state.fifo.X],
      O: [...state.fifo.O],
    },
    moveCount: state.moveCount + 1,
  };

  if (move.type === 'place') {
    // Place piece
    newState.board[move.to] = state.turn;
    newState.placed[state.turn]++;
    newState.fifo[state.turn].push(move.to);

    // Check if placing phase ends
    if (newState.placed.X === 3 && newState.placed.O === 3) {
      newState.phase = 'moving';
    }
  } else {
    // Move piece (FIFO)
    if (move.from === undefined) return state;
    
    newState.board[move.from] = null;
    newState.board[move.to] = state.turn;
    
    // Update FIFO: remove from head, add to tail
    newState.fifo[state.turn].shift(); // remove FIFO head
    newState.fifo[state.turn].push(move.to); // add to tail
  }

  // Check winner
  newState.winner = checkWinner(newState.board);

  // Switch turn if no winner
  if (!newState.winner) {
    newState.turn = state.turn === 'X' ? 'O' : 'X';
  }

  return newState;
}

export function canMove(state: GameState, cellIndex: number): boolean {
  if (state.winner) return false;
  
  if (state.phase === 'placing') {
    // Can place on empty cell
    return state.board[cellIndex] === null;
  } else {
    // Moving phase: can move FIFO head to any empty cell
    const fifoQueue = state.fifo[state.turn];
    if (fifoQueue.length === 0) return false;
    
    return state.board[cellIndex] === null;
  }
}

