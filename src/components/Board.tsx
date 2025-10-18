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
    <div className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-2xl mx-auto">
      {/* Decorative corner elements */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-500 rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500 rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-500 rounded-br-lg"></div>
      
      <div className="grid grid-cols-3 gap-4 w-full aspect-square">
        {state.board.map((cell, index) => {
          const isFifoHead = cell === state.turn && index === fifoHeadIndex;
          const symbol = cell === 'X' ? '✕' : cell === 'O' ? '◯' : '';
          const isWinningCell = state.winner && state.winLine?.includes(index);

          return (
            <button
              key={index}
              onClick={() => !disabled && onCellClick(index)}
              disabled={disabled}
              aria-label={`Cell ${index + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
              className={`
                group relative flex items-center justify-center
                text-8xl font-bold
                bg-gradient-to-br from-slate-700 to-slate-800
                border-2 
                rounded-2xl
                transition-all duration-300
                shadow-lg
                min-h-[120px]
                ${!disabled && !cell ? 'hover:from-slate-600 hover:to-slate-700 hover:border-purple-400 hover:shadow-purple-500/50 hover:shadow-xl cursor-pointer' : ''}
                ${disabled ? 'cursor-not-allowed opacity-60' : ''}
                ${cell ? 'cursor-default' : ''}
                ${!disabled ? 'active:scale-95' : ''}
                ${isFifoHead ? 'ring-4 ring-yellow-400 ring-opacity-75 animate-pulse-slow border-yellow-400' : 'border-slate-600'}
                ${cell === 'X' ? 'text-cyan-400' : ''}
                ${cell === 'O' ? 'text-rose-400' : ''}
                ${isWinningCell ? 'animate-glow bg-gradient-to-br from-purple-600 to-pink-600' : ''}
                animate-fadeIn
              `}
            >
              {/* Cell highlight effect on hover */}
              {!cell && !disabled && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
              )}
              
              {/* Symbol with drop shadow */}
              <span className={`relative z-10 ${symbol ? 'drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]' : ''} ${isWinningCell ? 'animate-wiggle' : ''}`}>
                {symbol}
              </span>
              
              {/* FIFO Head indicator */}
              {isFifoHead && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shadow-lg">
                  !
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

