"""
JWT认证模块
与后端Spring Boot系统共享JWT认证机制
"""
import os
import jwt
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import logging

logger = logging.getLogger(__name__)

class JWTAuth:
    """JWT认证服务"""
    
    def __init__(self):
        self.jwt_secret = os.getenv("JWT_SECRET")
        self.algorithm = "HS512"  # 与后端保持一致
        self.security = HTTPBearer(auto_error=False)
        
        # 验证JWT密钥配置
        if not self.jwt_secret:
            logger.warning("JWT_SECRET not configured, authentication will be disabled")
        elif len(self.jwt_secret) < 32:
            raise ValueError("JWT_SECRET must be at least 32 characters long")
    
    def is_enabled(self) -> bool:
        """检查认证是否启用"""
        return bool(self.jwt_secret)
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """验证JWT令牌"""
        try:
            payload = jwt.decode(
                token,
                self.jwt_secret,
                algorithms=[self.algorithm]
            )
            
            # 检查令牌是否过期
            exp = payload.get('exp')
            if exp and datetime.utcnow().timestamp() > exp:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token expired"
                )
            
            return {
                "user_id": payload.get("userId"),
                "username": payload.get("sub"),
                "role": payload.get("role", "LEARNER"),
                "exp": payload.get("exp")
            }
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired"
            )
        except jwt.InvalidTokenError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Token verification error: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token verification failed"
            )
    
    async def get_current_user(
        self, 
        credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False))
    ) -> Optional[Dict[str, Any]]:
        """获取当前用户信息（可选认证）"""
        if not self.is_enabled():
            # 认证未启用时返回None，业务逻辑需要处理
            return None
        
        if not credentials:
            return None
        
        return self.verify_token(credentials.credentials)
    
    async def require_auth(
        self, 
        credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())
    ) -> Dict[str, Any]:
        """强制要求认证"""
        if not self.is_enabled():
            raise HTTPException(
                status_code=status.HTTP_501_NOT_IMPLEMENTED,
                detail="Authentication not configured"
            )
        
        return self.verify_token(credentials.credentials)
    
    def check_permission(self, user: Dict[str, Any], required_role: str = None) -> bool:
        """检查用户权限"""
        if not user:
            return False
        
        user_role = user.get("role", "LEARNER")
        
        # 管理员拥有所有权限
        if user_role == "ADMIN":
            return True
        
        # 如果没有指定必需角色，任何认证用户都可以
        if not required_role:
            return True
        
        return user_role == required_role
    
    def verify_user_permission(self, user: Dict[str, Any], target_user_id: int) -> bool:
        """验证用户是否有权限操作指定用户的资源"""
        if not user:
            return False
        
        # 管理员可以操作任何用户的资源
        if user.get("role") == "ADMIN":
            return True
        
        # 用户只能操作自己的资源
        return user.get("user_id") == target_user_id

# 全局认证实例
jwt_auth = JWTAuth()