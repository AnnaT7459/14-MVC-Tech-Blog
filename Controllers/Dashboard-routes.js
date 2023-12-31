const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../Utils/auth");
const sequelize = require("../Config/Connnection");

// all blog posts route
router.get("/", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "title",
      "post_content",
      "user_id",
      "date_created",
      "date_updated",
    ],
    order: [["date_created", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_content",
          "date_created",
          "user_id",
          "post_id",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((allPostData) => {
      const userPosts = allPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { userPosts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//   new blog post option on dashboard
router.get("/new", (req, res) => {
  res.render("new-post", { name: req.session.name });
});

module.exports = router;
