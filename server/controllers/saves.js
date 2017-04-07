const sequelize = require('sequelize');
const Save = require('../models').Save;
const Subscription = require('../models').Subscription;

module.exports = {
  create(req, res) {
    return Save
      .create(req.body)
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const query = {
      order: [
        ['date_end', 'ASC']
      ],
      offset: req.query.offset,
      limit: req.query.limit
    };

    if (req.user) {
      query.include = [{
        model: Subscription,
        where: {
          UserId: req.user.id
        },
        required: false
      }];
    }

    return Save
      .findAndCountAll(query)
      .then(({ count, rows }) => {
        const saves = {
          count,
          rows: rows.map((row) => {
            const save = row.toJSON();
            if (req.user) save.hasSubscribed = save.Subscriptions.length > 0;
            delete save.Subscriptions;
            return save;
          })
        };

        res.status(200).send(saves);
      })
      .catch(error => res.status(400).send(error));
  }
};
