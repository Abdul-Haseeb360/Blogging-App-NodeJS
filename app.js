require("dotenv").config();

const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
  setUserLocals,
} = require("./middlewares/auth");
const blogService = require("./services/blogService");

const app = express();
const PORT = process.env.PORT || 8000;

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDb Connected "));

// Set view Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(setUserLocals);
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlog = await blogService.getAllBlogs();
  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
