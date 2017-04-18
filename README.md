# 99saves

This project uses [Next.js](https://github.com/zeit/next.js), React, Sequelize, Express, Styled Components, Polished, Jest, Enzyme, Babel and Yarn.

## Dependencies

To run this project you need to have:

* Node.js v7.7.x - You can use [NVM](https://github.com/creationix/nvm)
* [PostgreSQL](http://www.postgresql.org/)
  * OSX - [Postgress.app](http://postgresapp.com/)
  * Linux - `$ sudo apt-get install postgresql`
  * Windows - [PostgreSQL for Windows](http://www.postgresql.org/download/windows/)
* Yarn - `$ brew install yarn`

If you plan to **integrate** this project to Heroku, you'll need:

* [Heroku Toolbelt](https://toolbelt.heroku.com/)

## Setup the project

* `$ git clone https://github.com/Helabs/99saves.git` - Clone the project
* `$ cd 99saves` - Go into the project's folder
* `$ yarn add global sequelize-cli`
* `$ createdb 99saves-dev`
* Create a `.env` file from the `.evn.sample` example (ask a teammate if you need any variable)
* `$ yarn install` - Installs the project's dependencies
* `$ yarn run build` - Installs the project's dependencies

## Running the app

* `$ yarn run dev`

## Creating models

More info: [http://docs.sequelizejs.com/en/v3/docs/getting-started/](http://docs.sequelizejs.com/en/v3/docs/getting-started/)

* `$ sequelize model:create --name Todo --attributes title:string`

## Migrating data

More info: [http://docs.sequelizejs.com/en/latest/docs/migrations/](http://docs.sequelizejs.com/en/latest/docs/migrations/)

* `$ sequelize db:migrate`

## Test the app

* `$ yarn test`

### Generate test snapshot

* `$ yarn test -- -u`

## Running in production

* `$ yarn run build`
* `$ yarn start`
