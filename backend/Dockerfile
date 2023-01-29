###########
# BUILDER #
###########

FROM python:3.11.1-alpine3.17 AS builder

WORKDIR /usr/src/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
  && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev && \
  pip install --upgrade pip && \
  pip install flake8==6.0.0

COPY . .

RUN flake8 --ignore=E127,E501,W503,F401 .

COPY ./requirements.txt ./requirements.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/backend/wheels -r requirements.txt


#########
# FINAL #
#########

FROM python:3.11.1-alpine3.17

RUN mkdir -p /home/app

# create the app user
RUN addgroup -S app && adduser -S app -G app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/backend
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles
WORKDIR $APP_HOME

RUN apk update && apk add libpq
COPY --from=builder /usr/src/backend/wheels /wheels
COPY --from=builder /usr/src/backend/requirements.txt .
RUN pip install --no-cache /wheels/*

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g'  $APP_HOME/entrypoint.sh
RUN chmod +x  $APP_HOME/entrypoint.sh

COPY . $APP_HOME

RUN chown -R app:app $APP_HOME

# change to the app user
USER app

ENTRYPOINT ["/home/app/backend/entrypoint.sh"]
