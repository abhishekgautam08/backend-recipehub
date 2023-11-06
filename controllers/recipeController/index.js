const { default: axios } = require("axios");
const { Recipe, recipeStatus } = require("../../database/models/Recipe");

const getRecipesController = async (req, res, next) => {
  try {
    const baseURL = `${process.env.RECIPES_API_URL}/complexSearch`;
    const cusineQuery =
      Object.keys(req.query).length > 0
        ? req.query.cuisine
          ? req.query.cuisine
          : ""
        : "";
    const perPage = req.query.perPage;
    const offset = req.query.offset;

    const response = await axios.get(baseURL, {
      params: {
        number: perPage,
        offset,
        cuisine: cusineQuery,
        apiKey: `${process.env.RECIPES_API_KEY}`,
      },
    });

    res.status(200).json(response.data.results);
  } catch (err) {
    console.error(
      "Error in fetching recepie results: Stcktrace: ",
      err.message
    );
    next(err);
  }
};
const getRecipeInfoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${process.env.RECIPES_API_URL}/${id}/information?apiKey=${process.env.RECIPES_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (err) {
    console.error(
      "Error in getting recepie details: Stacktrace: ",
      err.message
    );
    next(err);
  }
};
const getRecipeSave = async (req, res, next) => {
  try {
    const recepieDetail = req.body;
    const loggedInUser = req.user;

    const existingRecipe = await Recipe.findOne({
      recipeId: recepieDetail.id,
      userId: loggedInUser.id,
    })
      .lean()
      .exec();

    if (existingRecipe) {
      return res.status(409).json({ message: "Recipe already in WishList" });
    }
    const recipeInfo = {
      name: loggedInUser.name,
      userId: loggedInUser.id,
      recipeId: recepieDetail.id,
      title: recepieDetail.title,
      imageUrl: recepieDetail.image,
    };

    const recipeData = new Recipe(recipeInfo);
    await recipeData.save();
    res.status(200).json({ message: "Your Recipe Successfully Saved" });
  } catch (err) {
    console.error(
      "Error in getting recepie details: Stacktrace: ",
      err.message
    );
    next(err);
  }
};
const getSaveRecipe = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const userRecipes = await Recipe.find({
      userId: loggedInUser.id,
      status: recipeStatus.show,
    })
      .lean()
      .exec();

    if (userRecipes) {
      return res.status(200).json(userRecipes);
    }

    res.status(404).json({ message: "Your Wishlist is empty" });
  } catch (err) {
    console.error(
      "Error in getting recepie details: Stacktrace: ",
      err.message
    );
    next(err);
  }
};
const getRemoveRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRecipesId = await Recipe.findOneAndUpdate(
      { recipeId: id },
      { status: recipeStatus.hide },
      { new: true }
    )
      .lean()
      .exec();

    if (userRecipesId) {
      res.status(200).json({ message: "Your Recipe is Removed From Wishlist" });
    } else {
      res.status(404).json({ message: "No records found" });
    }
  } catch (err) {
    console.error(
      "Error in getting recepie details: Stacktrace: ",
      err.message
    );
    next(err);
  }
};

module.exports = {
  getRecipesController,
  getRecipeInfoController,
  getRecipeSave,
  getSaveRecipe,
  getRemoveRecipe,
};
