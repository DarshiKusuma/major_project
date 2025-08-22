from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    name: str
    email: str
    password: str
    age: int
    gender: str
    diseases: List[str] = field(default_factory=list)

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password,  # (already hashed before saving)
            "age": self.age,
            "gender": self.gender
        }
