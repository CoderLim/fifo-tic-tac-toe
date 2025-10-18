'use client';

import { useState, useEffect } from 'react';
import Board from '@/components/Board';
import Controls from '@/components/Controls';
import { GameState } from '@/lib/types';
import { createInitialState, canMove, makeMove } from '@/lib/gameLogic';
import { getAIMove, Difficulty } from '@/lib/ai';

export default function Home() {
  const [state, setState] = useState<GameState>(createInitialState());
  const [mode, setMode] = useState<'pvp' | 'pvc'>('pvp');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isAIThinking, setIsAIThinking] = useState(false);

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
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Title and Board */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            FIFO 井字棋
          </h1>
          <p className="text-gray-600 text-center max-w-md">
            三子棋变体：放置阶段每人放置3枚棋子，移动阶段按先入先出规则移动棋子到任意空格
          </p>
          <Board 
            state={state} 
            onCellClick={handleCellClick}
            disabled={isBoardDisabled}
          />
        </div>

        {/* Controls */}
        <Controls
          state={state}
          mode={mode}
          difficulty={difficulty}
          onModeChange={handleModeChange}
          onDifficultyChange={handleDifficultyChange}
          onReset={handleReset}
        />
      </div>
    </main>
  );
}

