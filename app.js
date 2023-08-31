const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const colorRoutes = require("./routes/colorRoutes");
const typeRoutes = require("./routes/typeRoutes");
const transportRoutes = require("./routes/transportRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes")
const customerRoutes = require("./routes/customerRoutes");
const bodyParser = require("body-parser");

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/vyapar")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
app.use("/api/colors", colorRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
