
const jwt = require("jsonwebtoken");


function authenticateToken(request, response, next) {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    console.log('authHeader',authHeader)
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        console.log("check")
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          next();
        }
      });
    }
  }


module.exports = app => {
    const users = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);

    //login
    router.post("/login", users.login);
  
    // Retrieve all users
    router.get("/", users.findAll);

    // Update a User name with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", authenticateToken, users.delete);  

    //Delete all
    router.delete("/", users.deleteAll)
  
    app.use('/api/users', router);
    app.use('/', router);
  };
  