const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./Homepage-routes");
const dashRoutes = require("./Dashboard-routes");


router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashRoutes);

module.exports = router;