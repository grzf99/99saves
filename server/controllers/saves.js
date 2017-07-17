const { Save, Subscription, Vote, Provider, User, Coupon, Profile } = require('../models');
const sequelize = require('sequelize');

module.exports = {
  show(req, res) {
    return Save.findById(req.params.id)
      .then(save => res.status(200).send(save.toJSON()))
      .catch(err => res.status(400).json(err));
  },

  list(req, res) {
    return Save.findAndCountAll()
      .then(({ rows }) => {
        const saves = rows.map(save => save.toJSON());
        res.status(200).send(saves);
      })
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

  delete(req, res) {
    return Save.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedRecords => res.status(200).json(deletedRecords))
      .catch(error => res.status(500).json(error));
  }
};
