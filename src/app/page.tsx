'use client';

import { useState, useEffect } from 'react';
import Board from '@/components/Board';
import Controls from '@/components/Controls';
import LanguageSelector from '@/components/LanguageSelector';
import { GameState } from '@/lib/types';
import { createInitialState, canMove, makeMove } from '@/lib/gameLogic';
import { getAIMove, Difficulty } from '@/lib/ai';
import { Language, getTranslations } from '@/lib/i18n';

export default function Home() {
  const [state, setState] = useState<GameState>(createInitialState());
  const [mode, setMode] = useState<'pvp' | 'pvc'>('pvp');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = getTranslations(language);

  // Show winner modal when game ends
  useEffect(() => {
    if (state.winner) {
      // Small delay before showing modal
      const timer = setTimeout(() => {
        setShowWinnerModal(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowWinnerModal(false);
    }
  }, [state.winner]);

  // Handle AI turn
  useEffect(() => {
    if (mode === 'pvc' && state.turn === 'O' && !state.winner && !isAIThinking) {
      setIsAIThinking(true);
      
      // Add a small delay for better UX
      const timer = setTimeout(() => {
        const aiMove = getAIMove(state, difficulty);
        if (aiMove) {
          const newState = makeMove(state, aiMove);
          setState(newState);
        }
        setIsAIThinking(false);
      }, 300);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, mode, difficulty]);

  const handleCellClick = (index: number) => {
    // Ignore clicks during AI's turn or if game is over
    if (mode === 'pvc' && state.turn === 'O') return;
    if (state.winner) return;
    if (isAIThinking) return;

    // Check if move is valid
    if (!canMove(state, index)) return;

    // Execute move
    if (state.phase === 'placing') {
      const move = { type: 'place' as const, to: index };
      const newState = makeMove(state, move);
      setState(newState);
    } else {
      // Moving phase: cell must be adjacent to FIFO head
      const fifoHead = state.fifo[state.turn][0];
      const move = { type: 'move' as const, from: fifoHead, to: index };
      const newState = makeMove(state, move);
      setState(newState);
    }
  };

  const handleReset = () => {
    setState(createInitialState());
    setIsAIThinking(false);
    setShowWinnerModal(false);
  };

  const handleModeChange = (newMode: 'pvp' | 'pvc') => {
    setMode(newMode);
    handleReset();
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (mode === 'pvc') {
      handleReset();
    }
  };

  const isBoardDisabled = (mode === 'pvc' && state.turn === 'O') || isAIThinking;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-8">
        {/* Game Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Board */}
          <div className="flex flex-col items-center gap-6 w-full lg:flex-1">
            <Board 
              state={state} 
              onCellClick={handleCellClick}
              disabled={isBoardDisabled}
            />
          </div>

          {/* Right Panel - Controls & Settings */}
          <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-md">
            <div className="relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
              
              <div className="space-y-6">
                {/* Top Section - Language & Help */}
                <div className="flex justify-between items-center gap-3 pb-4 border-b border-slate-700/50">
                  <button
                    onClick={() => setShowHelpModal(true)}
                    className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 
                               px-4 py-2.5 rounded-xl border border-slate-600 shadow-lg
                               hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-purple-500
                               focus:outline-none focus:ring-2 focus:ring-purple-500/50
                               active:scale-95 transition-all duration-300 font-semibold"
                  >
                    {t.help}
                  </button>
                  <div className="flex-1">
                    <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                  </div>
                </div>

                {/* Controls */}
                <Controls
                  state={state}
                  mode={mode}
                  difficulty={difficulty}
                  onModeChange={handleModeChange}
                  onDifficultyChange={handleDifficultyChange}
                  onReset={handleReset}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      {showWinnerModal && state.winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowWinnerModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-slate-700 max-w-md w-full animate-fadeIn">
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-purple-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-purple-500 rounded-br-lg"></div>
            
            <div className="flex flex-col items-center gap-6">
              {/* Winner Icon */}
              <div className={`font-bold text-8xl px-8 py-6 rounded-3xl shadow-2xl animate-glow ${
                state.winner === 'X' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
              }`}>
                {state.winner === 'X' ? '✕' : '◯'}
              </div>
              
              {/* Winner Text */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {t.gameOver}
                </h2>
                <p className="text-slate-300 text-xl font-semibold">
                  {state.winner === 'X' ? t.playerX : t.playerO} {t.playerWins}
                </p>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowWinnerModal(false)}
                  className="flex-1 py-3 px-6 bg-slate-700 text-white rounded-xl font-semibold
                           hover:bg-slate-600 active:scale-95 transition-all duration-300 
                           shadow-lg border border-slate-600"
                >
                  {t.close}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold
                           hover:from-purple-500 hover:to-pink-500 active:scale-95 transition-all duration-300 
                           shadow-lg shadow-purple-500/50"
                >
                  {t.playAgain}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help/Rules Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowHelpModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-slate-700 max-w-2xl w-full animate-fadeIn max-h-[90vh] overflow-y-auto">
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-purple-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-purple-500 rounded-br-lg"></div>
            
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="text-center">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {t.howToPlay}
                </h2>
              </div>
              
              {/* Rules Content */}
              <div className="space-y-4 text-slate-300">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <p className="leading-relaxed">{t.rulesPlacing}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <p className="leading-relaxed">{t.rulesMoving}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <p className="leading-relaxed">{t.rulesWinning}</p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg
                         hover:from-purple-500 hover:to-pink-500 active:scale-95 transition-all duration-300 
                         shadow-lg shadow-purple-500/50"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

