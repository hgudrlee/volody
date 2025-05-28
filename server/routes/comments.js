const express = require("express");
const { addComment } = require("../controllers/commentsController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

// 특정 질문에 댓글 추가 (로그인 필요)
router.post("/questions/:id/comments", authenticate, addComment);

module.exports = router;
