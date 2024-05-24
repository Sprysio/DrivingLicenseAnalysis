const router = require("express").Router()
const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Data }=require("../models/data")

router.get("/", async (req, res) => {
    try {
        //const data = await sequelize.query('SELECT * FROM public."Data"', { type: QueryTypes.SELECT });
        const data = await Data.findAll({raw:true});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
    })
module.exports = router
    