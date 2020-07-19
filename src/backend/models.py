"""
Файл с моделями БД
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask('server')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///salary.db'
db = SQLAlchemy(app)


# модель информации о пользователи
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ip_adress = db.Column(db.String(80), unique=False, nullable=False)
    user_agent = db.Column(db.String(120), nullable=False)


# модель истории расчетов
class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime, nullable=False)
    base = db.Column(db.Float, nullable=False)
    work_days = db.Column(db.Integer, nullable=False)
    pay_days = db.Column(db.Integer, nullable=False)
    coff = db.Column(db.Float, nullable=False)
    premium = db.Column(db.Float, nullable=False)
    result = db.Column(db.String(80), nullable=False)
