## Host

API is hosted on heroku [https://zombie-api-dawid.herokuapp.com/](https://zombie-api-dawid.herokuapp.com/)

For documentation please visit link [https://zombie-api-dawid.herokuapp.com/doc](https://zombie-api-dawid.herokuapp.com/doc)

## Description

To run the app/test please follow instruction below

## Running the app

```bash
$ npm install
$ cp .env.example .env
$ docker-compose up -d
$ npm run start:dev
$ npm run seed:run
```

## Test

```bash
$ docker-compose --env-file .env.test -f docker-compose.test.yml up -d
$ npm run test
```
