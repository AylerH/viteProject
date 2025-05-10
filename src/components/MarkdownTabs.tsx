import React, { useState } from 'react';
import { Tabs } from 'antd';
import MarkdownViewer from './MarkdownViewer';
import { useMdFiles } from '../utils/mdLoader';
import '../styles/MarkdownTabs.css';

const { TabPane } = Tabs;

const MarkdownTabs: React.FC = () => {
  const { loading, files } = useMdFiles();
  const [activeKey, setActiveKey] = useState<string>('');

  // 设置默认显示第一个文件
  React.useEffect(() => {
    if (files.length > 0 && !activeKey) {
      setActiveKey(files[0].name);
    }
  }, [files, activeKey]);

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (files.length === 0) {
    return <div className="no-files">没有找到Markdown文件</div>;
  }

  return (
    <div className="markdown-tabs">
      <Tabs 
        activeKey={activeKey}
        onChange={setActiveKey}
        type="card"
        size="large"
        className="tabs-container"
      >
        {files.map((file) => (
          <TabPane tab={file.name} key={file.name}>
            <MarkdownViewer content={file.content} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default MarkdownTabs; 