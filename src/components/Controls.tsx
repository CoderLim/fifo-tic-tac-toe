'use client';

import { GameState } from '@/lib/types';
import { Difficulty } from '@/lib/ai';

interface ControlsProps {
  state: GameState;
  mode: 'pvp' | 'pvc';
  difficulty: Difficulty;
  onModeChange: (mode: 'pvp' | 'pvc') => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
}

export default function Controls({
  state,
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
  onReset,
}: ControlsProps) {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Mode Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange('pvp')}
          className={`
            flex-1 py-3 px-4 rounded-lg font-semibold transition-all
            ${mode === 'pvp'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          双人对战 (PVP)
        </button>
        <button
          onClick={() => onModeChange('pvc')}
          className={`
            flex-1 py-3 px-4 rounded-lg font-semibold transition-all
            ${mode === 'pvc'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          人机对战 (PVC)
        </button>
      </div>

      {/* Difficulty Selection (PVC only) */}
      {mode === 'pvc' && (
        <div className="flex gap-2">
          <button
            onClick={() => onDifficultyChange('easy')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${difficulty === 'easy'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            简单
          </button>
          <button
            onClick={() => onDifficultyChange('medium')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${difficulty === 'medium'
                ? 'bg-yellow-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            中等
          </button>
          <button
            onClick={() => onDifficultyChange('hard')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${difficulty === 'hard'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            困难
          </button>
        </div>
      )}

      {/* Game Status */}
      <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">阶段：</span>
          <span className="font-semibold text-lg">
            {state.phase === 'placing' ? '放置阶段' : '移动阶段'}
          </span>
        </div>
        
        {!state.winner && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">回合：</span>
            <span className={`font-bold text-2xl ${
              state.turn === 'X' ? 'text-blue-600' : 'text-red-600'
            }`}>
              {state.turn === 'X' ? '✕' : '◯'}
            </span>
          </div>
        )}

        {state.winner && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">获胜者：</span>
            <span className={`font-bold text-3xl ${
              state.winner === 'X' ? 'text-blue-600' : 'text-red-600'
            }`}>
              {state.winner === 'X' ? '✕' : '◯'}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">已放置：</span>
          <span className="text-gray-700">
            <span className="text-blue-600 font-semibold">✕ {state.placed.X}</span>
            {' / '}
            <span className="text-red-600 font-semibold">◯ {state.placed.O}</span>
          </span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg font-semibold
                   hover:bg-gray-700 active:scale-95 transition-all shadow-lg"
      >
        重新开始
      </button>
    </div>
  );
}

