const express = require('express');
const knex = require('../config/knex')
const hackEventRouter = express.Router();




hackEventRouter.route('/hackevent/:id').get(async (request, response, next) => {
    try {
        const event = await knex('hack_event_settings').where('id', request.params.id).select('*')
        if (event  && event.length > 0) {
            response.json(event[0])
        } else {
            response.json({success: false, message: "failed to fetch investor"})
        }
    } catch(err) {
        next(err)
    }
});







module.exports = hackEventRouter;