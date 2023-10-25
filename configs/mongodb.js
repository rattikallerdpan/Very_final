const mongoose = require("mongoose");
module.exports = () => {
  const connectDB = mongoose
    .connect(
      "mongodb+srv://645021001039:1234@cluster0.vs1ns4c.mongodb.net/project",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((client) => {
      console.log("Connected to MongoDB Atlas");
      const db = client.connection.db;
    })
    .catch((error) =>
      console.error("Error connecting to MongoDB Atlas:", error)
    );
};