import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Hash password befor saving
userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
  } catch (err) {
    console.error(err);
  }
});


// Compare passwords
userSchema.methods.comparePassword = async function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password)
}


// this means create model using above schema (model interacts with MongoDB)
// which means use can use (User.creat or User.find() etc)
export default mongoose.model("User", userSchema);
