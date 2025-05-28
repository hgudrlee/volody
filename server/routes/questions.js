const express = require("express");
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  deleteQuestion,
} = require("../controllers/questionsController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

// 전체 질문 목록 조회
router.get("/", getAllQuestions);

// 단일 질문 상세 조회
router.get("/:id", getQuestionById);

// 질문 작성 (로그인 필요)
router.post("/", authenticate, createQuestion);

// 질문 삭제 (로그인 필요)
router.delete("/:id", authenticate, deleteQuestion);

module.exports = router;
