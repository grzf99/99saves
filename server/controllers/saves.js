const { Product, Save, Subscription, Vote, Provider, User, Coupon, Profile } = require('../models');
const sequelize = require('sequelize');

module.exports = {
  show(req, res) {
    const query = createShowQuery(req);
    return Save.find(query)
      .then(save => res.status(200).send(save.toJSON()))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Save.create(req.body)
      .then(save => res.status(201).send(save))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Save.update(req.body, {
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
    return Save.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedRecords => res.status(200).json(deletedRecords))
      .catch(error => res.status(500).json(error));
  },

  listSubscriptions(req, res) {
    return Save.findById(req.params.saveId, {
      include: [{ model: Subscription }]
    })
      .then(save => res.status(200).json({ subscriptions: save.Subscriptions }))
      .catch(err => res.status(400).json(err));
  },

  listUsers(req, res) {
    return Save.findById(req.params.saveId, {
      include: [
        {
          model: Subscription,
          include: [Coupon, {
            model: User,
            include: [Profile]
          }],
          where: {
            SaveId: req.params.saveId
          }
        }
      ]
    })
      .then(save => res.status(200).json({ subscriptions: save.Subscriptions }))
      .catch(err => res.status(400).json(err));
  },

  showSave(req, res) {
    return Save.findById(req.params.saveId, {
      include: [
        {
          model: Product
        }
      ]
    })
      .then(save => res.status(200).send(save.toJSON()))
      .catch(err => res.status(400).json(err));
  },

  async mySubscription(req, res) {
    try {
      const save = await Save.find({ where: { slug: req.params.id } });
      const subscription = await Subscription.find({
        where: {
          SaveId: save.id,
          UserId: req.user.id
        }
      });
      if (subscription !== null) {
        res.status(200).json(subscription.toJSON());
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

function createShowQuery(req, includeVote = true) {
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

  if (req.user && includeVote) {
    query.include = [
      {
        model: Product,
        include: [Vote, Provider]
      },
      {
        model: Subscription,
        include: [Vote, Coupon],
        where: {
          UserId: req.user.id
        },
      }
    ];
  }
  return query;
}

function createListQuery(req) {
  const query = {
    order: [
      [sequelize.literal("CASE WHEN (date_part('epoch',checkout_end)::int >= date_part('epoch',now())::int) THEN 1 ELSE null END ASC")],
      ['votation_end'],
      ['negotiation_end'],
      ['date_end']
    ],
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
        include: [Vote, Coupon],
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
