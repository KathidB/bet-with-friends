class AlreadyBetException(Exception):
    def __init__(self, message = "You can't bet one match more then one time",code = "B1"):
        self.code = code
        self.message = message
        super().__init__(self.message)