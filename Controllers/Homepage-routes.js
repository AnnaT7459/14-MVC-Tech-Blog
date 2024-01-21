const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../Utils/auth");


// sign up
router.get("/signup", (req, res) => {
  res.render("signup");
});

// get all blog posts (recoded as try/catch statement/exception)
router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
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
    });

    const posts = allPostData.map((post) => post.get({ plain: true}));

    // session
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



// get one blog post by id (recoded as try/catch statement/exception)
router.get("/post/:id", async (req, res) => {
  try {
    const onePostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {model: Comment,
        attributes: [id, comment_content, user_id],
      }
      ],
    });

    const post = onePostData.get({ plain: true })
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
      userID: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//   new blog post option on dashboard
router.get("/new", (req, res) => {
  res.render("new-post", { name: req.session.name });
});

// login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

module.exports = router;
