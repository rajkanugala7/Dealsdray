import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  courses: { type: [String], enum: ["MCA", "BCA", "BSC"], required: true },
  image: { type: String, required: false }, // Store the image path or URL
});

const User = mongoose.model("User", userSchema);

export default User;
