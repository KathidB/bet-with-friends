from shared.base import Base
from sqlalchemy import Column,String,Integer,ForeignKey

class Bets(Base):
    __tablename__ = 'bets'

    id = Column(Integer,primary_key=True)
    public_id = Column(String,unique=True)
    match_id = Column(Integer,ForeignKey('match.id'))
    profile_id = Column(Integer,ForeignKey('profiles.id'))
    away_team = Column(Integer)
    home_team = Column(Integer)
    who_win = Column(String)