import fs from 'fs';
import path from 'path';

// 指定Markdown文件目录
const mdDir = path.resolve('public/md_files');
const outputFile = path.resolve('public/md_files/index.json');

// 读取目录中的所有.md文件
try {
  const files = fs.readdirSync(mdDir)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      name: file.replace('.md', ''),
      path: file
    }));

  // 按文件名排序，README放在最前面
  files.sort((a, b) => {
    if (a.name === 'README') return -1;
    if (b.name === 'README') return 1;
    return a.name.localeCompare(b.name);
  });

  // 写入索引文件
  fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
  console.log(`Generated Markdown index with ${files.length} files at ${outputFile}`);
} catch (error) {
  console.error('Error generating Markdown index:', error);
  process.exit(1);
} 