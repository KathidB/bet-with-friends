import atexit
from entity.ranking import Ranking
from entity.profile import Profile
from shared.base import session_factory
import uuid
from apscheduler.schedulers.background import BackgroundScheduler
from configuration.configuration_manager import ConfigurationManager

config = ConfigurationManager.get_instance()

def create_ranking(profile:Profile):
    with session_factory() as session:
        ranking = Ranking(place=0,public_id=uuid.uuid4(),profile_id=profile.id)
        session.add(ranking)
        session.commit()
        session.refresh(ranking)
    return ranking

def update_ranking():
    with session_factory() as session:
        try:
            sorted_profiles = session.query(Profile).order_by(Profile.points.desc()).all()
            rank = 1
            for profile in sorted_profiles:
                ranking = session.query(Ranking).filter_by(id=profile.ranking_id).first()
                session.query(Ranking).filter_by(id=ranking.id).update({"place": rank})
                rank += 1
            session.commit()
        except:
            session.rollback()

def get_ranking(page:int,limit:int) -> Profile:
    with session_factory() as session:
        ranking = (
            session.query(Profile)
            .join(Profile.ranking)
            .filter(Ranking.place != 0)
            .order_by(Ranking.place)
            .offset((page-1)*limit)
            .limit(limit)
            .all())
        count = (session.query(Profile)
            .join(Profile.ranking)
            .filter(Ranking.place != 0)
            .count())
    return (ranking,count)

def create_jobs():
    sheduler = BackgroundScheduler()
    sheduler.add_job(func=update_ranking, trigger="interval", seconds=config.get_config_by_key('jobs.updateProfile'))
    sheduler.start()
    atexit.register(lambda: sheduler.shutdown())

create_jobs()
