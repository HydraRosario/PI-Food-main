const { Router } = require('express');
const axios = require("axios") ;
const { Diets } = require('../db');
const { DB_APIKEY } = process.env;
const router = Router();
require('dotenv').config();

router.get("/", async (req, res, next) => {
    try {
        const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&addRecipeInformation=true&number=10`);
        const diets = info.data?.results.map(e => e.diets);
        const flatDiets = diets.flat();
        const finalList = [...new Set(flatDiets)];
    
        finalList.forEach( e => {
            Diets.findOrCreate({
                where: {name: e}
            });
        });
    
        const allDiets = await Diets.findAll();
        res.status(200).send(allDiets);
       
    } catch (error) {
        next(error);
    }
    });


module.exports = router;
