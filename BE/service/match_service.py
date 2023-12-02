from service.footaball_data_service import get_matches,get_competetition
from configuration.configuration_manager import ConfigurationManager
from entity.competition import Competition
from entity.match import Match
from entity.team import Team
from entity.score import Score
from shared.base import session_factory
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import uuid

config  = ConfigurationManager.get_instance()

def insert_competetition():
    for competetition in config.get_config_by_key('football_data.competitions'):
        comp = get_competetition(competetition)
        comp = Competition(public_id=comp['id'],name=comp['name'],code=comp['code'],type=comp['type'],emblem=comp['emblem'])
        with session_factory() as session:
            existing_competetition = session.query(Competition).filter_by(public_id=comp.public_id).first()
            if not existing_competetition:
                session.add(comp)
                session.commit()


def get_new_matches():
    with session_factory() as session:
       for competetition in session.query(Competition).all():
           matches = get_matches(competetition=competetition.public_id)
           for match in matches:
                matchdb = session.query(Match).filter_by(public_id=match['id']).first()
                if not matchdb:
                    home_team = insert_team(match=match['homeTeam'])
                    away_team = insert_team(match=match['awayTeam'])
                    score_id = inser_score()
                    new_match = Match(public_id=match['id'],utc_date=match['utcDate'],status=match['status'],stage=match['stage'],group=match['group'].replace('GROUP_',''),last_updated=match['lastUpdated'],score=score_id,competetition=competetition.id,home_team=home_team,away_team=away_team)
                    session.add(new_match)
                    session.commit()

def insert_team(match):
    with session_factory() as session:
        team = session.query(Team).filter_by(public_id=match['id']).first()
        if not team:
            team = Team(public_id=match['id'],name=match['name'],short_name=match['shortName'],tla=match['tla'],crest=match['crest'])
            session.add(team)
            session.commit()
            session.refresh(team)
            return team.id
        return team.id

def inser_score():
    with session_factory() as session:
        score = Score(public_id=uuid.uuid4())
        session.add(score)
        session.commit()
        session.refresh(score)
        return score.id


def create_jobs():
    sheduler = BackgroundScheduler()
    sheduler.add_job(func=get_new_matches, trigger="interval", seconds=config.get_config_by_key('jobs.getMatches'))
    sheduler.start()
    atexit.register(lambda: sheduler.shutdown())

create_jobs()

insert_competetition()
    