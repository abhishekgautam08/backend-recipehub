const { default: axios } = require("axios");

const recipeController = async (req, res) => {
  try {
    const url = `${process.env.RECIPES_API_URL}/complexSearch?apiKey=${process.env.RECIPES_API_KEY}&number=20&offset=`;
    const response = await axios.get(url);


    res.status(200).json(response.data.results);
  } catch (err) {
    console.error({ err });
    res.status(500).json(err);
  }
};

module.exports = {
  recipeController,
};
