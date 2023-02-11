import User from "./models/user.js";
import Track from "./models/Track.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import requireAuth from "./middlewares/requireAuth.js";

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:admin@cluster0.tfco9u0.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect(mongoUri, { useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

app.get("/", requireAuth, (req, res) => {
  res.send("Hello buddy Jwt works");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting to mongo", err);
});

app.listen("3000", () =>
  console.log(`Server Running on Port: http://localhost:3000`)
);
