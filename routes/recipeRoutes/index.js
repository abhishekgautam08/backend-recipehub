const { Router } = require("express");

const {  getRecipeInfoController, getRecipesController, getRecipeSave, getSaveRecipe, getRemoveRecipe } = require("../../controllers/recipeController");
const { authorizeUser } = require("../../middlewares/authorize");

const router = Router();

router.route("/").get(authorizeUser,getRecipesController);
router.route("/:id").post(authorizeUser,getRecipeInfoController);
router.route("/").post(authorizeUser,getRecipeSave);
router.route("/wishlist").get(authorizeUser,getSaveRecipe);
router.route("/:id/remove").get(authorizeUser,getRemoveRecipe);


module.exports = router;
