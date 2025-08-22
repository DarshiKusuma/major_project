from dataclasses import dataclass

@dataclass
class HealthData:
    user_id: str   # Reference to User._id
    bmi: float
    blood_pressure: str
    sugar_level: float
    heart_rate: int

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "bmi": self.bmi,
            "blood_pressure": self.blood_pressure,
            "sugar_level": self.sugar_level,
            "heart_rate": self.heart_rate
        }
