import { Player, GameState, Move } from './types';
import { getValidMoves, makeMove, checkWinner } from './gameLogic';

export type Difficulty = 'easy' | 'medium' | 'hard';

export function getAIMove(state: GameState, difficulty: Difficulty): Move | null {
  const validMoves = getValidMoves(state);
  if (validMoves.length === 0) return null;

  if (difficulty === 'easy') {
    return getEasyMove(state, validMoves);
  } else {
    const depth = difficulty === 'medium' ? 3 : 7;
    return getBestMove(state, validMoves, depth);
  }
}

function getEasyMove(state: GameState, validMoves: Move[]): Move {
  // 1. Check for immediate win
  for (const move of validMoves) {
    const nextState = makeMove(state, move);
    if (nextState.winner === state.turn) {
      return move;
    }
  }

  // 2. Block opponent's immediate win
  const opponent: Player = state.turn === 'X' ? 'O' : 'X';
  for (const move of validMoves) {
    const nextState = makeMove(state, move);
    // Simulate opponent's moves
    const opponentMoves = getValidMoves({ ...nextState, turn: opponent });
    let shouldBlock = false;
    
    for (const oppMove of opponentMoves) {
      const oppState = makeMove({ ...nextState, turn: opponent }, oppMove);
      if (oppState.winner === opponent) {
        shouldBlock = true;
        break;
      }
    }
    
    if (shouldBlock) {
      return move;
    }
  }

  // 3. Random move
  return validMoves[Math.floor(Math.random() * validMoves.length)];
}

function getBestMove(state: GameState, validMoves: Move[], maxDepth: number): Move {
  let bestMove = validMoves[0];
  let bestScore = -Infinity;
  const alpha = -Infinity;
  const beta = Infinity;

  for (const move of validMoves) {
    const nextState = makeMove(state, move);
    const score = -negamax(nextState, maxDepth - 1, -beta, -alpha, state.turn);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

function negamax(
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: Player
): number {
  // Terminal conditions
  if (state.winner) {
    return state.winner === maximizingPlayer ? 1000 : -1000;
  }

  const validMoves = getValidMoves(state);
  if (validMoves.length === 0 || depth === 0) {
    return heuristic(state, maximizingPlayer);
  }

  let maxScore = -Infinity;

  for (const move of validMoves) {
    const nextState = makeMove(state, move);
    const score = -negamax(nextState, depth - 1, -beta, -alpha, maximizingPlayer);
    
    maxScore = Math.max(maxScore, score);
    alpha = Math.max(alpha, score);
    
    if (alpha >= beta) {
      break; // Beta cutoff
    }
  }

  return maxScore;
}

function heuristic(state: GameState, player: Player): number {
  const board = state.board;
  const opponent: Player = player === 'X' ? 'O' : 'X';
  
  let score = 0;

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];

  // Two-in-a-line with one empty
  for (const [a, b, c] of lines) {
    const cells = [board[a], board[b], board[c]];
    const playerCount = cells.filter(c => c === player).length;
    const opponentCount = cells.filter(c => c === opponent).length;
    const emptyCount = cells.filter(c => c === null).length;

    if (playerCount === 2 && emptyCount === 1) {
      score += 3;
    }
    if (opponentCount === 2 && emptyCount === 1) {
      score -= 3;
    }
  }

  // Center control
  if (board[4] === player) {
    score += 0.5;
  } else if (board[4] === opponent) {
    score -= 0.5;
  }

  return score;
}

