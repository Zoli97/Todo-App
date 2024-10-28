require("dotenv").config();
const express = require("express");
const router = require("./routes");
const connectToMongoDB = require("./database");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 2000;

// app.get("/hello", (req, resp) => {
// resp.status(200).json({ msg: "Hello people !" });
// });

//Midleware
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.use("/api", router);

app.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname, "dist/index.html"));
});

//it will wait first for mongodb to connect and only then connect to my Express

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

//use the router, at the endpoint /api i want to use the router
