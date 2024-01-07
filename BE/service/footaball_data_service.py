from configuration.configuration_manager import ConfigurationManager
import requests
from shared.carusel import Carusel
from datetime import datetime, timedelta

config = ConfigurationManager.get_instance()
carusel =  Carusel.get_instance()


def get_matches(competetition):
    today = datetime.now().date()
    dateFrom = today - timedelta(days=30)
    dateTo = today + timedelta(days=21)
    while True:
        uri = f'{config.get_config_by_key("football_data.uri")}/competitions/{competetition}/matches'
        headers = {'X-Auth-Token': carusel.get_token()}
        params = {"dateFrom":dateFrom,"dateTo":dateTo}
        response = requests.get(url=uri,params=params,headers=headers)
        if response.status_code == 429:
            carusel.next_token()
            continue
        if 'matches' in response.json():
            return response.json()['matches']
        return []

def get_competetition(competetition):
    while True:
        uri = f'{config.get_config_by_key("football_data.uri")}/competitions/{competetition}'
        headers = {'X-Auth-Token': carusel.get_token()}
        response = requests.get(url=uri,headers=headers)
        if response.status_code == 429:
            carusel.next_token()
            continue
        return response.json()