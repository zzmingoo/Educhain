"""配置文件"""
import os
import logging


class Config:
    """应用配置"""
    
    # 数据库配置
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///blockchain.db"
    )
    
    # 服务配置
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # 区块链配置
    AUTO_CREATE_BLOCK = os.getenv("AUTO_CREATE_BLOCK", "true").lower() == "true"
    CREATE_BLOCK_INTERVAL = int(os.getenv("CREATE_BLOCK_INTERVAL", 60))  # 秒
    
    # CORS配置
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
    
    # 日志配置
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    
    # 基础URL配置
    BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")
    
    # JWT认证配置（与后端共享）
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_ALGORITHM = "HS512"  # 与后端保持一致
    
    # 认证配置
    AUTH_ENABLED = os.getenv("AUTH_ENABLED", "false").lower() == "true"
    
    # Redis配置（与后端共享，用于黑名单等）
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
    REDIS_DB = int(os.getenv("REDIS_DB", 0))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
    
    @classmethod
    def validate_config(cls):
        """验证配置"""
        if cls.AUTH_ENABLED and not cls.JWT_SECRET:
            raise ValueError("JWT_SECRET is required when AUTH_ENABLED=true")
        
        if cls.JWT_SECRET and len(cls.JWT_SECRET) < 32:
            raise ValueError("JWT_SECRET must be at least 32 characters long")
        
        # 配置日志
        logging.basicConfig(
            level=getattr(logging, cls.LOG_LEVEL.upper()),
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )

