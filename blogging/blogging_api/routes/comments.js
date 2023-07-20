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
const {
    ForbiddenError,
    NotFoundError
} = require("../errors");



router.post("/", authenticateUser, async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.body,
            postId: req.body.postId,
            authorId: req.session.authorId,
        });

        res.status(201).json({
            message: "Comment created successfully!",
            comment,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.status(422).json({
                error: error.message
            });
        } else if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({
                error: "Duplicate comment!"
            });
        } else {
            console.error(error);
            res.status(500).json({
                message: "Failed to create a comment."
            });
        }
    }
});

router.get("/:commentId", authenticateUser, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId, {
            include: [{
                model: User,
                as: "author",
                attributes: ["name", "email"]
            }],
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve the comment."
        });
    }
});

router.put("/:commentId", authenticateUser, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }

        comment.body = req.body.body;
        await comment.save();

        res.status(200).json({
            message: "Comment updated successfully!",
            comment
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.status(422).json({
                error: error.message
            });
        } else {
            console.error(error);
            res.status(500).json({
                message: "Failed to update the comment."
            });
        }
    }
});

router.delete("/:commentId", authenticateUser, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }

        await comment.destroy();

        res.status(200).json({
            message: "Comment deleted successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete the comment."
        });
    }
});

router.get('/users/:userId/comments', authenticateUser, async (req, res) => {
    const {
        userId
    } = req.params;

    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                as: 'author',
                where: {
                    id: userId
                },
                attributes: ['name', 'email']
            }
        });

        res.status(200).json(comments);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve comments from the user.",
        })
    }
});

module.exports = router;