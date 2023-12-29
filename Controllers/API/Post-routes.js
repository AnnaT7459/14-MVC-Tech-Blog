const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth =  require('../../Utils/auth');

// all posts route
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_content', 'user_id', 'date_created', 'date_updated'],
        order: [['date_created', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'date_created', 'user_id', 'post_id'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(allPostData => res.json(allPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// single post route
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id 
        },
        attributes: ['id', 'title', 'post_content', 'user_id', 'date_created', 'date_updated'],
        include: [
            {
                model: User,
                attribtues: ['name']
            }
        ]
    })
    .then(onePostData => {
        f (!onePostData) {
            res.status(404).json({ message: 'Unable to find post'});
            return;
        }
        res.json(onePostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})