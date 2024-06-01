const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Data } = require("../models/data");
const fs = require('fs');

router.get("/", async (req, res) => {
    try {
        const { DATA_MC, WOJEWODZTWO, PLEC } = req.query;
        const whereConditions = {};
        
        if (DATA_MC) {
            whereConditions.DATA_MC = DATA_MC;
        }
        if (WOJEWODZTWO) {
            whereConditions.WOJEWODZTWO = WOJEWODZTWO;
        }
        if (PLEC) {
            whereConditions.PLEC = PLEC;
        }

        const data = await Data.findAll({
            where: whereConditions,
            raw: true,
            order: [
                ['DATA_MC', 'ASC']
            ]
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/download-json", async (req, res) => {
    try {
        const { DATA_MC, WOJEWODZTWO, PLEC } = req.query;
        const whereConditions = {};
        
        if (DATA_MC) {
            whereConditions.DATA_MC = DATA_MC;
        }
        if (WOJEWODZTWO) {
            whereConditions.WOJEWODZTWO = WOJEWODZTWO;
        }
        if (PLEC) {
            whereConditions.PLEC = PLEC;
        }

        const data = await Data.findAll({
            where: whereConditions,
            attributes: ['DATA_MC', 'KOD_WOJ', 'WOJEWODZTWO', 'PLEC', 'WIEK', 'LICZBA'],
            raw: true,
            order: [
                ['DATA_MC', 'ASC']
            ]
        });

        const filename = `dane_prawa_jazdy_${Object.values(whereConditions).filter(value => !!value).join('_') || ''}.json`;
        const jsonData = JSON.stringify(data, null, 2);
        
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'application/json');
        
        res.status(200).send(jsonData);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router
