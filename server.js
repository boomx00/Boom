const compression = require('compression');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mainRoutes = require('./app/routes/index')

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main Routes
app.use("/api/v1", mainRoutes);


// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});