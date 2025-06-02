const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

require("dotenv").config();

const initPassport = require("./config/passport");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const questionsRoutes = require("./routes/questions");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 5001;

// 기본 미들웨어
app.use(cors());
app.use(express.json());

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// 👉 정적 파일 서빙 (React 빌드 결과, client/dist)
app.use(express.static(path.join(__dirname, "../client/dist")));

// 👉 API 라우트는 /api 접두어로 분리
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/comments", commentRoutes);

// 👉 나머지 모든 요청에 대해 index.html 반환 (SPA 라우팅용)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
