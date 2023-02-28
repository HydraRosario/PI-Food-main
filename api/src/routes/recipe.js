const { Router } = require("express");
const router = Router();
const { Diets, Recipe } = require("../db.js");
const { getfusionRecipes } = require("../Controllers/recipe.js") ;
const { getIdAll } = require("../Controllers/byId.js");

router.get("/", async (req, res, next) => {
    try {
        const name = req.query.name;
        const allRecipes = await getfusionRecipes();
        if(name){
            let recipe = allRecipes.filter(r => r.title?.toLowerCase().includes(name.toString().toLowerCase()))
            if(recipe.length >=1){
                res.status(200).send(recipe);
            } else {
                res.status(404).send("Recipe Cannot Found");
            }
        } else {
            res.status(200).send(allRecipes);
        }
    } catch (error) {
        next(error);
    }
    });
    
    router.get("/:idRecipe", async (req, res, next) => {
        try {
            const id = req.params.idRecipe;
            const recipeDetail = await getIdAll(id);
            if(!recipeDetail){
                return res.status(404).json("No recipe under that id");
            }
            res.status(200).json(recipeDetail);
        } catch (error) {
            next(error);
        }
    });
    
    router.post("/recipe", async (req, res) => {
        let {
            title, 
            summary,
            spoonacularScore, 
            healthScore,
            steps, 
            image,
            MadeOnDb,
            diets
        } = req.body;
            
    try {
        let newRecipe = await Recipe.create({
            title, 
            summary, 
            spoonacularScore, 
            healthScore, 
            steps, 
            image, 
            MadeOnDb
        })
    
       let dietsdb = await Diets.findOne({
           where: { name : diets }
       })   
       newRecipe.addDiets(dietsdb)
    
       res.status(201).json(newRecipe);
    
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
    
    });
    
    
    
    router.delete("/delete", async(req, res) => {
        try {
            const {id} = req.body
    
            await Recipe.destroy({
                where: {
                    id: id,
                }
                
            });
            res.status(200).json("receta borrada")
    
        } catch (error) {
            console.log(error)
        }
        
    })
    
    router.put("/edit", async(req, res) => {
        const {id, title} = req.body
        try {
            await Recipe.update(
                {title:title},
                {where: {id: id}}
                );
            res.status(200).json("se edit")
    
        } catch (error) {
            console.log(error)
        }
    })
    
    module.exports = router;