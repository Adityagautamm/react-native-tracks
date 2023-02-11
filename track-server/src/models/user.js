import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      // console.log("candidate password:" + candidatePassword);
      // console.log("user password:" + user.password);
      if (err) {
        console.log("at error of compare password method of mongoose schema");
        return reject(err);
      }

      if (!isMatch) {
        console.log("at is MAtch");
        return reject(false);
      }
      console.log("at reslove true");
      resolve(true);
    });
  });
};

var userModel = mongoose.model("User", userSchema);

export default userModel;
