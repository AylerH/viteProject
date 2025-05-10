# 实现功能
* 所有.md文件的标签显示，且在生产环境中可现实；
* md中可包含图片；

# 问题
## 找不到.md文件
```
mdLoader.ts 的改动：
移除了 /public 前缀，使用正确的路径 /md_files/*.md
设置 eager: false 以支持异步加载
添加了错误处理和文件加载失败的容错机制
使用 Promise.all 并行加载所有文件
vite.config.ts 的改动：
添加了 build.rollupOptions 配置
自定义 assetFileNames 以保持 md 文件的原始路径结构
确保 md 文件在构建时被正确复制到输出目录
```
## md上面的图片在render正式环境上都不显示
```
将图片都放入public\images后，导入指定md文件；
```

## 在开发环境（npm run dev）中找不到 Markdown 文件，但在构建后（npm run build）能找到
```
统一了开发环境和生产环境的文件加载方式
在开发和构建前都自动生成索引文件
确保 Markdown 文件中的图片路径使用相对路径，指向项目中的图片
```