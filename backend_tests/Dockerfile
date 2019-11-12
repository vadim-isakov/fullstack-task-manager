FROM python:3.7

RUN pip install requests
RUN pip install pytest
RUN pip install beautifulsoup4

COPY ./tests /home/tests
WORKDIR /home/tests

COPY wait-for-backend.sh /wait-for-backend.sh
RUN chmod +x /wait-for-backend.sh

CMD ["/wait-for-backend.sh", "pytest"]