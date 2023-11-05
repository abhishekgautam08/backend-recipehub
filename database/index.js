const { connect } = require("mongoose");
const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    await connect(mongoURI);
    console.log("Connect to Mongo Succesfully");
  } catch (error) {
    console.error("Failed connecting to mongo", error);
    throw error;
  }
};

module.exports = connectToMongo;
