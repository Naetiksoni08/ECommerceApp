const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }
  ]
})



const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;