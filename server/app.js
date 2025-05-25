const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const initPassport = require("./config/passport");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");  // 구글 로그인 라우터 추가

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 세션 설정 (구글 로그인 사용 시 세션을 유지할 수 있도록)
app.use(session({
  secret: process.env.SESSION_SECRET,  // 보안을 위해 환경변수에서 가져옴
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());  // passport.session()을 추가하여 세션을 처리하도록 설정

// Passport 초기화
initPassport(passport);

// 라우터 설정
app.use("/users", userRoutes);
app.use("/auth", authRoutes);  // 구글 로그인과 관련된 라우터 추가

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
