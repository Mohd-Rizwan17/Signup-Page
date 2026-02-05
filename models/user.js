import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    securityAnswer: {
      type: String,
      required: true,
    },
    securityQuestion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
// es5
// module.exports = mongoose.model("User", userSchema);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return next();
  }
  if (this.isModified("securityAnswer")) {
    this.securityAnswer = bcrypt.hash(this.securityAnswer, 10);
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

// es6
const User = mongoose.model("User", userSchema);

export default User;
