from shared.base import Base
from sqlalchemy import Column, String, Integer,DateTime,ForeignKey
from dataclasses import dataclass

@dataclass(order=True)
class PasswordReset(Base):
    __tablename__ = 'password_reset'

    id = Column(Integer,primary_key=True)
    code = Column(String,nullable=False)
    user_id = Column(Integer,ForeignKey('users.id'))
    expires = Column(DateTime)
