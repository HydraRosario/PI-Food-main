const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const routeRecipes = require("./recipe.js");
const routeDiets = require("./dietsType.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routeRecipes);
router.use("/types", routeDiets);

module.exports = router;
