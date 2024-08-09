import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email:String,
    password:String,
    tokenUser:String,
    phone:String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    favoriteSong:[
      {song_id:String}
    ],
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    likeSong:[{
        song_id:String
    }],
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

export default User;