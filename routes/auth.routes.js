const {Router} = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")
const {check, validationResult} = require("express-validator");
const User = require("../models/User");

const router = Router();

module.exports = router;

// /api/auth/register
router.post("/register",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "min lenght of password 6 symbols").isLength({ min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
               error: errors.array(),
               message: "Incorrect data"
            });
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({message: "User is already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 4);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({message: "User has been created"});

    } catch (e) {
        res.status(500).json({message: "Something wrong, try again"});
    }
});

// /api/auth/login
router.post("/login",
    [
        check("email", "Enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists()
    ],
    async (req, res) => {
    try {
        console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: "Incorrect registration data"
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: "User isnt exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }

        const token = jwt.sign(
            {userID: user.id},
            config.get("jwtSecret"),
            {expiresIn: "1h"}
        );

        res.json({ token, userId: user.id});

    } catch (e) {
        res.status(500).json({message: "Something wrong, try again"});
    }
});