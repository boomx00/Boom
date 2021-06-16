module.exports = app => {
  const user = require("../controllers/user.controller.js");

  // Create a new Customer
  app.post("/users", user.create);

  // Retrieve all Customers
  app.get("/customers", user.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", user.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", user.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", user.delete);

  // Create a new Customer
  app.delete("/customers", user.deleteAll);
};