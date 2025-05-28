const { formatComment } = require("../utils/commentFormatter");
const Comment = require("../models/comments");

exports.addComment = async (req, res) => {
  const questionId = req.params.id;
  const { content } = req.body;
  const userId = req.user?.id;

  if (!content) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  }

  try {
    const result = await Comment.createComment(questionId, userId, content);

    const rawComment = await Comment.getCommentById(result.insertId);
    const newComment = formatComment(rawComment);

    res.status(201).json({
      message: "댓글이 성공적으로 작성되었습니다.",
      data: newComment,
    });
  } catch (error) {
    console.error("댓글 작성 오류:", error);
    res.status(500).json({ message: "댓글 작성에 실패했습니다." });
  }
};
