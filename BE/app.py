from flask import Flask, request, jsonify, make_response
from controllers.user_controller import user_blueprint
from controllers.image_controller import image_blueprint
from shared.base import init_db
from configuration.configuration_manager import ConfigurationManager

app = Flask(__name__)
config = ConfigurationManager.get_instance()
init_db()

app.config['SECRET_KEY']=config.get_config_by_key('SECRET_KEY')
api_v1_prefix = '/api/v1'
app.register_blueprint(user_blueprint, url_prefix=f'{api_v1_prefix}')
app.register_blueprint(image_blueprint, url_prefix=f'{api_v1_prefix}')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
