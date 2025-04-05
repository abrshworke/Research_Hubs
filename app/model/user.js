import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String, default: "credentials" },
  researches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Researche" }]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;