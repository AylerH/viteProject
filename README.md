# 项目介绍

这个项目是一个使用Vite、React和TypeScript构建的Markdown文件查看器。

## 主要功能

- 以标签卡形式展示多个Markdown文件
- 支持Markdown语法高亮显示
- 支持切换不同的文档

## 技术栈

- Vite: 快速的前端构建工具
- React: 用于构建用户界面的JavaScript库
- TypeScript: JavaScript的类型超集
- Ant Design: 企业级UI设计语言和React组件库

## 使用方法

将Markdown文件放入`public/md_files`目录中，应用将自动加载并显示它们。 

## 环境启动方法

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
开发服务器默认运行在 http://localhost:5173

### 生产环境
```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```
生产构建文件将生成在 `dist` 目录中，可以使用任何静态文件服务器部署。

### 测试环境
```bash
# 运行单元测试
npm run test

# 运行端到端测试
npm run test:e2e
```