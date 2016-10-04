## Heroku-MEAN-Stack-Example
This is an example Fund Me app created using the MEAN stack (Mongo, Express, Angular, and Node Application).

View sample app on Heroku here: https://iwan-mean.herokuapp.com/

## Install the app:

### `npm install`


## Run the app:

### `npm start`

A mongo DB is required to fully utilize the app. You can use Heroku to setup a quick webserver with a Mongo Add on.

Heroku:
https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

## Go to the directory and create a heroku project:

### heroku create <PROJECT-NAME>

## You also need to provision the database:

### heroku addons:create mongolab

To run the project:

heroku local web
