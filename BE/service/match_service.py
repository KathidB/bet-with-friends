from sqlalchemy import update
from service.footaball_data_service import get_matches,get_competetition
from configuration.configuration_manager import ConfigurationManager
from entity.competition import Competition
from entity.match import Match
from entity.team import Team
from entity.score import Score
from entity.bets import Bets
from entity.profile import Profile
from exceptions.already_bet_exception import AlreadyBetException
from exceptions.match_dont_exist_exception import MatchDontExistException
from shared.base import session_factory
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import atexit
import uuid

config  = ConfigurationManager.get_instance()

def get_new_matches():
    with session_factory() as session:
       for competetition in session.query(Competition).all():
           matches = get_matches(competetition=competetition.public_id)
           for match in matches:
                matchdb = session.query(Match).filter_by(public_id=match['id']).first()
                if not matchdb:
                    home_team = insert_team(match=match['homeTeam'])
                    away_team = insert_team(match=match['awayTeam'])
                    score_id = insert_score()
                    new_match = Match(public_id=match['id'],utc_date=match['utcDate'],status=match['status'],stage=match['stage'],group=match['group'].replace('GROUP_',''),last_updated=match['lastUpdated'],score_id=score_id,competetition_id=competetition.id,home_team_id=home_team,away_team_id=away_team)
                    session.add(new_match)
                    session.commit()

def get_matches_list(competetition,page:int,limit:int):
    with session_factory() as session:
        matches = (session
               .query(Match)
               .join(Competition)
               .filter(Competition.public_id == competetition)
               .order_by(Match.utc_date)
               .offset((page-1)*limit)
               .limit(limit)
               .all())
        count = (session
               .query(Match)
               .join(Competition)
               .filter(Competition.public_id == competetition)
               .count())
        return (matches, count)
    
def get_competetition_list():
    with session_factory() as session:
        return session.query(Competition).all()

def get_posible_bets(competetition,page:int,limit:int) -> [Match]:
    with session_factory() as session:
       posible_best =  (session
               .query(Match)
               .join(Competition)
               .outerjoin(Bets, Match.id == Bets.match_id)
               .filter(Competition.public_id == competetition, Match.utc_date > datetime.utcnow(),Bets.match_id == None)
               .order_by(Match.utc_date)
               .offset((page-1)*limit)
               .limit(limit)
               .all())
       count = (session
               .query(Match)
               .join(Competition)
               .outerjoin(Bets, Match.id == Bets.match_id)
               .filter(Competition.public_id == competetition, Match.utc_date > datetime.utcnow(),Bets.match_id == None)
               .count())
    return (posible_best, count)

def proces_bets():
    with session_factory() as session:
        match_to_process = session.query(Match).filter(Match.status=="FINISHED",Match.proces == False).all()
        for match in match_to_process:
            away_team_winner = match.score.winner == match.away_team.id
            home_team_winner = match.score.winner == match.home_team.id
            draw = match.score.winner == None
            home_team_score = match.score.full_time.split('-')[0]
            away_team_score = match.score.full_time.split('-')[1]
            bets_to_preces = session.query(Bets).filter(Bets.match_id == match.id)
            for bet in bets_to_preces:
                price = 0
                if bet.away_team and bet.home_team:
                    if bet.away_team == int(away_team_score): price += 0.50
                    if bet.home_team == int(home_team_score): price += 0.50
                elif bet.who_win:
                    if away_team_winner and bet.who_win == "away": price += 0.15
                    if home_team_winner and bet.who_win == "home": price += 0.15
                    if draw and bet.who_win == "draw": price += 0.15
                price = price * 100
                stmt = update(Profile).where(Profile.id == bet.profile_id).values(points=(Profile.points + price))
                session.execute(stmt)
                session.commit()
            stmt = update(Match).where(Match.id == match.id).values(proces = True)
            session.execute(stmt)
            session.commit()

def insert_competetition():
    for competetition in config.get_config_by_key('football_data.competitions'):
        comp = get_competetition(competetition)
        comp = Competition(public_id=comp['id'],name=comp['name'],code=comp['code'],type=comp['type'],emblem=comp['emblem'])
        with session_factory() as session:
            existing_competetition = session.query(Competition).filter_by(public_id=comp.public_id).first()
            if not existing_competetition:
                session.add(comp)
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

def insert_score():
    with session_factory() as session:
        score = Score(public_id=uuid.uuid4())
        session.add(score)
        session.commit()
        session.refresh(score)
        return score.id

def create_bet(match:int,user_id:int,bets:Bets):
    with session_factory() as session:
        existing_bet = session.query(Bets).join(Match).join(Profile).filter(Match.public_id == match, Profile.user_id == user_id).first()
        if not existing_bet:
            match_db = session.query(Match).filter_by(public_id=match).first()
            profile =  session.query(Profile).filter_by(user_id=user_id).first()
            if not match_db:
                raise MatchDontExistException()
            bet = Bets(public_id=uuid.uuid4(),match_id=match_db.id,profile_id = profile.id, away_team=bets.away_team,home_team=bets.home_team,who_win=bets.who_win)
            session.add(bet)
            session.commit()
            return
        raise AlreadyBetException()

def create_jobs():
    sheduler = BackgroundScheduler()
    sheduler.add_job(func=get_new_matches, trigger="interval", seconds=config.get_config_by_key('jobs.getMatches'))
    sheduler.add_job(func=proces_bets,trigger="interval", seconds=config.get_config_by_key('jobs.procesBets'))
    sheduler.start()
    atexit.register(lambda: sheduler.shutdown())

create_jobs()
    