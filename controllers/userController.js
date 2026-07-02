const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Username, email and password are required." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        const { password: hasedPasswordFromDB, ...userWithoutPassword } = newUser.toObject();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userWithoutPassword
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error creating user', error: err.message });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging in user",
            error: error.message,
        });
    }
}
module.exports = {
    createUser,
    loginUser
}