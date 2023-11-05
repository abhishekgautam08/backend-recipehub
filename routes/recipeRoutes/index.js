const { Router } = require("express");

const {  getRecipeInfoController, getRecipesController } = require("../../controllers/recipeController");

const router = Router();

router.route("/").get(getRecipesController);
router.route("/:id").post(getRecipeInfoController);


module.exports = router;
