import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userModel = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new userModel({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
    console.log(req.body);
  } catch (error) {
    res.status(422).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send({ error: "Must provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      //change the messge for production so that malacious user dont understand if emailisnt user or not, use smae message as 'Invalid Password or Email'
      return res.status(422).send({ error: "Email not found" });
    }

    // console.log("candidate password:" + password);
    // console.log("user password:" + user.password);
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid Password or Email" });
  }
});

export default router;
