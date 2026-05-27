const { clerkClient } = require("@clerk/clerk-sdk-node");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      user = await User.create({
        clerkId: userId,
        name: clerkUser.fullName || "User",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        profileImageUrl: clerkUser.imageUrl,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized", error: error.message });
  }
};

module.exports = { protect };
