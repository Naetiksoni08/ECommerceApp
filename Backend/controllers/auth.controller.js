const UserModel = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerapi = require("../utils/api.register");
const loginapi = require("../utils/api.login");

const JWT_SECRET = process.env.JWT_SECRET;


module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username)
            return res.status(400).json({ success: false, message: "username required" });
        if (!password)
            return res.status(400).json({ success: false, message: "password required" });

        const user = await UserModel.findOne({ username });

        if (!user) {
            return loginapi.usererror(res, "Username or Password is Incorrect")
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return loginapi.usererror(res, "Username or Password is Incorrect");
        }

        const token = jwt.sign({ id: user._id, username }, JWT_SECRET, {
            expiresIn: "30d"
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
        })

    } catch (error) {
        return loginapi.error(res, "Internal Server Error", error);
    }
};







module.exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username)
            return res.status(400).json({ success: false, message: "Username required" });
        if (!password)
            return res.status(400).json({ success: false, message: "Password required" });
        if (!email)
            return res.status(400).json({ success: false, message: "Email required" });


        const user = await UserModel.findOne({ username });

        if (user) {
            return registerapi.userexists(res);
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        registerapi.success(res);

    } catch (error) {

        return registerapi.error(res);

    }
}