// utils/commentFormatter.js
function formatComment(raw) {
  return {
    id: raw.id,
    content: raw.content,
    created_at: raw.created_at,
    author_id: raw.author_id,
    question_id: raw.question_id,
    author: {
      username: raw.username,
      profile_picture: raw.profile_picture || null,
    },
  };
}

module.exports = { formatComment };
