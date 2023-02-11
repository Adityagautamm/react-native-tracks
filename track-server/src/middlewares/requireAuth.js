import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userModel = mongoose.model("User");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }

  const token = authorization.split(" ")[1];
  console.log("token:" + token);
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "wrong JWT token, you must be logged in" });
    }
    const { userId } = payload;
    const user = await userModel.findById(userId);
    req.user = user;
    next();
  });
};

export default requireAuth;
