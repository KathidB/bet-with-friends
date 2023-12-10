class UserDontExistOrCodeExpireException(Exception):
    def __init__(self, message = "Code expire or session dont exist",code = "PR3"):
        self.code = code
        self.message = message
        super().__init__(self.message)