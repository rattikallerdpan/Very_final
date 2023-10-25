const express = require("express");
const bodyParser = require("body-parser");
const db = require("./configs/mongodb");
const Postsmodel = require("./configs/postmodel");
const path = require("path");
const app = express();
const multer = require('multer')
db();

var dir = path.join(__dirname, 'public');

console.log(dir)

// app.use(express.static(dir));

// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/insert", (req, res) => {
  res.render("insert");
});
app.get("/update", async(req, res) => {
  const postdata = await Postsmodel.find();
  res.render("update", {postdata});
});


// app.post("/insert", async (req, res) => {
//   try {
//     const title = req.body.title;
//     const image = req.body.image;
//     const description = req.body.description;
//     const SavePost = await new Postsmodel({
//       title,
//       image,
//       description,
//     });
//     await SavePost.save();
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 }
]);

app.post('/insert', async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/insert');
      }

      const { title, description } = req.body;
      const photoPath = req.files['image'][0].path;
      console.log(photoPath)

      // Remove the 'public/uploads/' prefix from the paths
      // const sanitizedPhotoPath = photoPath.replace('public/', '');


      // const content = new Content({
      //   title,
      //   category,
      //   description,
      //   photoPath: sanitizedPhotoPath,
      //   zipFilePath: sanitizedZipFilePath,
      // });

      const SavePost = await new Postsmodel({
        title,
        image: photoPath,
        description
      });

      await SavePost.save();
      console.log(SavePost);
      res.redirect('/update');
      console.log(req.body);
    });
  } catch (error) {
    console.error(error);
    return res.redirect('/insert');
  }
})


app.listen(3000, () => {
  console.log("server is running at port 3000");

});
