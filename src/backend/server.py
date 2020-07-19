"""
Основной скрипт backend-сервера, обрабатывает 2 запроса
"""
import json
import datetime
from flask import Flask, request
from models import User, History
from user_agents import parse
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# подключаемся к бд
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///salary.db'
db = SQLAlchemy(app)

# форма ответа, заголовки обязательны
resp = Flask.response_class()
resp.headers['Access-Control-Allow-Origin'] = '*'
resp.headers['Access-Control-Allow-Headers'] = '*'


@app.route('/api/calculator', methods=['GET', 'POST', 'OPTIONS'])
def api():
    if request.method == 'OPTIONS':
        return resp
    if request.method == 'POST':
        data = request.json # получаем данные

        # получаем или создаем нового пользователя
        user = get_or_create(db.session, User, ip_adress=str(request.remote_addr),
                    user_agent=str(parse(str(request.user_agent))))

        # вставляем запись истории с данным пользователем
        history = History(user_id=user.id,
                          date=datetime.datetime.now(),
                          base=float(data[0]),
                          work_days=int(data[1]),
                          pay_days=int(data[2]),
                          coff=int(data[3]),
                          premium=float(data[4]),
                          result=str(data[5]))

        # сохраняем в БД
        db.session.add(user)
        db.session.add(history)
        db.session.commit()
        return resp
    if request.method == 'GET':

        # запрос истории расчетов сортированный по дате
        query = db.session.query(History, User).join(User, History.user_id == User.id)\
            .order_by(History.date.desc()).all()

        # формируем данные для формата JSON
        records = []
        for history, user in query:
            records.append({'date': str(history.date),
                            'ip': user.ip_adress,
                            'user_agent': user.user_agent,
                            'base': history.base,
                            'work_days': history.work_days,
                            'pay_days': history.pay_days,
                            'coff': history.coff,
                            'premium': history.premium,
                            'result': history.result})

        # заносим данные в тело ответа
        resp.data = json.dumps(records)
        return resp


def get_or_create(session, model, **kwargs):
    """
    функция получить или создать, нужна для того чтобы не создавать
    дублирующие записи в таблице пользователей
    :param session: сессия
    :param model: класс модели
    :param kwargs: данные
    :return:
    """
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance
    else:
        instance = model(**kwargs)
        return instance


if __name__ == '__main__':
    app.run()
