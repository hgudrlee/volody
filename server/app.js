const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const initPassport = require("./config/passport");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const questionsRoutes = require("./routes/questions");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

initPassport(passport);

// 기본 루트 경로에 간단한 응답 추가
app.get("/", (req, res) => {
  res.send("API 서버가 정상 작동 중입니다.");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/questions", questionsRoutes);
app.use("/comments", commentRoutes);  // 변경: '/' → '/comments'

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
