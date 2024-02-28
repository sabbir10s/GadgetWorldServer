const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");

const { isAuthenticated } = require("./middlewares/authMiddlewares");

const indexRouter = require("./routes/index");
const invoiceRouter = require("./routes/invoice");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/invoice", invoiceRouter);
app.use("/products", isAuthenticated, productsRouter);
app.use("/auth", authRouter);

module.exports = app;
