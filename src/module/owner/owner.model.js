import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  },
  company: {
    type: String,
    required: [true, "company name is required"],
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
});

export default mongoose.model("Owner", ownerSchema);
