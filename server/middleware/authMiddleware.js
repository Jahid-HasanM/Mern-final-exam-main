const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.x-acc-tkn
        if (!token) { return responseHandler.error(res, "Unauthorized", 401) }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decodedToken
        next()
    }
    catch (err) {
        responseHandler.error(res, "Internal Server Error")
        console.log(err)
    }
}
module.exports = authMiddleware