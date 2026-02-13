from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from backend.app.database import Base


class TradeType(str, enum.Enum):
    LONG = "LONG"
    SHORT = "SHORT"

class TradeStatus(str, enum.Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"

class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    symbol = Column(String, index=True, nullable=False)
    trade_type = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)

    entry_price = Column(Float, nullable=False)
    exit_price = Column(Float, nullable=True)
    stop_loss = Column(Float, nullable=True)
    take_profit = Column(Float, nullable=True)
    break_even = Column(Float, nullable=True)

    notes = Column(String, nullable=True)
    status = Column(String, default=TradeStatus.OPEN)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    owner = relationship("User", back_populates="trades")
