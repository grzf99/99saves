const sequelize = require('sequelize');
const Save = require('../models').Save;
// const Subscription = require('../models').Subscription;

module.exports = {
  create(req, res) {
    return Save
      .create(req.body)
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const attributes = [
      ...Object.keys(Save.attributes),
      ...(
        req.user ? [[
          sequelize.literal(`(
            SELECT
              COUNT("Subscriptions"."id")
              FROM "Subscriptions"
              WHERE "Subscriptions"."SaveId" = "Save"."id"
              AND "Subscriptions"."UserId" = ${req.user.id}
          )`),
          'hasSubscribed'
        ]] : []
      )
    ];

    return Save
      .findAndCountAll({
        order: [
          ['date_end', 'ASC']
        ],
        offset: req.query.offset,
        limit: req.query.limit,
        attributes
      })
      .then(saves => res.status(200).send(saves))
      .catch(error => res.status(400).send(error));
  }
};
