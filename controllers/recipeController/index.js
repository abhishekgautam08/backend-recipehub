const { default: axios } = require("axios");

const getRecipesController = async (req, res) => {
  try {
    const url = `${process.env.RECIPES_API_URL}/complexSearch?apiKey=${process.env.RECIPES_API_KEY}&number=20&offset=`;
    const response = await axios.get(url);


    res.status(200).json(response.data.results);
  } catch (err) {
    console.error({ err });
    res.status(500).json(err);
  }
};
const getRecipeInfoController = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${process.env.RECIPES_API_URL}/${id}/information?apiKey=${process.env.RECIPES_API_KEY}`;
    const response = await axios.get(url);
    

    res.status(404).json(response.data);
  } catch (err) {
    console.error({ err });
    res.status(500).json(err);
  }
};

module.exports = {
  getRecipesController,
  getRecipeInfoController,
};
