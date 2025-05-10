import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'], // 将md文件作为资源处理
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.md')) {
            // 保持md文件的原始路径结构
            return 'md_files/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // 确保public目录下的文件被复制到dist目录
    copyPublicDir: true,
  },
  publicDir: 'public',
})
