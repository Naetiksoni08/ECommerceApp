const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


module.exports.auth = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1] || "";
    // console.log(token);
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });

    try {
        // next();
        const payload = jwt.verify(token, JWT_SECRET);
        if (!payload) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.user = payload;
        next();


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            error,
          });
        }
 };


