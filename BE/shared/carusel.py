from configuration.configuration_manager import ConfigurationManager


class Carusel():
    __config:ConfigurationManager  = ConfigurationManager.get_instance()
    __token_list = []
    __current_index:int = 0
    __instance = None

    @classmethod
    def get_instance(cls):
        if cls.__instance == None:
            cls.__instance = cls.__new__(cls)
            cls.__token_list = cls.__config.get_config_by_key('football_data.token')
        return cls.__instance

    def __init__(self):
        raise RuntimeError("This is a Singleton, invoke get_instance() insted.")

    def get_token(self):
        return self.__token_list[self.__current_index]
    
    def next_token(self):
        if len(self.__token_list) == self.__current_index+1:
            self.__current_index = 0
            return self.__token_list[self.__current_index]
        self.__current_index += 1
        return self.__token_list[self.__current_index]