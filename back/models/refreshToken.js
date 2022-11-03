const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RefreshTokenSchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30 * 86400 // 30 days,
    },
    expireAt: {
      type: Date,
      expires: 30 * 86400 // 30 days,
    }
  },
  // { timestamps: true }, // to build createdAt & updatedAt fields automatically
  { collections: "refreshToken" }
);

const UserRefreshTokens = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = UserRefreshTokens;
