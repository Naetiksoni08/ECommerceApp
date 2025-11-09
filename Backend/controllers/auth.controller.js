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
            return loginapi.usererror(res, "Username is required!");
        if (!password)
            return loginapi.usererror(res, "Password is required!");

        const user = await UserModel.findOne({ username });

        if (!user) {
            return loginapi.usererror(res, "Invalid username or password!");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return loginapi.usererror(res, "Invalid username or password!");
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
            return registerapi.error(res, "Username required", null, 400);
        if (!password)
            return registerapi.error(res, "Password required", null, 400);
        if (!email)
            return registerapi.error(res, "Email required", null, 400);


        const user = await UserModel.findOne({ username });

        if (user) {
            return registerapi.userexists(res);
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        registerapi.success(res, "User created successfully", 200, { user: { username: newUser.username, email: newUser.email, _id: newUser._id } });
    } catch (error) {
        return registerapi.error(res, "Internal Server Error", error);

    }
}

// module.exports.getCurrentUser = async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user.id).select("-password");
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         return res.status(200).json({
//             success: true,
//             user,
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Server Error", error });
//     }
// };