const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    isAdmin: Boolean,
    salt: String,
    wishList: [{ type: Schema.Types.ObjectId, ref: "wishList", require: true }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete RTCDataChannel.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model('users', UserSchema);