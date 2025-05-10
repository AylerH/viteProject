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
        // 获取md_files目录下所有的md文件
        const response = await fetch('/md_files/');
        if (!response.ok) {
          throw new Error('Failed to fetch directory listing');
        }

        // 手动指定要加载的md文件
        const fileNames = ['show.md', '介绍.md'];
        
        const mdFilesPromises = fileNames.map(async (fileName) => {
          const fileResponse = await fetch(`/md_files/${fileName}`);
          if (!fileResponse.ok) {
            console.error(`Failed to load file: ${fileName}`);
            return null;
          }
          const content = await fileResponse.text();
          // 从文件名中提取名称（去掉.md扩展名）
          const name = fileName.replace('.md', '');
          return { name, content };
        });

        const loadedFiles = (await Promise.all(mdFilesPromises)).filter(
          (file): file is MdFile => file !== null
        );
        
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