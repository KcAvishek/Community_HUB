const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  createReply,
  getRepliesByQuestionId,
} = require("../controllers/discussion"); // Import your controllers
const jwt = require("jsonwebtoken");

// Authentication middleware (example using JWT)
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in your .env
    req.user = decoded; // Assumes decoded token has user info like _id
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get all questions (optionally filtered by community_id via query)
router.get("/questions", getAllQuestions);

// Get a single question by ID
router.get("/questions/:id", getQuestionById);

// Post a new question (protected route)
router.post("/questions", authMiddleware, createQuestion);

// Post a reply to a question (protected route)
router.post("/replies/:questionId", authMiddleware, createReply);

// Get all replies for a question
router.get("/replies/:questionId", getRepliesByQuestionId);

module.exports = router;