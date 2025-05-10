import { useState, useEffect } from 'react';

interface MdFile {
  name: string;
  content: string;
}

export const useMdFiles = (): { loading: boolean; files: MdFile[] } => {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMdFiles = async () => {
      setLoading(true);
      try {
        // 开发环境使用import.meta.glob，生产环境使用fetch
        if (import.meta.env.DEV) {
          // 开发环境
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
        } else {
          // 生产环境：使用fetch获取文件列表和内容
          // 首先尝试获取README.md
          try {
            const readmeResponse = await fetch('/md_files/README.md');
            if (readmeResponse.ok) {
              const readmeContent = await readmeResponse.text();
              setFiles(files => [...files, { name: 'README', content: readmeContent }]);
            }
          } catch (error) {
            console.error('Failed to load README.md:', error);
          }

          // 然后获取其他已知文件
          const knownFiles = ['介绍', 'show'];
          for (const fileName of knownFiles) {
            try {
              const response = await fetch(`/md_files/${fileName}.md`);
              if (response.ok) {
                const content = await response.text();
                setFiles(files => [...files, { name: fileName, content }]);
              }
            } catch (error) {
              console.error(`Failed to load ${fileName}.md:`, error);
            }
          }

          // 按文件名排序（README已经在前面添加了）
          setFiles(files => 
            files.sort((a, b) => {
              if (a.name === 'README') return -1;
              if (b.name === 'README') return 1;
              return a.name.localeCompare(b.name);
            })
          );
        }
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