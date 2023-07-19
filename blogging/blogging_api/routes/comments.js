const express = require("express");
const app = express();
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


const getComment = async (id) => {
    const comment = await comment.findByPk(parseInt(id, 10));
    if (!comment) {
        throw new NotFoundError("comment not found");
    }
    return comment;
};

const authorizeModification = (session, comment) => {
    if (parseInt(session.userId, 10) !== comment.UserId) {
        throw new ForbiddenError("You are not authorized to delete this comment");
    }
};

const handleErrors = (err, res) => {
    console.error(err);
    if (err.name === "SequelizeValidationError") {
        return res
            .status(422)
            .json({
                errors: err.errors.map((e) => e.message).join(", ")
            });
    }
    res.status(500).send({
        errors: err.message
    });
};


app.post("/comments", authenticateUser, async (req, res) => {
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

app.get("/posts/:postId/comments", async (req, res) => {
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

app.get("/comments/:commentId", async (req, res) => {
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

app.put("/comments/:commentId", authenticateUser, async (req, res) => {
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

app.delete("/comments/:commentId", authenticateUser, async (req, res) => {
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

app.get('/users/:userId/comments', authenticateUser, async (req, res) => {
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

app.get('/posts/:postId/comments', async (req, res) => {
    const {
        postId
    } = req.params;

    try {
        const comments = await Comment.findAll({
            where: {
                postId
            }
        });

        res.json(comments);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to retrieve comments from the post'
        });
    }
});

app.post('/posts/:postId/comments', authenticateUser, async (req, res) => {
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

app.delete('/posts/:postId/comments/:commentId', authenticateUser, async (req, res) => {
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