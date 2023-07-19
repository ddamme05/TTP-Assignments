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

module.exports = { authenticateUser };