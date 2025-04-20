const express = require('express');
const router = express.Router();
const { postQuestion, getQuestions, postReply, getReplies } = require('../controllers/questioncontroller');

// Define routes
router.post('/post-question', postQuestion);
router.get('/get-questions', getQuestions);
router.post('/post-reply', postReply);
router.get('/get-replies/:question_id', getReplies);

module.exports = router;
