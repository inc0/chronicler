FROM python:3.7

RUN pip install kubernetes ipdb Flask flask-restful dask flask-cors

COPY . /chronicler

CMD python /chronicler/app.py
