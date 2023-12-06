from sqlalchemy import Column, String, Integer,Boolean,DateTime,ForeignKey
from sqlalchemy.orm import relationship
from shared.base import Base
from dataclasses import dataclass
from entity.score import Score
from entity.competition import Competition
from entity.team import Team
import json

@dataclass(order=True)
class Match(Base):
    __tablename__  = 'match'

    id = Column(Integer, primary_key=True)
    public_id = Column(Integer)
    utc_date = Column(DateTime)
    status = Column(String)
    stage = Column(String)
    group = Column(String)
    last_updated = Column(DateTime)
    score_id = Column(Integer,ForeignKey('score.id'))
    competetition_id = Column(Integer,ForeignKey('competition.id'))
    home_team_id = Column(Integer,ForeignKey('team.id'))
    away_team_id = Column(Integer,ForeignKey('team.id'))
    proces = Column(Boolean,default=False)

    score = relationship(Score,foreign_keys=[score_id],lazy='joined')
    competetition = relationship(Competition,foreign_keys=[competetition_id],lazy='joined')
    home_team = relationship(Team,foreign_keys=[home_team_id],lazy='joined')
    away_team = relationship(Team,foreign_keys=[away_team_id],lazy='joined')


    def to_json(self):
        return {
            "public_id":self.public_id,
            "utc_date":self.utc_date.isoformat(),
            "status":self.status,
            "stage":self.stage,
            "group":self.group,
            "last_updated":self.last_updated.isoformat(),
            "score":json.loads(self.score.to_json()),
            "competition":self.competetition.to_json(),
            "home_team":json.loads(self.home_team.to_json()),
            "away_team":json.loads(self.away_team.to_json())
        }