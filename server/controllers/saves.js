const Save = require('../models').Save;
const Subscription = require('../models').Subscription;
const Product = require('../models').Product;

module.exports = {
  show(req, res) {
    return Save
      .find({
        where: {
          id: req.params.id
        },
        include: [{
          model: Product
        }]
      })
      .then(save => res.status(200).send(save))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Save
      .create(req.body)
      .then(saves => res.status(201).send(saves))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Save
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(save => res.status(200).send(save))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const query = {
      order: [
        ['date_end', 'ASC']
      ],
      include: [{
        model: Product
      }]
    };

    if (req.query.offset) query.offset = req.query.offset;
    if (req.query.limit) query.limit = req.query.limit;

    if (req.query.filters) {
      /**
       * TODO: O ideal é verificar se o admin tá logado e só exibir os inativos pra ele.
       */
      if (req.query.filters.active) {
        query.where = {
          date_end: { $gt: new Date() },
          date_start: { $lt: new Date() }
        };
      }
    }

    if (req.user) {
      query.include = [
        ...query.include,
        {
          model: Subscription,
          where: {
            UserId: req.user.id
          },
          required: !!(req.query.filters && req.query.filters.subscribed === 'true')
        }
      ];

      if (req.query.filters) {
        if (req.query.filters.subscribed) {
          query.where = {};
        }

        if (req.query.filters.votable) {
          query.where = {
            date_end: { $lt: new Date() }
          };
        }
      }
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
  },

  delete(req, res) {
    Save.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
  }
};
