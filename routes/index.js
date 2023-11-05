const { Router } = require("express");
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");


const router = Router();

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);


router.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    data: errorMessage,
  });
  console.error("Error in app: Stacktrace: ", err);
});

module.exports = router;
