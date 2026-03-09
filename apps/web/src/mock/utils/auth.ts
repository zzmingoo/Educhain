/**
 * Mock 认证工具函数
 */

/**
 * 从 Mock Token 中提取用户 ID
 * Mock token 格式: mock_access_token_{userId}
 * 
 * @param token - Authorization header 的值 (例如: "Bearer mock_access_token_2")
 * @returns 用户 ID，如果解析失败返回 null
 */
export function getUserIdFromToken(token: string | null): number | null {
  if (!token) return null;
  
  // 移除 "Bearer " 前缀
  const actualToken = token.startsWith('Bearer ') ? token.substring(7) : token;
  
  // Mock token 格式: mock_access_token_{userId}
  if (actualToken.startsWith('mock_access_token_')) {
    const userId = actualToken.replace('mock_access_token_', '');
    const parsedId = parseInt(userId, 10);
    return isNaN(parsedId) ? null : parsedId;
  }
  
  return null;
}

/**
 * 从请求中获取当前用户 ID
 * 
 * @param request - MSW 请求对象
 * @returns 用户 ID，如果未认证返回 null
 */
export function getCurrentUserId(request: Request): number | null {
  const authHeader = request.headers.get('Authorization');
  return getUserIdFromToken(authHeader);
}

/**
 * 检查请求是否已认证
 * 
 * @param request - MSW 请求对象
 * @returns 是否已认证
 */
export function isAuthenticated(request: Request): boolean {
  return getCurrentUserId(request) !== null;
}
