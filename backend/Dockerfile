FROM python:3.7

RUN pip install fastapi
RUN pip install uvicorn
RUN pip install SQLAlchemy
RUN pip install bcrypt
RUN pip install mysqlclient
RUN pip install email_validator
RUN pip install python-multipart
RUN pip install pyjwt
RUN pip install itsdangerous
RUN pip install Jinja2

RUN pip install aiosmtplib
EXPOSE 80

COPY ./app /app/app
WORKDIR /app

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

CMD ["/wait-for-db.sh", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "80"]