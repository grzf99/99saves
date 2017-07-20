const { Category, Save, Cicle } = require('../models');
const sequelize = require('sequelize');

module.exports = {
  show(req, res) {
    return Category.findById(req.params.id)
      .then(category => res.status(200).send(category.toJSON()))
      .catch(err => res.status(400).json(err));
  },

  list(req, res) {
    return Category.findAndCountAll()
      .then(({ rows }) => {
        const categories = rows.map(category => category.toJSON());
        res.status(200).send(categories);
      })
      .catch(error => res.status(400).send(error));
  },

  listActive(req, res) {
    return Category.findAndCountAll({
      include: [{
        model: Category
      }],
      where: {
        CategoryId: null
      }
    })
      .then(({ rows }) => {
        const categories = rows.map(category => category.toJSON());
        res.status(200).send(categories);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Category.create(req.body)
      .then(category => res.status(201).send(category))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(category => res.status(200).send(category))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedRecords => res.status(200).json(deletedRecords))
      .catch(error => res.status(500).json(error));
  }
};
