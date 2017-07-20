const { Coupon, Subscription, User, Save, Product } = require('../models');
const {
  startOfDay,
  endOfDay,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  addHours
} = require('date-fns');

module.exports = {
  list(req, res) {
    return Coupon.findAndCountAll({
      include: [
        { model: Product },
        {
          model: Subscription,
          include: [User, Save]
        }
      ],
      order: [['id', 'DESC']]
    })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(500).send(error));
  },
  show(req, res) {
    return Coupon.find({
      include: [
        { model: Product },
        {
          model: Subscription,
          include: [User, Save],
        }
      ],
      where: { id: req.params.id }
    })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Coupon.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(coupon => res.status(200).send(coupon))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Coupon.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => res.sendStatus(200))
      .catch(error => res.status(500).json(error));
  },

  deleteOld(req, res) {
    return Save.findAndCountAll(
          {
          where: {
            date_end: { $lt: addDays(new Date(), -10) }
          }
        }
      )
      .then(({ rows }) => {
        const saves = rows.map(save => save.id);

        return Subscription.findAndCountAll({
          where: {
            SaveId: saves
          }
        })
          .then(({ rows }) => {
            const subs = rows.map(sub => sub.id);

            return Coupon.findAndCountAll({
              where: {
                SubscriptionId: { $notIn: subs }
              }
            })
              .then(({ rows }) => {
                const coups = rows.map(coup => coup.id);

                return Coupon.destroy({
                  where: {
                    id: coups
                  }
                })
                  .then(() => res.sendStatus(200))
                  .catch(error => res.status(500).json(error));
              })
              .catch(error => res.status(400).send(error));

          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));

  },
  deleteWithNoRelationship(req, res) {
    return  Coupon.destroy({
        where: {
          SubscriptionId: null
        }
      })
        .then(() => res.sendStatus(200))
        .catch(error => res.status(500).json(error));
  }
};
