const addDays = require('date-fns/add_days');
const { Product, Save, Subscription, Vote } = require('../models');
const { slugify } = require('../../utils');

module.exports = {
  show(req, res) {
    const query = createShowQuery(req);
    return Save.find(query)
      .then(save => res.status(200).send(save.toJSON()))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const dateEnd = new Date(req.body.date_end || new Date());
    const computedProps = {
      checkout_end: addDays(dateEnd, 3).toISOString(),
      votation_end: addDays(dateEnd, 2).toISOString(),
      slug: slugify(req.body.title)
    };

    return Save.create(Object.assign(computedProps, req.body))
      .then(saves => res.status(201).send(saves))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const dateEnd = new Date(req.body.date_end || new Date());
    const computedProps = {
      checkout_end: addDays(dateEnd, 3).toISOString(),
      votation_end: addDays(dateEnd, 2).toISOString(),
      slug: slugify(req.body.title)
    };

    return Save.update(Object.assign(computedProps, req.body), {
      where: {
        id: req.params.id
      }
    })
      .then(save => res.status(200).send(save))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const query = createListQuery(req);
    return Save.findAndCountAll(query)
      .then(({ rows }) => {
        const saves = rows.map(save => save.toJSON());
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

function createShowQuery(req) {
  const idField = isNaN(req.params.id) ? 'slug' : 'id';
  const query = {
    where: {
      [idField]: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  };

  if (req.user) {
    query.include = [
      {
        model: Product,
        include: [Vote]
      }
    ];
  }
  return query;
}

function createListQuery(req) {
  const query = {
    order: [['date_end', 'ASC']],
    include: [
      {
        model: Product,
        include: [Vote]
      }
    ]
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
        include: [Vote],
        where: {
          UserId: req.user.id
        },
        required: !!(req.query.filters &&
          req.query.filters.subscribed === 'true')
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
  return query;
}
