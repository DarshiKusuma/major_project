from app import db
from marshmallow import Schema, fields, validate

# MongoDB Collection
users_collection = db["users"]

# Validation Schema
class UserSchema(Schema):
    user_id = fields.Str(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=2))
    email = fields.Email(required=True)
    gender = fields.Str(required=True, validate=validate.OneOf(["Male", "Female", "Other"]))
    password = fields.Str(required=True, validate=validate.Length(min=6))
    isVerified = fields.Bool(load_default=False)
    verification_token = fields.Str(dump_only=True)
