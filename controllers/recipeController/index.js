const { default: axios } = require("axios");

const getRecipesController = async (req, res, next) => {
  try {
    const baseURL = `${process.env.RECIPES_API_URL}/complexSearch?apiKey=${process.env.RECIPES_API_KEY}&cuisine`;
    const cusineQuery =
      Object.keys(req.query).length > 0
        ? req.query.cuisine
          ? req.query.cuisine
          : ""
        : "";
    const url = `${baseURL}=${cusineQuery}`;
    const response = await axios.get(url);

    res.status(200).json(response.data.results);
  } catch (err) {
    console.error('Error in fetching recepie results: Stcktrace: ', err.message);
    next(err)
  }
};
const getRecipeInfoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${process.env.RECIPES_API_URL}/${id}/information?apiKey=${process.env.RECIPES_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error in getting recepie details: Stacktrace: ", err.message);
    next(err);
  }
};

module.exports = {
  getRecipesController,
  getRecipeInfoController,
};
