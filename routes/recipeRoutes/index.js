const { Router } = require("express");

const { recipeController } = require("../../controllers/recipeController");

const router = Router();

router.route("/getRecipes").get(recipeController);


module.exports = router;
