const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../Utils/auth");

// create a comment route
router.post("/", withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        })
        .then((newCommentData) => {
            res.json(newCommentData)
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        });
    }
})

module.exports = router
