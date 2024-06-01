const router = require("express").Router()
const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Data }=require("../models/data")
const fs = require('fs')

router.get("/", async (req, res) => {
    try {
        //const data = await sequelize.query('SELECT * FROM public."Data"', { type: QueryTypes.SELECT });
        const data = await Data.findAll({
            raw: true,
            order: [
                ['DATA_MC', 'ASC'] // Sortowanie rosnące po DATA_MC
            ]
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
    })
router.get("/download-json", async (req, res) => {
    try {

        const data = await Data.findAll({
            attributes: ['DATA_MC', 'KOD_WOJ', 'WOJEWODZTWO', 'PLEC', 'WIEK', 'LICZBA'],
            raw: true
    })

        const jsonData = JSON.stringify(data, null, 2)
        // fs.writeFileSync('nowe_prawa_jazdy.json', jsonData)// pobiera w folderze servera
    
        res.setHeader('Content-disposition', 'attachment; filename=nowe_prawa_jazdy.json')
        res.setHeader('Content-type', 'application/json')

        res.status(200).send(jsonData)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
    })
module.exports = router
    