const Question = require("../models/questions");
const Comment = require("../models/comments");
const { formatComment } = require("../utils/commentFormatter");


// 모든 질문 가져오기
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.getAllQuestions();
    return res.json({ data: questions });
  } catch (error) {
    console.error("질문 목록 불러오기 오류:", error);
    return res
      .status(500)
      .json({ message: "질문 목록을 불러오는 데 실패했습니다." });
  }
};

// 특정 질문 상세 보기
// 댓글 포함된 질문 조회 (getQuestionById 하나로 통일)
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.getQuestionById(id);
    if (!question) {
      return res.status(404).json({ message: "질문을 찾을 수 없습니다." });
    }

    const commentRows = await Comment.getCommentsByQuestionId(id);
    const comments = commentRows.map(formatComment);

    return res.json({
      data: {
        ...question,
        comments,
      },
    });
  } catch (error) {
    console.error("질문 조회 오류:", error);
    return res
      .status(500)
      .json({ message: "질문을 불러오는 데 실패했습니다." });
  }
};

// 질문 작성
exports.createQuestion = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user?.id;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "제목과 내용을 모두 입력해주세요." });
  }

  try {
    const result = await Question.createQuestion(title, content, userId);

    return res.status(201).json({
      message: "질문이 성공적으로 작성되었습니다.",
      data: {
        id: result.insertId,
        title,
        content,
        author_id: userId,
      },
    });
  } catch (error) {
    console.error("질문 작성 오류:", error);
    return res
      .status(500)
      .json({ message: "질문 작성에 실패했습니다." });
  }
};

// 질문 삭제
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    // 1. 해당 질문의 작성자 확인
    const question = await Question.getQuestionById(id);
    if (!question) {
      return res.status(404).json({ message: "해당 질문이 존재하지 않습니다." });
    }

    // 2. 현재 로그인한 사용자가 작성자가 아닐 경우
    if (question.author_id !== userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    // 3. 삭제 실행
    const result = await Question.deleteQuestionById(id);
    return res.json({ message: "질문이 성공적으로 삭제되었습니다." });

  } catch (error) {
    console.error("질문 삭제 오류:", error);
    return res.status(500).json({ message: "질문 삭제에 실패했습니다." });
  }
};


