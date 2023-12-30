const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../Utils/auth");

// all blog posts route
router.get("/", (req, res) => {
  Post.findAll({
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
    .then((allPostData) => res.json(allPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// single blog post route
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "post_content",
      "user_id",
      "date_created",
      "date_updated",
    ],
    include: [
      {
        model: User,
        attribtues: ["name"],
      },
    ],
  })
    .then((onePostData) => {
      if(!onePostData);
      {
        res.status(404).json({ message: "Unable to find post" });
        return;
      } 
      res.json(onePostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a blog post route
router.post("/", withAuth, (req, res) => {
  console.log(req.body);
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  }).then((newPostData) => {
    res.json(newPostData).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

// update a blog post route
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatePostData) => {
      if (!updatePostData) {
        res.status(404).json({ message: "Unable to find post" });
        return;
      }
      res.json(updatePostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a blog post route
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletePostData) => {
      if (!deletePostData) {
        res.status(404).json({ message: "Unable to find post" });
        return;
      }
      res.json(deletePostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
