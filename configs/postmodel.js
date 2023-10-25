const mongoose = require("mongoose");
const Posts = new mongoose.Schema({
  title: {
    type: String,
    
  },
  image: {
    type: String,
    
  },
  description: {
    type: String,
    // require: true,
  },
  createdAt: {
    type: String,
    default: () =>
      new Date().toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
      }),
  },
});
const comment = mongoose.model("Posts", Posts);
module.exports = comment;
