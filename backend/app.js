const express = require("express");
const cors = require("cors");

const app = express();
const categoryRoutes = require("./src/routes/categoryroute");
const componentRoutes = require("./src/routes/componentroute");
const configurationRoutes = require("./src/routes/configurationroute");
const pricingRoutes = require("./src/routes/pricingroute");
const quotationRoutes = require("./src/routes/quotationroute");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/authroute"));
app.use("/api/categories", categoryRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/configurations", configurationRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/quotations", quotationRoutes);

app.get("/", (req, res) => {
    res.send("Laptop Pricing API Running...");
});

module.exports = app;