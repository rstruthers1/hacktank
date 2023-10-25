const express = require('express');
const knex = require('../config/knex')
const investmentRouter = express.Router();


investmentRouter.route('/investment/investors/').get(async (request, response, next) => {
    try {
        const investors = await knex('users').select('id', 'username', 'budget', 'teamName')
        response.json(investors);
    } catch (err) {
        next(err)
    }
});

investmentRouter.route('/investment/investors/:id').get(async (request, response, next) => {
    try {
        const investors = await knex('users').where('id', request.params.id).select('id', 'username', 'budget', 'teamName')
        if (investors  && investors.length > 0) {
            response.json(investors[0])
        } else {
            response.json({success: false, message: "failed to fetch investor"})
        }
    } catch(err) {
        next(err)
    }
});



investmentRouter.route('/investment/investors/:id/hacks/investments').get(async (request, response, next) => {
    try {
        const pocos = await knex('hacks')
            .leftJoin('users', 'hacks.teamId', 'users.id')
            .leftJoin('investments', {'hacks.id':'investments.hackId','investments.investorId':parseInt(request.params.id)})
            .select('users.id as teamId', 'users.teamName as teamName', 'investments.id as investmentId', 'investments.capital as investmentCapital', 'hacks.id as hackId','hacks.name as hackName', 'hacks.hackType')
            .whereNot('hacks.teamId', request.params.id)
        if (pocos  && pocos.length >= 0) {
            response.json(pocos)
        } else {
            response.json({success: false, message: "failed to fetch hack investments"})
        }
    } catch(err) {
        next(err)
    }
})

investmentRouter.route('/investment/investors/:id/hacks/investments').post(async (request, response, next) => {
    try {


        for (const investment of request.body) {
            const [investments] = await knex("investments")
                .insert({
                    id: investment.investmentId,
                    investorId: request.params.id,
                    capital: investment.investmentCapital,
                    hackId: investment.hackId

                })
                .onConflict("id")
                .merge()
                .returning("*");
        }
        const invs = await knex('hacks')
            .leftJoin('users', 'hacks.teamId', 'users.id')
            .leftJoin('investments', {'hacks.id':'investments.hackId','investments.investorId':parseInt(request.params.id)})
            .select('users.id as teamId', 'users.username as userName', 'users.teamName as teamName', 'investments.id as investmentId', 'investments.capital as investmentCapital', 'hacks.id as hackId','hacks.name as hackName', 'hacks.hackType')
            .whereNot('hacks.teamId', request.params.id)
        response.json(invs)
    } catch(err) {
        next(err)
    }
})

investmentRouter.route('/investment/hacks/investments/totals').get(async (request, response, next) => {
    try {
        const invs = await knex('hacks as h')
            .leftJoin('users as team', 'h.teamId', 'team.id')
            .leftJoin('investments as inv', 'h.id', 'inv.hackId')
            .select('h.id as hackId', 'h.name as hackName', 'h.hackType','team.id as teamId', 'team.teamName as teamName')
            .sum('inv.capital as totalCapital')
            .groupBy('hackId', 'hackName', 'hackType', 'teamId', 'teamName')
            .orderByRaw('totalCapital desc')
        response.json(invs)
    } catch(err) {
        next(err)
    }
})




module.exports = investmentRouter;