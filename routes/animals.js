const express = require('express');
const knex = require('../config/knex')
const animalsRouter = express.Router();
const openai = require('../config/openai')

animalsRouter.route('/animals').get(async (request, response, next) => {
    try {
        const animals = await knex('animals')
        response.json(animals);
    } catch (err) {
        next(err)
    }
});

animalsRouter.route('/animals/chat').get(async (request, response, next) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say hello' }],
        model: 'gpt-3.5-turbo',
    });
    response.send(chatCompletion)


});

animalsRouter.route('/animals/image').get(async (req, res, next) => {
    const prompt = "dog"
    try {
        const image = await openai.images.generate({
            prompt: "Chuck Norris as a tv show shark tank judge"
        });
        console.log(`${JSON.stringify(image)}`)
        res.send(image.data);
    } catch (err) {
        res.send(err.message);
    }
});



module.exports = animalsRouter;