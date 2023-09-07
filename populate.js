require("dotenv").config();

const connectDB = require("./db/connect");

const ProductModel = require("./models/product");

const jsonData = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await ProductModel.deleteMany();
    await ProductModel.create(jsonData);
    console.log("Successfully started");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
