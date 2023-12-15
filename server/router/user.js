const express = require("express");
const router = express.Router();

const { User } = require("../model/User.js");
const { Counter } = require("../model/Counter.js");

router.post("/join", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .exec()
        .then((result) => {
            temp.userNum = result.userNum;

            const userData = new User(temp);
            userData
                .save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    })
                })

        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false });
        })
});

module.exports = router;