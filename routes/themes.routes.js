const {Router} = require("express");
const Theme = require("../models/Theme");
const Comment = require("../models/Comment");
const config = require("config");
const auth = require("../middleware/auth.middleware");


const router = Router();


router.post("/createTheme", auth, async (req, res) => {
    try {
        const {label, text} = req.body;
        const theme = new Theme({
            label, text, owner: req.user.userID
        });
        await theme.save();

        res.status(201).json({theme});
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

router.post("/createComment/:id", auth, async (req, res) => {
    try {
        const {userName, text} = req.body;
        const comment = new Comment({
            userName, text, ownerTheme: req.params.id, owner: req.user.userID,
        })
        await comment.save();
        return res.status(201).json(comment);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});
router.post("/deleteTheme/:id", auth, async (req, res) => {
    try {
        const theme = Theme.findById(req.params.id);
        const comments = Comment.find({ownerTheme: req.params.id});
        await theme.remove();
        await comments.remove();
        return res.status(201).json({message: "success"});
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});
router.post("/deleteComment/:id", auth, async (req, res) => {
    try {
        const comment = Comment.findById(req.params.id);
        await comment.remove();
        return res.status(201).json({message: "success"});
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

router.get("/allThemes", auth, async (req, res) => {
    try {
        const themes = await Theme.find({});
        return res.status(201).json(themes);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const themes = await Theme.find({ owner: req.user.userID });
        res.status(201).json(themes);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const theme = await Theme.findById(req.params.id);
        const comments = await Comment.find({ownerTheme: req.params.id});
        const thisIsThemeCreator = theme.owner == req.user.userID;
        console.log(2);
        const createThisIsCommentsCreatorArray = (comments) => {
            let thisIsCommentsCreatorArray = [];
            console.log(comments.length);
            for (let i = 0; i < comments.length; i++) { // выведет 0, затем 1, затем 2
                thisIsCommentsCreatorArray[i] = comments[i].owner == req.user.userID;
            }
            return thisIsCommentsCreatorArray;
        };
        console.log(3);
        const thisIsCommentsCreatorArray = createThisIsCommentsCreatorArray(comments);
        console.log(4);
        res.json({theme, comments, thisIsThemeCreator, thisIsCommentsCreatorArray});
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

module.exports = router;
