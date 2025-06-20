const User = require("../models/user");
const { Router } = require("express");
const router = Router();

router.get("/signUp", (req, res) => {
  return res.render("signUp");
});

router.get("/signIn", (req, res) => {
  return res.render("signIn");
});

router.post("/signUp", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenrateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/signOut", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
