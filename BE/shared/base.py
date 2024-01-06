from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from configuration.configuration_manager import ConfigurationManager

config = ConfigurationManager.get_instance()

username = config.get_config_by_key('database.user')
password = config.get_config_by_key('database.password')
host = config.get_config_by_key('database.host')
port = config.get_config_by_key('database.port')
database_name = config.get_config_by_key('database.name')

engine = create_engine(f'postgresql://{username}:{password}@{host}:{port}/{database_name}',echo=False)
Base = declarative_base()
_SessionFactory = sessionmaker(bind=engine)

def init_db():
    Base.metadata.create_all(engine)

def session_factory():
    return _SessionFactory()