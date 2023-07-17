const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const {
    Post,
    Comment,
    User
} = require("./models");
require("dotenv").config();

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        // the 'finish' event will be emitted when the response is handed over to the OS
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000, // 1 hour
        },
    })
);
const authenticateUser = (req, res, next) => {
    if (!req.session.authorId) {
        return res
            .status(401)
            .json({
                message: "You must be logged in to view this page."
            });
    }
    next();
};

app.get("/", (req, res) => {
    res.send("Welcome to the Blog!");
});

app.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        req.session.authorId = user.id;

        res.status(201).json({
            message: "User has been created!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(422).json({
                errors: error.errors.map(e => e.message)
            });
        } else if (error.name === 'SequelizeUniqueConstraintError') { //Dupe email
            return res.status(400).json({
                error: 'Email already in use.'
            });
        }
        console.error(error);
        res.status(500).json({
            message: 'Failed to create user'
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user === null) {
            return res.status(401).json({
                message: "Incorrect credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            req.session.authorId = user.id;

            res.status(200).json({
                message: "Logged in successfully",
                user: {
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            return res.status(401).json({
                message: "Incorrect credentials"
            });
        }
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(422).json({
                errors: error.errors.map(e => e.message)
            });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Email already in use'
            });
        }

        res.status(500).json({
            message: "An error occurred during the login process"
        });
    }
});


app.delete("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(500);
        }

        res.clearCookie("connect.sid");
        return res.sendStatus(200);
    });
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: "author",
                attributes: ["name", "email"]
            }]
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve posts"
        });
    }
});

app.post("/posts", authenticateUser, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            authorId: req.session.authorId,
        });

        res.status(201).json({
            message: "Post created successfully",
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
                error: 'Post with the same title already exists'
            });
        }

        res.status(500).json({
            message: "Failed to create a post"
        });
    }
});

app.get("/posts/:id", async (req, res) => {
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
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve the post"
        });
    }
});

app.put("/posts/:id", authenticateUser, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.authorId !== req.session.authorId) {
            return res.status(403).json({
                message: "You are not authorized to update this post"
            });
        }

        post.title = req.body.title;
        post.body = req.body.body;
        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
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
            message: "Failed to update the post"
        });
    }
});

app.delete("/posts/:id", authenticateUser, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.authorId !== req.session.authorId) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });
        }

        await post.destroy();

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete the post"
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});