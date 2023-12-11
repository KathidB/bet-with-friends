from flask import Flask, request, jsonify, make_response
from controllers.user_controller import user_blueprint
from controllers.image_controller import image_blueprint
from controllers.matches_controller import match_blueprint
from controllers.profile_controller import profile_blueprint
from controllers.ranking_controller import ranking_blueprint
from shared.base import init_db
from configuration.configuration_manager import ConfigurationManager
from flask_cors import CORS
from service.match_service import get_new_matches,insert_competetition,proces_bets

app = Flask(__name__)
cors = CORS(app=app,resources={r'/api/v1/*':{'origins':'*', 'supports_credentials': True}},expose_headers='X-Total-Count')
config = ConfigurationManager.get_instance()
init_db()

app.config['SECRET_KEY']=config.get_config_by_key('SECRET_KEY')
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
api_v1_prefix = '/api/v1'
app.register_blueprint(user_blueprint, url_prefix=f'{api_v1_prefix}')
app.register_blueprint(image_blueprint, url_prefix=f'{api_v1_prefix}')
app.register_blueprint(match_blueprint, url_prefix=f'{api_v1_prefix}')
app.register_blueprint(profile_blueprint, url_prefix=f'{api_v1_prefix}')
app.register_blueprint(ranking_blueprint, url_prefix=f'{api_v1_prefix}')

insert_competetition()
get_new_matches()
proces_bets()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    
