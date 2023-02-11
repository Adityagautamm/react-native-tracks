import express from "express";
import mongoose from "mongoose";
import requireAuth from "../middlewares/requireAuth.js";

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  console.log("req user id:" + req.user._id);
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "you must provide name and location" });
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

export default router;
