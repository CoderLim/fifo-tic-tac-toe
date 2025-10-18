'use client';

import { GameState } from '@/lib/types';

interface BoardProps {
  state: GameState;
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

export default function Board({ state, onCellClick, disabled = false }: BoardProps) {
  const getFifoHeadIndex = (): number | null => {
    if (state.phase === 'moving' && state.fifo[state.turn].length > 0) {
      return state.fifo[state.turn][0];
    }
    return null;
  };

  const fifoHeadIndex = getFifoHeadIndex();

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-md aspect-square">
      {state.board.map((cell, index) => {
        const isFifoHead = cell === state.turn && index === fifoHeadIndex;
        const symbol = cell === 'X' ? '✕' : cell === 'O' ? '◯' : '';

        return (
          <button
            key={index}
            onClick={() => !disabled && onCellClick(index)}
            disabled={disabled}
            aria-label={`Cell ${index + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
            className={`
              flex items-center justify-center
              text-6xl font-bold
              bg-white border-2 border-gray-300
              rounded-lg
              transition-all duration-200
              hover:border-blue-400 hover:bg-blue-50
              active:scale-95
              disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-white
              ${isFifoHead ? 'opacity-50' : 'opacity-100'}
              ${cell === 'X' ? 'text-blue-600' : ''}
              ${cell === 'O' ? 'text-red-600' : ''}
            `}
          >
            {symbol}
          </button>
        );
      })}
    </div>
  );
}

