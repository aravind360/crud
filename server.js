const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/model");

db.sequelize.sync().then(() => {
    console.log("Synced db.");
})
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Crud application." });
// });

require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3020;
console.log('port', PORT)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
