const express = require("express");
const router = express();
const {
    Post,
    Comment,
    User
} = require("../models");
require("dotenv").config();
const {
    authenticateUser
} = require("../middleware/auth");

router.get("/", authenticateUser, async (req, res) => {
    const {
        withComments,
        withUser
    } = req.query;

    if (withComments === "true" && withUser === "true") {
        // Retrieve posts with associated User and Comments
        try {
            const posts = await Post.findAll({
                include: [{
                        model: User,
                        as: "author",
                        attributes: ["name", "email"],
                    },
                    {
                        model: Comment,
                        as: "comments",
                        include: [{
                            model: User,
                            as: "author",
                            attributes: ["name", "email"],
                        }, ],
                    },
                ],
            });

            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to retrieve posts.",
            });
        }
    } else if (withComments === "true") {
        // Retrieve posts with associated Comments only
        try {
            const posts = await Post.findAll({
                include: [{
                    model: Comment,
                    as: "comments",
                    include: [{
                        model: User,
                        as: "author",
                        attributes: ["name", "email"],
                    }, ],
                }, ],
            });

            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to retrieve posts.",
            });
        }
    } else if (withUser === "true") {
        // Retrieve posts with associated User only
        try {
            const posts = await Post.findAll({
                include: [{
                    model: User,
                    as: "author",
                    attributes: ["name", "email"],
                }, ],
            });

            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to retrieve posts.",
            });
        }
    } else {
        // Retrieve posts without associated User and Comments
        try {
            const posts = await Post.findAll();

            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to retrieve posts.",
            });
        }
    }
});


router.post("/", authenticateUser, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            authorId: req.session.authorId,
        });

        res.status(201).json({
            message: "Post created successfully.",
            post,
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(422).json({
                errors: error.errors.map(e => e.message)
            });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Post with the same title already exists.'
            });
        }

        res.status(500).json({
            message: "Failed to create a post."
        });
    }
});

router.get("/:id", authenticateUser, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                as: "author",
                attributes: ["name", "email"]
            }]
        });

        if (!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve the post."
        });
    }
});

router.put("/:id", authenticateUser, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        if (post.authorId !== req.session.authorId) {
            return res.status(403).json({
                message: "You are not authorized to update this post."
            });
        }

        post.title = req.body.title;
        post.body = req.body.body;
        await post.save();

        res.status(200).json({
            message: "Post updated successfully!",
            post,
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(422).json({
                errors: error.errors.map(e => e.message)
            });
        }

        res.status(500).json({
            message: "Failed to update the post."
        });
    }
});

router.delete("/:id", authenticateUser, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        if (post.authorId !== req.session.authorId) {
            return res.status(403).json({
                message: "You are not authorized to delete this post."
            });
        }

        await post.destroy();

        res.status(200).json({
            message: "Post deleted successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete the post."
        });
    }
});

router.get("/:postId/comments", authenticateUser, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                postId: req.params.postId
            },
            include: [{
                model: User,
                as: "author",
                attributes: ["name", "email"]
            }],
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve comments."
        });
    }
});

router.post('/:postId/comments', authenticateUser, async (req, res) => {
    const {
        postId
    } = req.params;
    const {
        body,
        authorId
    } = req.body;

    try {
        const comment = await Comment.create({
            body,
            postId,
            authorId
        });

        res.status(201).json({
            message: `Comment created successfully for postId ${postId}`,
            body,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create a comment in post.'
        });
    }
});

router.delete('/:postId/comments/:commentId', authenticateUser, async (req, res) => {
    const {
        postId,
        commentId
    } = req.params;

    try {
        const comment = await Comment.findOne({
            where: {
                id: commentId,
                postId
            }
        });

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found.'
            });
        }

        await comment.destroy();

        res.status(200).json({
            message: 'Comment deleted!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred during deletion!'
        });
    }
});

module.exports = router;