import { useState, useEffect } from 'react';

interface MdFile {
  name: string;
  content: string;
}

interface MdFileIndex {
  name: string;
  path: string;
}

export const useMdFiles = (): { loading: boolean; files: MdFile[] } => {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMdFiles = async () => {
      setLoading(true);
      try {
        // 使用fetch获取文件列表和内容（开发环境和生产环境统一处理方式）
        try {
          // 首先获取索引文件
          const indexResponse = await fetch('/md_files/index.json');
          if (indexResponse.ok) {
            const fileIndex: MdFileIndex[] = await indexResponse.json();
            const loadedFiles: MdFile[] = [];
            
            // 依次加载每个文件
            for (const file of fileIndex) {
              try {
                const response = await fetch(`/md_files/${file.path}`);
                if (response.ok) {
                  const content = await response.text();
                  loadedFiles.push({
                    name: file.name,
                    content
                  });
                }
              } catch (error) {
                console.error(`Failed to load ${file.path}:`, error);
              }
            }
            
            setFiles(loadedFiles);
            setLoading(false);
            return;
          }
        } catch (indexError) {
          console.error('Failed to load index file, falling back to glob import:', indexError);
        }

        // 如果索引文件加载失败，回退到使用import.meta.glob（主要用于开发环境）
        const mdModules = import.meta.glob('/md_files/*.md', { 
          query: '?raw',
          import: 'default',
          eager: true 
        });

        // 将导入的文件转换为MdFile数组
        const loadedFiles = Object.entries(mdModules).map(([path, content]) => {
          // 从路径中提取文件名（去掉路径和扩展名）
          const name = path.split('/').pop()?.replace('.md', '') || '';
          return {
            name,
            content: content as string
          };
        });

        // 自定义排序：README放在最前面，其他按字母顺序排序
        loadedFiles.sort((a, b) => {
          if (a.name === 'README') return -1;
          if (b.name === 'README') return 1;
          return a.name.localeCompare(b.name);
        });
        
        setFiles(loadedFiles);
      } catch (error) {
        console.error('Failed to load markdown files:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMdFiles();
  }, []);

  return { loading, files };
}; 