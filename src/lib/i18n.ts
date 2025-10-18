export type Language = 'zh' | 'en' | 'ja' | 'ko' | 'pt' | 'es';

export interface Translations {
  // Game modes
  pvp: string;
  pvc: string;
  
  // Difficulty
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  
  // Actions
  reset: string;
  close: string;
  playAgain: string;
  help: string;
  
  // Game states
  gameOver: string;
  playerWins: string;
  player: string;
  
  // Symbols
  playerX: string;
  playerO: string;
  
  // Help/Rules
  howToPlay: string;
  rulesTitle: string;
  rulesPlacing: string;
  rulesMoving: string;
  rulesWinning: string;
  rulesNote: string;
}

export const translations: Record<Language, Translations> = {
  zh: {
    pvp: '👥 双人对战',
    pvc: '🤖 人机对战',
    difficulty: '🎯 难度选择',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    reset: '🔄 重新开始',
    close: '关闭',
    playAgain: '再来一局',
    help: '❓ 帮助',
    gameOver: '🎉 游戏结束',
    playerWins: '获胜！',
    player: '玩家',
    playerX: '玩家 X',
    playerO: '玩家 O',
    howToPlay: '游戏规则',
    rulesTitle: 'FIFO 井字棋 - 策略性三子棋变体',
    rulesPlacing: '📍 放置阶段：游戏开始时，X 和 O 玩家轮流在棋盘上放置棋子，每人放置 3 枚棋子。',
    rulesMoving: '🔄 移动阶段：所有棋子放置完成后，玩家轮流移动自己的棋子。按照 FIFO（先进先出）规则，最先放置的棋子将被移动到任意空格。',
    rulesWinning: '🏆 获胜条件：率先在横、竖或斜线上连成三子的玩家获胜！',
    rulesNote: '💡 提示：移动阶段时，带有 ! 标记的棋子是 FIFO 队首，将被移动。',
  },
  en: {
    pvp: '👥 PvP',
    pvc: '🤖 vs AI',
    difficulty: '🎯 Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    reset: '🔄 Reset',
    close: 'Close',
    playAgain: 'Play Again',
    help: '❓ Help',
    gameOver: '🎉 Game Over',
    playerWins: 'Wins!',
    player: 'Player',
    playerX: 'Player X',
    playerO: 'Player O',
    howToPlay: 'How to Play',
    rulesTitle: 'FIFO Tic-Tac-Toe - Strategic Variant',
    rulesPlacing: '📍 Placing Phase: At the start, X and O players take turns placing pieces on the board. Each player places 3 pieces.',
    rulesMoving: '🔄 Moving Phase: After all pieces are placed, players take turns moving their pieces. Following FIFO (First In First Out) rules, the oldest piece will be moved to any empty cell.',
    rulesWinning: '🏆 Winning: The first player to get three in a row (horizontally, vertically, or diagonally) wins!',
    rulesNote: '💡 Tip: During the moving phase, pieces marked with ! are at the head of the FIFO queue and will be moved.',
  },
  ja: {
    pvp: '👥 対人戦',
    pvc: '🤖 AI対戦',
    difficulty: '🎯 難易度',
    easy: '簡単',
    medium: '普通',
    hard: '難しい',
    reset: '🔄 リセット',
    close: '閉じる',
    playAgain: 'もう一度',
    help: '❓ ヘルプ',
    gameOver: '🎉 ゲーム終了',
    playerWins: '勝利！',
    player: 'プレイヤー',
    playerX: 'プレイヤー X',
    playerO: 'プレイヤー O',
    howToPlay: 'ルール',
    rulesTitle: 'FIFO 三目並べ - 戦略的バリアント',
    rulesPlacing: '📍 配置フェーズ：ゲーム開始時、X と O のプレイヤーが交互に盤面に駒を配置します。各プレイヤーは 3 個の駒を配置します。',
    rulesMoving: '🔄 移動フェーズ：すべての駒が配置された後、プレイヤーは交互に駒を移動します。FIFO（先入れ先出し）ルールに従い、最初に配置された駒が任意の空きマスに移動されます。',
    rulesWinning: '🏆 勝利条件：縦、横、斜めのいずれかで最初に三つ揃えたプレイヤーが勝利！',
    rulesNote: '💡 ヒント：移動フェーズ中、! マークの駒は FIFO キューの先頭にあり、移動されます。',
  },
  ko: {
    pvp: '👥 플레이어 대전',
    pvc: '🤖 AI 대전',
    difficulty: '🎯 난이도',
    easy: '쉬움',
    medium: '보통',
    hard: '어려움',
    reset: '🔄 재시작',
    close: '닫기',
    playAgain: '다시 하기',
    help: '❓ 도움말',
    gameOver: '🎉 게임 종료',
    playerWins: '승리！',
    player: '플레이어',
    playerX: '플레이어 X',
    playerO: '플레이어 O',
    howToPlay: '게임 규칙',
    rulesTitle: 'FIFO 틱택토 - 전략적 변형',
    rulesPlacing: '📍 배치 단계：게임 시작 시 X와 O 플레이어가 번갈아 보드에 말을 놓습니다. 각 플레이어는 3개의 말을 배치합니다.',
    rulesMoving: '🔄 이동 단계：모든 말이 배치된 후 플레이어는 번갈아 말을 이동합니다. FIFO（선입선출）규칙에 따라 가장 먼저 배치된 말이 빈 칸으로 이동됩니다.',
    rulesWinning: '🏆 승리 조건：가로, 세로 또는 대각선으로 먼저 세 개를 연결한 플레이어가 승리합니다!',
    rulesNote: '💡 팁：이동 단계에서 ! 표시가 있는 말은 FIFO 큐의 맨 앞에 있으며 이동됩니다.',
  },
  pt: {
    pvp: '👥 JvJ',
    pvc: '🤖 vs IA',
    difficulty: '🎯 Dificuldade',
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    reset: '🔄 Reiniciar',
    close: 'Fechar',
    playAgain: 'Jogar Novamente',
    help: '❓ Ajuda',
    gameOver: '🎉 Fim de Jogo',
    playerWins: 'Venceu!',
    player: 'Jogador',
    playerX: 'Jogador X',
    playerO: 'Jogador O',
    howToPlay: 'Como Jogar',
    rulesTitle: 'Jogo da Velha FIFO - Variante Estratégica',
    rulesPlacing: '📍 Fase de Colocação: No início, os jogadores X e O se revezam colocando peças no tabuleiro. Cada jogador coloca 3 peças.',
    rulesMoving: '🔄 Fase de Movimento: Depois que todas as peças são colocadas, os jogadores se revezam movendo suas peças. Seguindo regras FIFO (First In First Out), a peça mais antiga será movida para qualquer célula vazia.',
    rulesWinning: '🏆 Vitória: O primeiro jogador a conseguir três em linha (horizontal, vertical ou diagonal) vence!',
    rulesNote: '💡 Dica: Durante a fase de movimento, peças marcadas com ! estão no início da fila FIFO e serão movidas.',
  },
  es: {
    pvp: '👥 JvJ',
    pvc: '🤖 vs IA',
    difficulty: '🎯 Dificultad',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    reset: '🔄 Reiniciar',
    close: 'Cerrar',
    playAgain: 'Jugar de Nuevo',
    help: '❓ Ayuda',
    gameOver: '🎉 Fin del Juego',
    playerWins: '¡Ganó!',
    player: 'Jugador',
    playerX: 'Jugador X',
    playerO: 'Jugador O',
    howToPlay: 'Cómo Jugar',
    rulesTitle: 'Tres en Raya FIFO - Variante Estratégica',
    rulesPlacing: '📍 Fase de Colocación: Al inicio, los jugadores X y O se turnan colocando fichas en el tablero. Cada jugador coloca 3 fichas.',
    rulesMoving: '🔄 Fase de Movimiento: Después de colocar todas las fichas, los jugadores se turnan moviendo sus fichas. Siguiendo reglas FIFO (First In First Out), la ficha más antigua se moverá a cualquier casilla vacía.',
    rulesWinning: '🏆 Victoria: ¡El primer jugador en conseguir tres en línea (horizontal, vertical o diagonal) gana!',
    rulesNote: '💡 Consejo: Durante la fase de movimiento, las fichas marcadas con ! están al frente de la cola FIFO y serán movidas.',
  },
};

export const languageNames: Record<Language, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  es: 'Español',
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}

