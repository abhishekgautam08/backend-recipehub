const { Router } = require("express");
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");


const router = Router();

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);


module.exports = router;
