# API 接口文档

## 1. 接口概述

### 1.1 基础信息

- **Base URL**: `http://localhost:8000`
- **协议**: HTTP/HTTPS
- **数据格式**: JSON
- **字符编码**: UTF-8
- **认证方式**: JWT Bearer Token（可选）

### 1.2 认证说明

区块链服务支持可选的JWT认证：

**禁用认证模式（默认）**：
- 所有API无需认证即可访问
- 与现有系统完全兼容

**启用认证模式**：
- 需要在请求头中包含有效的JWT token
- 格式：`Authorization: Bearer <token>`
- 与后端系统共享JWT密钥和认证逻辑

**认证状态检查**：
```bash
curl http://localhost:8000/api/auth/status
```

### 1.3 通用响应格式

#### 成功响应
```json
{
  "data": { ... },
  "status": "success"
}
```

#### 错误响应
```json
{
  "detail": "错误描述信息"
}
```

### 1.4 HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 认证失败或token无效 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 2. 认证接口

### 2.1 认证状态检查

**接口**: `GET /api/auth/status`

**描述**: 检查认证配置状态

**请求示例**:
```bash
curl http://localhost:8000/api/auth/status
```

**响应示例**:
```json
{
  "auth_enabled": true,
  "jwt_configured": true,
  "version": "2.0.0"
}
```

## 3. 系统接口

### 3.1 服务信息

**接口**: `GET /`

**描述**: 获取服务基本信息

**请求示例**:
```bash
curl http://localhost:8000/
```

**响应示例**:
```json
{
  "service": "EduChain Blockchain Service",
  "version": "2.0.0",
  "status": "running"
}
```

### 3.2 健康检查

**接口**: `GET /health`

**描述**: 检查服务健康状态

**请求示例**:
```bash
curl http://localhost:8000/health
```

**响应示例**:
```json
{
  "status": "healthy",
  "chain_length": 10,
  "is_valid": true,
  "auth_enabled": true,
  "version": "2.0.0"
}
```

## 4. 区块链操作接口

### 4.1 内容存证

**接口**: `POST /api/blockchain/certify`

**描述**: 将内容信息存证到区块链

**认证**: 启用认证时需要JWT token

**请求头**:
```
Content-Type: application/json
Authorization: Bearer <jwt_token>  # 启用认证时必需
```

**请求参数**:
```json
{
  "type": "KNOWLEDGE_CERTIFICATION",
  "knowledge_id": 123,
  "user_id": 456,
  "content_hash": "a1b2c3d4...",
  "metadata": {
    "title": "Python 入门教程",
    "category": "编程"
  }
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 交易类型 |
| knowledge_id | integer | 否 | 知识内容ID |
| user_id | integer | 是 | 用户ID |
| content_hash | string | 是 | 内容SHA-256哈希值 |
| metadata | object | 否 | 额外元数据 |

**交易类型**:
- `KNOWLEDGE_CERTIFICATION`: 知识内容存证
- `ACHIEVEMENT`: 成就认证
- `COPYRIGHT`: 版权声明
- `USER_ACTION`: 用户行为记录

**响应示例**:
```json
{
  "transaction_id": 1,
  "block_index": 5,
  "status": "confirmed",
  "timestamp": "2024-01-01T12:00:00.000000"
}
```

**请求示例**:
```bash
# 无认证模式
curl -X POST http://localhost:8000/api/blockchain/certify \
  -H "Content-Type: application/json" \
  -d '{
    "type": "KNOWLEDGE_CERTIFICATION",
    "knowledge_id": 123,
    "user_id": 456,
    "content_hash": "a1b2c3d4e5f6..."
  }'

# 启用认证模式
curl -X POST http://localhost:8000/api/blockchain/certify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "type": "KNOWLEDGE_CERTIFICATION",
    "knowledge_id": 123,
    "user_id": 456,
    "content_hash": "a1b2c3d4e5f6..."
  }'
