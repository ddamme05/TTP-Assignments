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
    if (!req.session.userId) {
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
        req.session.userId = user.id;
        
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
                error: 'Email already in use'
            });
        }
        console.error(error);
        res.status(500).json({
            message: 'Failed to create user'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});