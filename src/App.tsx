// import React from 'react'
import './App.css'
import MarkdownTabs from './components/MarkdownTabs'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Markdown文档查看器</h1>
      </header>
      <main className="app-content">
        <MarkdownTabs />
      </main>
      <footer className="app-footer">
        <p>使用Vite + React + TypeScript构建</p>
      </footer>
    </div>
  )
}

export default App
