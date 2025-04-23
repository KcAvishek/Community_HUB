const Question = require('../models/Questions');
const Reply = require('../models/Replys');

// Post a new question
const postQuestion = async (req, res) => {
  try {
    const { title, content, user_id, username } = req.body;
    const newQuestion = await Question.create({
      title,
      content,
      user_id,
      username,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to post question', error: error.message });
  }
};

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error: error.message });
  }
};

// Post a new reply
const postReply = async (req, res) => {
  try {
    const { question_id, content, user_id, username, parentReply } = req.body;
    const newReply = await Reply.create({
      question_id,
      content,
      user_id,
      username,
      parentReply,
    });
    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ message: 'Failed to post reply', error: error.message });
  }
};

// Get replies for a specific question
const getReplies = async (req, res) => {
  try {
    const { question_id } = req.params;
    const replies = await Reply.find({ question_id });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch replies', error: error.message });
  }
};

module.exports = {postQuestion,getQuestions,postReply,getReplies};
