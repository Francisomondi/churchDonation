import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: [true, "Name is required"]},
    email: {
      type: String,
      required: [ true, "Email already exists"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],  
        minLength: [6, "Password must be at least 6 characters long"]    
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
  }
});

    userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };
    

export default mongoose.model("User", userSchema);