from configuration.configuration_manager import ConfigurationManager
import requests
from datetime import datetime, timedelta

config = ConfigurationManager.get_instance()


def get_matches(competetition):
    today = datetime.now().date()
    dateFrom = today - timedelta(days=14)
    dateTo = today + timedelta(days=14)
    uri = f'{config.get_config_by_key("football_data.uri")}/competitions/{competetition}/matches'
    headers = {'X-Auth-Token': config.get_config_by_key('football_data.token2')}
    params = {"dateFrom":dateFrom,"dateTo":dateTo}
    response = requests.get(url=uri,params=params,headers=headers)
    if 'matches' in response.json():
        return response.json()['matches']
    return []

def get_competetition(competetition):
    uri = f'{config.get_config_by_key("football_data.uri")}/competitions/{competetition}'
    headers = {'X-Auth-Token': config.get_config_by_key('football_data.token')}
    response = requests.get(url=uri,headers=headers)
    return response.json()