const { Product, Cicle, Save, Subscription, Vote, Provider, User, Coupon, Profile } = require('../models');
const sequelize = require('sequelize');
const { slugify } = require('../../utils');

module.exports = {
  show(req, res) {
    const query = createShowQuery(req);
    return Cicle.find(query)
      .then(cicle => res.status(200).send(cicle.toJSON()))
      .catch(error => res.status(400).send(error));
  },

  getScope(req, res) {
    Cicle.scope(req.params.scope).findAll({
      include: [{ model: Product, include: [Provider] },{ model: Save }]
    })
    .then(cicles => res.status(200).send(cicles))
    .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Cicle.create(req.body)
      .then(cicle =>
        Save.findById(req.body.SaveId)
          .then(save =>
            Cicle.update({
                slug: `${cicle.id}-${slugify(save.title)}`
              }, {
                where: {
                  id: cicle.id
                }
              })
                .then(cicle => res.status(200).send(cicle))
                .catch(error => res.status(400).send(error))
          )
          .catch(error => res.status(400).send(error))
      )
      .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    return Cicle.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(cicle => res.status(200).send(cicle))
      .catch(error => res.status(400).send(error));
  },

  listActive(req, res) {
    const query = {
      order: [
        ['date_end'],
        [ Save, 'title', 'ASC']
      ],
      where: {
        date_end: { $gt: new Date() },
        date_start: { $lt: new Date() }
      },
      include: []
    };

    if (req.query.cid)
      query.include.push({
        model: Save,
        where: {
          CategoryId: req.query.cid
        }
      })
    else
      query.include.push({
        model: Save
      })

    if (req.user)
      query.include.push({
        model: Subscription,
        include: [Vote, Coupon],
        where: {
          UserId: req.user.id
        },
        required: false
      })

    if (req.query.offset) query.offset = req.query.offset;
    if (req.query.limit) query.limit = req.query.limit;

    return Cicle.findAndCountAll(query)
      .then(({ rows }) => {
        const cicles = rows.map(cicle => cicle.toJSON());
        res.status(200).send(cicles);
      })
      .catch(error => res.status(400).send(error));
  },

  async listSubscribed(req, res) {

    // Finding subscribed cicles with coupons
    let query = {
        order: [
          [ Subscription, 'createdAt', 'DESC' ]
        ],
        include: [{
            model: Subscription,
            include: [Vote],
            where: {
              UserId: req.user.id
            },
            required: true
          }, {
            model: Product,
            include: [Vote],
            required: false
          }]
      };

    if (req.query.cid)
      query.include.push({
        model: Save,
        where: {
          CategoryId: req.query.cid
        }
      })
    else
      query.include.push({
        model: Save
      })

    if (req.query.offset) query.offset = req.query.offset;
    if (req.query.limit) query.limit = req.query.limit;

    cicles = await Cicle.findAll(query);

    cicles = cicles.map(cicle => cicle.toJSON());

    res.status(200).send(cicles);
  },

  listAll(req, res) {
    const query = {
      order: [
        [ 'id', 'DESC' ]
      ],
      include: [{
          model: Save
        }]};

    if (req.query.offset) query.offset = req.query.offset;
    if (req.query.limit) query.limit = req.query.limit;

    if (req.query.negotiation) query.where = {negotiation_end: {$gt:new Date()}, date_end: {$lt: new Date()}};

    return Cicle.findAndCountAll(query)
      .then(({ rows }) => {
        const cicles = rows.map(cicle => cicle.toJSON());
        res.status(200).send(cicles);
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Cicle.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedRecords => res.status(200).json(deletedRecords))
      .catch(error => res.status(500).json(error));
  },

  listSubscriptions(req, res) {
    return Cicle.findById(req.params.cicleId, {
      include: [{ model: Subscription }, { model: Save }]
    })
      .then(cicle => res.status(200).json({ subscriptions: cicle.Subscriptions }))
      .catch(err => res.status(400).json(err));
  },

  listUsers(req, res) {
    return Cicle.findById(req.params.cicleId, {
      include: [
        {
          model: Subscription,
          include: [Coupon, {
            model: User,
            include: [Profile]
          }],
          where: {
            CicleId: req.params.cicleId
          }
        },
        {
          model: Save
        }
      ]
    })
      .then(cicle => res.status(200).json({ subscriptions: cicle.Subscriptions }))
      .catch(err => res.status(400).json(err));
  },

  async getCoupon(req, res) {
    const cicle = await Cicle.find({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        include: [Vote]
      },{
        model: Save,
      }]
    });

    const coupon = await Coupon.find({
      where: {
        ProductId: cicle.winnerProduct.id
      },
      include: [
        {
          model: Subscription,
          where: {
            UserId: req.user.id
          }
        }
      ]
    });

    res.status(200).send(coupon);
  },

  showCicle(req, res) {
    return Cicle.findById(req.params.cicleId, {
      include: [
        {
          model: Save
        },
        {
          model: Product
        }
      ]
    })
      .then(cicle => res.status(200).send(cicle.toJSON()))
      .catch(err => res.status(400).json(err));
  },

  async mySubscription(req, res) {
    try {
      const cicle = await Cicle.find({ where: { slug: req.params.id } });
      const subscription = await Subscription.find({
        where: {
          SaveId: cicle.id,
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
      },
      {
        model: Save
      }
    ]
  };

  if (req.user && includeVote) {
    query.include = [
      {
        model: Save
      },
      {
        model: Product,
        include: [Vote, Provider]
      },
      {
        model: Subscription,
        include: [Vote],
        where: {
          UserId: req.user.id
        },
      }
    ];
  }
  return query;
}
