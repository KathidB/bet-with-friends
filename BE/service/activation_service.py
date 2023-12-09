from entity.activation import Activation
from shared.base import session_factory
import uuid
from datetime import datetime, timedelta
from exceptions.activation_code_invalid_exception import ActivationCodeInvalidException

def create_activation(user_id:int):
    now = datetime.now()
    future_datetime = now + timedelta(hours=24)
    activation = Activation(user_id=user_id,code = str(uuid.uuid4()),expire=future_datetime)
    with session_factory() as session:
        session.add(activation)
        session.commit()
        session.refresh(activation)
    return activation.code

def activate(code:str):
    with session_factory() as session:
        activation = session.query(Activation).filter_by(code=code).first()
        if activation:
            if activation.expire > datetime.now():
                user_id = activation.user.id
                session.delete(activation)
                session.commit()
                return user_id
            else:
                session.delete(activation)
                session.commit()
                raise ActivationCodeInvalidException()
        raise ActivationCodeInvalidException()
            