const express = require("express");
const { signup, getMe } = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

// 기존 회원가입 라우트
router.post("/signup", signup);

// 로그인한 사용자 정보 조회
router.get("/me", authenticate, getMe);

module.exports = router;
