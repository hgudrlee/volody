const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { findByEmail, createUser } = require("../models/users");
const User = require("../models/users");

// ✅ [1] 구글 로그인 시작
exports.googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })(req, res, next);
};

// ✅ [2] 구글 로그인 콜백
exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect("/auth/google/failure");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        profile_picture: user.profile_picture || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("구글 로그인 사용자:", user);
    return res.redirect(`http://localhost:3000/?token=${token}`);
  })(req, res, next);
};

// ✅ [3] 카카오 로그인 시작
exports.kakaoLogin = (req, res, next) => {
  passport.authenticate("kakao", {
    session: false,
  })(req, res, next);
};

// ✅ [4] 카카오 로그인 콜백
exports.kakaoCallback = (req, res, next) => {
  passport.authenticate("kakao", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect("/auth/kakao/failure");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email || null, // <- email이 없으면 null 처리
        username: user.displayName,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("카카오 로그인 사용자:", user);
    return res.redirect(`http://localhost:3000/?token=${token}`);
  })(req, res, next);
};

// ✅ [5] 로컬 로그인 처리
exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({ message: info?.message || "로그인 실패" });
    }

    console.log("로컬 로그인 사용자:", user);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  })(req, res, next);
};

// ✅ 회원가입
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      if (!existingUser.password) {
        return res.status(400).json({
          message:
            "해당 이메일은 구글 로그인으로 가입되었습니다. 구글 로그인을 이용해주세요.",
        });
      }

      return res.status(400).json({ message: "이미 가입된 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(username, email, hashedPassword);

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
};

// ✅ 내 정보 가져오기
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByEmail(req.user.email);
    return res.json({ data: user });
  } catch (error) {
    console.error("사용자 정보 불러오기 오류:", error);
    return res
      .status(500)
      .json({ message: "사용자 정보를 불러오지 못했습니다." });
  }
};
