const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/google", userController.googleLogin);              // [1] 구글 로그인 시작
router.get("/google/callback", userController.googleCallback);  // [2] 구글 콜백 처리

router.get("/kakao", userController.kakaoLogin);                // [3] 카카오 로그인 시작
router.get("/kakao/callback", userController.kakaoCallback);    // [4] 카카오 콜백 처리

router.post("/login", userController.login);                    // [5] 로컬 로그인

module.exports = router;
