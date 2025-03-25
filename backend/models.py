from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class RobloxActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=True)
    activity_type = db.Column(db.String(50), nullable=False)
    payload = db.Column(db.JSON, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<RobloxActivity {self.activity_type} for {self.user_id} at {self.timestamp}>"