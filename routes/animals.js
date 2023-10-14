const express = require('express');
const knex = require('../config/knex')
const animalsRouter = express.Router();



animalsRouter.route('/animals').get(async (request, response, next) => {
    try {
        const animals = await knex('animals')
        response.json(animals);
    } catch (err) {
        next(err)
    }
});

module.exports = animalsRouter;