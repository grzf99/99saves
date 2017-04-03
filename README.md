# 99saves

This project uses [Next.js](https://github.com/zeit/next.js), React, Sequelize, Express, Styled Components, Polished, Jest, Enzyme, Babel and Yarn.

## Setup the project

* `$ git clone https://github.com/Helabs/99saves.git` - Clone the project
* `$ cd 99saves` - Go into the project's folder
* `$ yarn global sequelize-cli`
* `$ createdb 99saves-dev`
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
