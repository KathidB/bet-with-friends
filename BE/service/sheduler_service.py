from apscheduler.schedulers.background import BackgroundScheduler
from configuration.configuration_manager import ConfigurationManager
import atexit
from service.match_service import get_new_matches,proces_bets
from service.ranking_service import update_ranking
from service.user_service import remove_reset_passwords

config  = ConfigurationManager.get_instance()

def create_jobs():
    sheduler = BackgroundScheduler()
    sheduler.add_job(func=get_new_matches, trigger="interval", seconds=config.get_config_by_key('jobs.getMatches'))
    sheduler.add_job(func=proces_bets,trigger="interval", seconds=config.get_config_by_key('jobs.procesBets'))
    sheduler.add_job(func=update_ranking, trigger="interval", seconds=config.get_config_by_key('jobs.updateProfile'))
    sheduler.add_job(func=remove_reset_passwords, trigger="interval", seconds=config.get_config_by_key('jobs.removeTokensRest'))
    sheduler.start()
    atexit.register(lambda: sheduler.shutdown())

create_jobs()