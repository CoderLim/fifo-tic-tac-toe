# FIFO 井字棋

一个基于 Next.js 14+ App Router 的井字棋变体游戏，采用 FIFO（先入先出）移动规则。

## 游戏规则

- **玩家**: X（✕，先手）和 O（◯，后手）
- **游戏阶段**:
  1. **放置阶段**: 玩家轮流在空格上放置棋子，直到每方都有 3 枚棋子在棋盘上
  2. **移动阶段**: 玩家必须移动自己最早放置的棋子（FIFO 队首）到棋盘上的任意空格
- **获胜条件**: 首先形成三连一线（横、竖、斜）的玩家获胜

## 游戏模式

- **双人对战 (PVP)**: 本地双人游戏
- **人机对战 (PVC)**: 玩家（X）vs 电脑（O）

## AI 难度

- **简单**: 随机移动，优先获胜或阻止对手获胜
- **中等**: Negamax 算法 + αβ 剪枝（深度 3）
- **困难**: Negamax 算法 + αβ 剪枝（深度 7）

## 技术栈

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看游戏。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
fifo-tic-tac-toe/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 主页面
│   │   └── globals.css   # 全局样式
│   ├── components/       # React 组件
│   │   ├── Board.tsx     # 棋盘组件
│   │   └── Controls.tsx  # 控制面板组件
│   └── lib/              # 游戏逻辑
│       ├── types.ts      # TypeScript 类型定义
│       ├── gameLogic.ts  # 游戏核心逻辑
│       └── ai.ts         # AI 实现
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 关键特性

- ✅ 完整的 FIFO 移动规则实现
- ✅ 视觉提示（FIFO 队首棋子在移动阶段显示半透明）
- ✅ 三种 AI 难度
- ✅ 响应式设计
- ✅ 现代简约 UI
- ✅ 无障碍支持（aria-label）

## 开发说明

### 核心算法

- **FIFO 队列管理**: 每次移动后，将队首棋子出队，新位置入队尾
- **邻接图**: 预定义 3×3 棋盘的邻接关系，中心格（索引 4）连接所有 8 个邻居
- **AI 评估函数**:
  - 两子一线（空一格）: ±3 分
  - 控制中心: ±0.5 分
  - Negamax 搜索深度：中等 3 层，困难 7 层

## License

MIT

