import { Suspense } from 'react';
import Navbar from '../../../../../../components/layout/Navbar';
import Footer from '../../../../../../components/layout/Footer';
import KnowledgeVersionsClient from './KnowledgeVersionsClient';
import './page.css';

// 静态路径生成（用于静态导出）
export async function generateStaticParams() {
  const { knowledgeStaticPaths, generateLocalizedPaths } = await import('@/../static-paths.config');
  return generateLocalizedPaths(knowledgeStaticPaths);
}

// 服务器组件 - 负责静态生成
export default function KnowledgeVersionsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="knowledge-versions-page">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      }>
        <KnowledgeVersionsClient />
      </Suspense>
      <Footer />
    </>
  );
}
