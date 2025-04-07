const Question = require('../models/Question');
const Reply = require('../models/Reply');
const User = require('../models/User');

// ===========================
//  Question Controllers
// ===========================

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { title, content, community_id } = req.body;

    const newQuestion = new Question({
      title,
      content,
      community_id,
      author: req.user._id, // Assuming user is authenticated
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Question posted successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
};

// Get all questions (optionally by community)
exports.getAllQuestions = async (req, res) => {
  try {
    const { community_id } = req.query;

    const query = community_id ? { community_id } : {};

    const questions = await Question.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

// Get single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username email');

    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error });
  }
};



// ===========================
// Reply Controllers
// ===========================

// Create a reply to a question
exports.createReply = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content, parentReply } = req.body;

    const newReply = new Reply({
      question: questionId,
      content,
      author: req.user._id,
      parentReply: parentReply || null,
    });

    await newReply.save();
    res.status(201).json({ message: 'Reply posted successfully', reply: newReply });
  } catch (error) {
    res.status(500).json({ message: 'Error posting reply', error });
  }
};

// Get all replies for a question
exports.getRepliesByQuestionId = async (req, res) => {
  try {
    const replies = await Reply.find({ question: req.params.questionId })
      .populate('author', 'username email')
      .populate('parentReply')
      .sort({ createdAt: 1 }); // oldest first

    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching replies', error });
  }
};

