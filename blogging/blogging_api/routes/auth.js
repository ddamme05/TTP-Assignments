const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { authenticateUser } = require("../middleware/auth"); 

router.get("/", (req, res) => {
    res.send("Welcome to the Blog!");
});

router.post('/signup', async (req, res) => {
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
            message: 'Failed to create user.'
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user === null) {
            return res.status(401).json({
                message: "Incorrect credentials."
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            req.session.authorId = user.id;

            res.status(200).json({
                message: "Logged in successfully.",
                user: {
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            return res.status(401).json({
                message: "Incorrect credentials."
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
                error: 'Email already in use!'
            });
        }

        res.status(500).json({
            message: "An error occurred during the login process."
        });
    }
});


router.delete("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.sendStatus(500);
        }

        res.clearCookie("connect.sid");
        return res.sendStatus(200);
    });
});

module.exports = router;