```

### 4.2 内容验证

**接口**: `POST /api/blockchain/verify`

**描述**: 验证内容是否被篡改

**请求参数**:
```json
{
  "knowledge_id": 123,
  "content_hash": "a1b2c3d4..."
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| knowledge_id | integer | 是 | 知识内容ID |
| content_hash | string | 是 | 内容SHA-256哈希值 |

**响应示例**:
```json
{
  "is_valid": true,
  "block_index": 5,
  "transaction_timestamp": "2024-01-01T12:00:00.000000",
  "message": "验证成功"
}
```

**请求示例**:
```bash
curl -X POST http://localhost:8000/api/blockchain/verify \
  -H "Content-Type: application/json" \
  -d '{
    "knowledge_id": 123,
    "content_hash": "a1b2c3d4e5f6..."
  }'
```

### 4.3 创建区块

**接口**: `POST /api/blockchain/create-block`

**描述**: 手动创建新区块（打包待处理交易）

**请求示例**:
```bash
curl -X POST http://localhost:8000/api/blockchain/create-block
```

**响应示例**:
```json
{
  "message": "Block created successfully",
  "block_index": 6,
  "transactions_count": 3,
  "block_hash": "1a2b3c4d..."
}
```

### 4.4 获取区块链信息

**接口**: `GET /api/blockchain/chain`

**描述**: 获取区块链整体信息

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/chain
```

**响应示例**:
```json
{
  "chain_length": 10,
  "pending_transactions_count": 2,
  "is_valid": true,
  "latest_block_index": 9,
  "latest_block_hash": "9z8y7x6w..."
}
```

## 5. 查询接口

### 5.1 查询区块

**接口**: `GET /api/blockchain/block/{index}`

**描述**: 根据索引查询区块详情

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| index | integer | 区块索引 |

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/block/5
```

**响应示例**:
```json
{
  "index": 5,
  "timestamp": "2024-01-01T12:00:00.000000",
  "transactions": [
    {
      "id": "abc123",
      "type": "KNOWLEDGE_CERTIFICATION",
      "knowledge_id": 123,
      "user_id": 456,
      "content_hash": "a1b2c3d4...",
      "timestamp": "2024-01-01T12:00:00.000000"
    }
  ],
  "previous_hash": "4d3c2b1a...",
  "hash": "1a2b3c4d..."
}
```

### 5.2 查询交易

**接口**: `GET /api/blockchain/transaction/{knowledge_id}`

**描述**: 根据知识ID查询交易

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| knowledge_id | integer | 知识内容ID |

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/transaction/123
```

**响应示例**:
```json
{
  "transaction": {
    "id": "abc123",
    "type": "KNOWLEDGE_CERTIFICATION",
    "knowledge_id": 123,
    "user_id": 456,
    "content_hash": "a1b2c3d4...",
    "timestamp": "2024-01-01T12:00:00.000000"
  },
  "block_index": 5,
  "status": "confirmed"
}
```

### 5.3 查询用户交易

**接口**: `GET /api/blockchain/user/{user_id}/transactions`

**描述**: 查询用户的所有交易

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| user_id | integer | 用户ID |

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| transaction_type | string | 否 | 交易类型过滤 |

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/user/456/transactions?transaction_type=KNOWLEDGE_CERTIFICATION
```

**响应示例**:
```json
{
  "user_id": 456,
  "transaction_type": "KNOWLEDGE_CERTIFICATION",
  "count": 5,
  "transactions": [
    {
      "id": "abc123",
      "type": "KNOWLEDGE_CERTIFICATION",
      "knowledge_id": 123,
      "content_hash": "a1b2c3d4...",
      "timestamp": "2024-01-01T12:00:00.000000"
    }
  ]
}
```

### 5.4 统计信息

**接口**: `GET /api/blockchain/stats`

**描述**: 获取区块链统计信息

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/stats
```

**响应示例**:
```json
{
  "total_blocks": 10,
  "total_transactions": 25,
  "pending_transactions": 2,
  "transaction_types": {
    "KNOWLEDGE_CERTIFICATION": 20,
    "ACHIEVEMENT": 3,
    "COPYRIGHT": 2
  },
  "is_valid": true
}
```

## 6. 证书接口

### 6.1 生成证书

**接口**: `POST /api/blockchain/certificates`

**描述**: 为已存证的内容生成PDF证书

**请求参数**:
```json
{
  "knowledge_id": 123,
  "knowledge_title": "Python 入门教程",
  "user_id": 456,
  "user_name": "张三"
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| knowledge_id | integer | 是 | 知识内容ID |
| knowledge_title | string | 是 | 知识标题 |
| user_id | integer | 是 | 用户ID |
| user_name | string | 是 | 用户名 |

**响应示例**:
```json
{
  "certificate_id": "CERT-2024-123456",
  "knowledge_id": 123,
  "block_index": 5,
  "pdf_url": "http://localhost:8000/api/blockchain/certificates/CERT-2024-123456/download",
  "qr_code_url": "http://localhost:8000/qrcodes/cert_CERT-2024-123456.png",
  "verification_url": "http://localhost:8000/blockchain/certificates/CERT-2024-123456/verify",
  "created_at": "2024-01-01T12:00:00.000000"
}
```

**请求示例**:
```bash
curl -X POST http://localhost:8000/api/blockchain/certificates \
  -H "Content-Type: application/json" \
  -d '{
    "knowledge_id": 123,
    "knowledge_title": "Python 入门教程",
    "user_id": 456,
    "user_name": "张三"
  }'
```

### 6.2 下载证书

**接口**: `GET /api/blockchain/certificates/{certificate_id}/download`

**描述**: 下载PDF证书文件

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| certificate_id | string | 证书编号 |

**请求示例**:
```bash
curl -O http://localhost:8000/api/blockchain/certificates/CERT-2024-123456/download
```

**响应**: PDF文件流

### 6.3 验证证书

**接口**: `GET /api/blockchain/certificates/{certificate_id}/verify`

**描述**: 验证证书有效性

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| certificate_id | string | 证书编号 |

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/certificates/CERT-2024-123456/verify
```

**响应示例**:
```json
{
  "valid": true,
  "certificate_id": "CERT-2024-123456",
  "message": "Certificate is valid",
  "verification_time": "2024-01-01T12:00:00.000000"
}
```

### 6.4 查询知识证书

**接口**: `GET /api/blockchain/certificates/knowledge/{knowledge_id}`

**描述**: 根据知识ID查询证书信息

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| knowledge_id | integer | 知识内容ID |

**请求示例**:
```bash
curl http://localhost:8000/api/blockchain/certificates/knowledge/123
```

**响应示例**:
```json
{
  "knowledge_id": 123,
  "block_index": 5,
  "block_hash": "1a2b3c4d...",
  "content_hash": "a1b2c3d4...",
  "timestamp": "2024-01-01T12:00:00.000000",
  "has_certificate": true
}
```

## 7. 错误码说明

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 400 | 请求参数错误 | 检查请求参数格式和必填字段 |
| 401 | 认证失败 | 检查JWT token是否有效 |
| 403 | 权限不足 | 确认用户有权限操作指定资源 |
| 404 | 资源不存在 | 确认资源ID是否正确 |
| 500 | 服务器内部错误 | 查看服务器日志，联系管理员 |

## 8. 使用示例

### 8.1 完整存证流程

```python
import requests
import hashlib

# 1. 计算内容哈希
content = "这是一篇教育文章的内容..."
content_hash = hashlib.sha256(content.encode()).hexdigest()

# 2. 存证
response = requests.post(
    "http://localhost:8000/api/blockchain/certify",
    json={
        "type": "KNOWLEDGE_CERTIFICATION",
        "knowledge_id": 123,
        "user_id": 456,
        "content_hash": content_hash
    }
)
result = response.json()
print(f"存证成功，区块索引: {result['block_index']}")

# 3. 验证
response = requests.post(
    "http://localhost:8000/api/blockchain/verify",
    json={
        "knowledge_id": 123,
        "content_hash": content_hash
    }
)
result = response.json()
print(f"验证结果: {result['is_valid']}")

# 4. 生成证书
response = requests.post(
    "http://localhost:8000/api/blockchain/certificates",
    json={
        "knowledge_id": 123,
        "knowledge_title": "Python 入门教程",
        "user_id": 456,
        "user_name": "张三"
    }
)
result = response.json()
print(f"证书编号: {result['certificate_id']}")
print(f"下载链接: {result['pdf_url']}")
```

### 8.2 JavaScript 示例

```javascript
// 存证
async function certifyContent(knowledgeId, userId, contentHash) {
  const response = await fetch('http://localhost:8000/api/blockchain/certify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'KNOWLEDGE_CERTIFICATION',
      knowledge_id: knowledgeId,
      user_id: userId,
      content_hash: contentHash
    })
  });
  return await response.json();
}

// 验证
async function verifyContent(knowledgeId, contentHash) {
  const response = await fetch('http://localhost:8000/api/blockchain/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      knowledge_id: knowledgeId,
      content_hash: contentHash
    })
  });
  return await response.json();
}
```

## 9. 总结

本 API 提供了完整的区块链存证、验证和证书生成功能，接口设计遵循 RESTful 规范，易于集成和使用。
