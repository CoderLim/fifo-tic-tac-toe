'use client';

import { GameState } from '@/lib/types';
import { Difficulty } from '@/lib/ai';
import { Translations } from '@/lib/i18n';

interface ControlsProps {
  state: GameState;
  mode: 'pvp' | 'pvc';
  difficulty: Difficulty;
  onModeChange: (mode: 'pvp' | 'pvc') => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
  t: Translations;
}

export default function Controls({
  state,
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
  onReset,
  t,
}: ControlsProps) {
  return (
    <div className="w-full space-y-5">
      {/* Mode Selection */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 shadow-xl border border-slate-700">
        <div className="flex gap-1">
          <button
            onClick={() => onModeChange('pvp')}
            className={`
              flex-1 py-3 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden whitespace-nowrap text-sm sm:text-base
              ${mode === 'pvp'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
              }
            `}
          >
            <span className="relative z-10">{t.pvp}</span>
          </button>
          <button
            onClick={() => onModeChange('pvc')}
            className={`
              flex-1 py-3 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden whitespace-nowrap text-sm sm:text-base
              ${mode === 'pvc'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
              }
            `}
          >
            <span className="relative z-10">{t.pvc}</span>
          </button>
        </div>
      </div>

      {/* Difficulty Selection (PVC only) */}
      {mode === 'pvc' && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-xl border border-slate-700 animate-fadeIn">
          <div className="text-slate-300 text-sm font-medium mb-3">
            {t.difficulty}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDifficultyChange('easy')}
              className={`
                flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300
                ${difficulty === 'easy'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              {t.easy}
            </button>
            <button
              onClick={() => onDifficultyChange('medium')}
              className={`
                flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300
                ${difficulty === 'medium'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/50'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              {t.medium}
            </button>
            <button
              onClick={() => onDifficultyChange('hard')}
              className={`
                flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300
                ${difficulty === 'hard'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/50'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              {t.hard}
            </button>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-4 px-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl font-bold text-lg
                   hover:from-slate-600 hover:to-slate-700 active:scale-95 transition-all duration-300 
                   shadow-xl border border-slate-600 hover:shadow-slate-500/50 hover:border-slate-500
                   flex items-center justify-center gap-2"
      >
        <span>{t.reset}</span>
      </button>
    </div>
  );
}

