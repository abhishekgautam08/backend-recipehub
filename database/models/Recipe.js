const { Schema, model } = require("mongoose");

const recipeStatus = {
  show:"show",
  hide:"hide"
}

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
    },

    userId: {
      type: String,
    },

    recipeId: {
      type: String,
    },
    title: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(recipeStatus),
      default: recipeStatus.show,
    },
  },
  { timestamps: true }
);



const Recipe = model("Recipe", RecipeSchema);

module.exports = {
  Recipe,
  recipeStatus,
};
