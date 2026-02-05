import User from "../models/user.js";

const addTestUser = async () => {
  try {
    const exists = await User.findOne({ email: "sahil@12.com" });

    if (exists) {
      console.log("Test user already exists");
      return;
    }

    const user = new User({
      name: "Sahil",
      email: "sahil@12.com",
      password: "1234",
    });

    await user.save();
    console.log("Sample user inserted ✅");
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
};

export default addTestUser;
