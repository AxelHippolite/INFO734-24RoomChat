async function printSession(req, res, next) {
    console.table(req.session)
    next();
}

const checkUserNotAlreadyAuthenticated = async (req, res, next) => {
    if (req.session.userId === undefined) {
        next();
    } else {
        return res.status(409).send("Already Authenticated");
    }
}

module.exports = {
    printSession: printSession,
    checkUserNotAlreadyAuthenticated: checkUserNotAlreadyAuthenticated
}