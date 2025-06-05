# tocc-admin
>  基于 QianKun + Vite 整合 React + Vue 后台管理系统

## ✨ Features
- 🌈 使用 React 19 hooks 进行构建。
- 📦 基于 Vite 进行快速开发和热模块替换。
- 🎨 集成 Ant Design，提供丰富的 UI 组件和设计模式。
- 🌍 使用 TypeScript 编写，提供类型安全性和更好的开发体验。
- 🌍 基于 MSW 和 Faker.js 的Mock方案
- ⚙️ 使用 Zustand 进行状态管理
- ⚙️ 使用 React-Query 进行数据获取

## ⌨️ Development

### 获取项目代码
```bash
git clone https://github.com/chuxin-cs/chuxin-admin.git
```

### 安装依赖
在项目根目录下运行以下命令安装项目依赖：
```bash
pnpm install
```

### 启动开发服务器
运行以下命令以启动开发服务器：
```bash
pnpm dev
```

### 构建生产版本
运行以下命令以构建生产版本：
```bash
pnpm build
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中