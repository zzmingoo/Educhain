import { Suspense } from 'react';
import Navbar from '../../../../../../components/layout/Navbar';
import Footer from '../../../../../../components/layout/Footer';
import KnowledgeEditClient from './KnowledgeEditClient';
import './page.css';

// 静态路径生成 - 编辑页面需要包含草稿和已发布内容
export async function generateStaticParams() {
  const { mockKnowledgeItems } = await import('@/mock/data/knowledge');
  const { generateLocalizedPaths } = await import('@/../static-paths.config');
  
  // 编辑页面需要包含所有内容（包括草稿）
  const editPaths = mockKnowledgeItems
    .slice(0, 30) // 限制数量以避免过多静态页面
    .map((item) => ({
      shareCode: item.shareCode,
    }));
  
  return generateLocalizedPaths(editPaths);
}

// 服务器组件 - 编辑页面不需要预生成，但保持架构一致性
export default function EditKnowledgePage() {
  return (
    <>
      <Navbar />
      <div className="knowledge-edit-page">
        <Suspense fallback={
          <div className="page-content-narrow">
            <div className="loading-state glass-card motion-fade-in">
              <div className="loading-spinner"></div>
              <p>Loading...</p>
            </div>
          </div>
        }>
          <KnowledgeEditClient />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
