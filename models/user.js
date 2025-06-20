const { createHmac, randomBytes } = require("crypto");
const { createTokenFroUser } = require("../utiles/auth");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/user-avatar.svg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);
// when we try to sve the user first this function is run and this fuction change the password into hased
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;
  const salt = randomBytes(8).toString();
  const hasedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hasedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenrateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!email) throw new Error("User not found");
    const salt = user.salt;
    const hasedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hasedPassword !== userProvidedHash) {
      throw new Error("Incorrect Password");
    }
    const token = createTokenFroUser(user);
    return token;
  }
);

const User = model("user", userSchema);
module.exports = User;
