class MatchDontExistException(Exception):
    def __init__(self, message = "Match dont exist",code = "M2"):
        self.code = code
        self.message = message
        super().__init__(self.message)