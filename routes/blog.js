const { Router } = require("express");
const router = Router();
const blogController = require("../controllers/blogController");
const { upload } = require("../services/imageService");

router.get("/add-blog", blogController.renderAddBlog);
router.get("/:id", blogController.getBlogById);
router.post("/add-blog", upload.single("coverImage"), blogController.createBlog);
router.post("/comment/:blogId", blogController.addComment);

module.exports = router;
