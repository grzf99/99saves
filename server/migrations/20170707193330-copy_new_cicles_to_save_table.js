'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query(`INSERT INTO "Saves" (title, description, image_default, image2, image3, "createdAt", "updatedAt")
                     SELECT
                       trim(title) AS title,
                       MIN(description) AS description,
                       MIN(image_default) AS image_default,
                       MIN(image2) AS image2,
                       MIN(image3) AS image3,
                       MIN("createdAt") AS "createdAt",
                       MIN("updatedAt") AS "updatedAt"
                     FROM "Cicles" GROUP BY trim(title) ORDER BY title`);
  },

  down: function (queryInterface, Sequelize) {}
};
