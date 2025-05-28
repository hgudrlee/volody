const db = require("../config/db");
const commentsModel = require("./comments");

// 질문 생성
exports.createQuestion = async (title, content, author_id) => {
  const [result] = await db.query(
    "INSERT INTO questions (title, content, author_id, created_at) VALUES (?, ?, ?, NOW())",
    [title, content, author_id]
  );
  return result;
};

// 전체 질문 목록 조회
exports.getAllQuestions = async () => {
  const [rows] = await db.query(
    `SELECT q.id, q.title, q.content, q.created_at,
            u.username AS author_username,
            u.profile_picture AS author_profile_picture
     FROM questions q
     JOIN users u ON q.author_id = u.id
     ORDER BY q.created_at DESC`
  );

  return rows.map(({ author_username, author_profile_picture, ...rest }) => ({
    ...rest,
    author: {
      username: author_username,
      profile_picture: author_profile_picture,
    },
  }));
};

// 단일 질문 조회
exports.getQuestionById = async (id) => {
  // 1. 질문 정보 조회
  const [questions] = await db.query(
    `SELECT q.id, q.title, q.content, q.created_at, q.author_id,
          u.username AS author_username, u.profile_picture AS author_profile_picture
   FROM questions q
   JOIN users u ON q.author_id = u.id
   WHERE q.id = ?`,
    [id]
  );

  if (questions.length === 0) return null;

  const { author_username, author_profile_picture, ...rest } = questions[0];

  // 댓글 가져오기
  const comments = await commentsModel.getCommentsByQuestionId(id);

  // 리턴 시 author 객체로 재구성
  return {
    ...rest,
    author: {
      username: author_username,
      profile_picture: author_profile_picture,
    },
    comments,
  };
};

// 질문 삭제
exports.deleteQuestionById = async (id) => {
  const conn = await db.getConnection(); // 트랜잭션 처리를 위해 connection 사용

  try {
    await conn.beginTransaction();

    // 1. 해당 질문의 댓글 삭제
    await conn.query(`DELETE FROM comments WHERE question_id = ?`, [id]);

    // 2. 질문 삭제
    const [result] = await conn.query(`DELETE FROM questions WHERE id = ?`, [
      id,
    ]);

    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
