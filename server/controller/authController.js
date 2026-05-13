const { emailRegex, passwordRegex } = require("../services/allRegex");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ------------register controller--------------
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) { return res.status(400).send('name is required'); }
        if (!emailRegex.test(email)) { return res.status(400).send('email is not valid'); }
        if (!passwordRegex.test(password)) { return res.status(400).send('password is not valid'); }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save to db
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// ------------login controller--------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { register, login };