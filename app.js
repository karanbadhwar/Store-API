require("dotenv").config();
//async errors
require("express-async-errors");

const express = require("express");
const app = express();
//DB
const connectDB = require("./db/connect");

//Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");

//Built-in Middleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1>Hello World!</h1><a href="/api/v1/products">Products</a>');
});

//Product Routes
app.use("/api/v1/products", productsRouter);

//Error handling Routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
