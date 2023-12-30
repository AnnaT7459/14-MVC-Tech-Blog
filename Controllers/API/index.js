const router = require("express").Router();
const userRoutes = require("./User-routes");
const postRoutes = require("./Post-routes");
const commentRoutes = require("./Comment-routes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;