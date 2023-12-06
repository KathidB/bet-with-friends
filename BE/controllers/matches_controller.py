from flask import Blueprint, request,Response
from security.token_validator import token_required
from service.match_service import get_competetition_list,get_matches_list,get_posible_bets,create_bet
from entity.response import Response as CustomResponse
from entity.competition import Competition
from entity.bets import Bets
from exceptions.already_bet_exception import AlreadyBetException
from exceptions.match_dont_exist_exception import MatchDontExistException
from jsonschema.exceptions import ValidationError
from service.request_validator import bets_validation
import json

match_blueprint = Blueprint('match_blueprint', __name__)

@match_blueprint.route('/matches',methods=['GET'])
@token_required
def get_matches(current_user,response:Response):
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = request.args.get('page')
    if request.args.get('limit'):
        limit = request.args.get('limit')
    if request.args.get('competetition'):
        competetition = request.args.get('competetition')
        (matches, count) = get_matches_list(page=int(page),limit=int(limit),competetition=competetition)
        response.set_data(json.dumps([obj.to_json() for obj in matches],indent=4))
        response.headers['X-Total-Count'] = count
        return response,200
    response.set_data(CustomResponse(message="Parameter competetition is required",code="M1").to_json())
    return response,400

@match_blueprint.route('/competetition',methods=['GET'])
@token_required
def get_competetition(current_user,response:Response):
    comp:Competition = get_competetition_list()
    response.set_data(json.dumps([obj.to_json() for obj in comp],indent=4))
    return response

@match_blueprint.route('/bet',methods=['GET'])
@token_required
def get_bets(current_user,response:Response):
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = int(request.args.get('page'))
    if request.args.get('limit'):
        limit = int(request.args.get('limit'))
    if request.args.get('competetition'):
        competetition = request.args.get('competetition')
        (posible_best, count) = get_posible_bets(page=page,limit=limit,competetition=competetition)
        response.set_data(json.dumps([obj.to_json() for obj in posible_best],indent=4))
        response.headers['X-Total-Count'] = count
        return response
    response.set_data(CustomResponse(message="Parameter competetition is required",code="M1").to_json())
    return response,400

@match_blueprint.route('/bet/<match>',methods=['POST'])
@token_required
def create_bet_post(current_user,response:Response,match:int):
    try:
        bets:Bets = bets_validation()
        create_bet(match=match,user_id=current_user.id,bets=bets)
        response.set_data(CustomResponse(message="Succesfuly create a bet",code="OK").to_json())
        response.status_code = 200
    except (AlreadyBetException, MatchDontExistException) as e:
        response.set_data(CustomResponse(message=e.message,code=e.code).to_json())
        response.status_code = 400
    except ValidationError as e:
        response.set_data(CustomResponse(message=e.message,code='R4').to_json())
        response.status_code = 400
    return response