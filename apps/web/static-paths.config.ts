/**
 * 静态路径配置
 * 用于 Next.js 静态导出时预生成重要页面
 */

// 从 Mock 数据导入
import { mockKnowledgeItems } from './src/mock/data/knowledge';
import { mockBlocks } from './src/mock/data/blockchain';

/**
 * 需要预生成的知识详情页面
 * 开发模式：包含所有内容（包括草稿）
 * 生产模式：只预生成前 30 个已发布的知识页面
 */
export const knowledgeStaticPaths = 
  process.env.NODE_ENV === 'development'
    ? mockKnowledgeItems
        .filter((item) => item.status !== -2) // 排除已删除的内容
        .map((item) => ({
          shareCode: item.shareCode,
        }))
    : mockKnowledgeItems
        .filter((item) => item.status === 1) // 只包含已发布的内容
        .slice(0, 30)
        .map((item) => ({
          shareCode: item.shareCode,
        }));

/**
 * 需要预生成的区块详情页面
 * 只预生成前 20 个区块（展示区块链功能）
 */
export const blockStaticPaths = mockBlocks
  .slice(0, 20)
  .map((block) => ({
    id: String(block.index),
  }));

/**
 * 需要预生成的交易详情页面
 * 1. 从区块中提取交易ID
 * 2. 同时支持知识ID（因为组件使用知识ID跳转）
 */
export const transactionStaticPaths = [
  // 交易ID路径
  ...mockBlocks
    .flatMap((block) => block.transactions)
    .slice(0, 30)
    .map((tx) => ({
      id: tx.id,
    })),
  // 知识ID路径（支持通过知识ID访问交易）
  ...mockKnowledgeItems
    .filter((item) => item.status === 1)
    .slice(0, 30)
    .map((item) => ({
      id: String(item.id),
    })),
];

/**
 * 支持的语言列表
 */
export const locales = ['zh-CN', 'en'] as const;

/**
 * 生成所有语言的路径
 */
export function generateLocalizedPaths<T extends Record<string, string>>(
  paths: T[]
): Array<T & { locale: string }> {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      ...path,
      locale,
    }))
  );
}
