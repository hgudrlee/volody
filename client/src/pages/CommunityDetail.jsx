import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, ArrowLeft, Send, Edit, Trash2 } from "lucide-react";
import styles from "./CommunityDetail.module.css";
import useUserStore from "../stores/useUserStore";
import useModalStore from "../stores/useModalStore";
import axios from "axios";
import Avatar from "../components/Avatar";

export default function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useUserStore();
  const { openLoginModal } = useModalStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/questions/${id}`);
        console.log("질문 상세:", res.data.data);
        setQuestion(res.data.data);
      } catch (err) {
        setError("질문을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const res = await axios.post(
        `${API_BASE_URL}/questions/${id}/comments`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("새 댓글:", res.data.data);

      setQuestion((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data.data],
      }));
      setCommentText("");
    } catch (err) {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleDeleteQuestion = async () => {
    const confirmDelete = window.confirm("정말 이 질문을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("질문이 삭제되었습니다.");
      navigate("/community");
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) return <div className={styles.container}>불러오는 중...</div>;
  if (error) return <div className={styles.container}>{error}</div>;
  if (!question)
    return <div className={styles.container}>질문을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/community" className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>커뮤니티로 돌아가기</span>
        </Link>

        <article className={styles.questionDetail}>
          <h1 className={styles.questionTitle}>{question.title}</h1>

          <div className={styles.questionMeta}>
            <div className={styles.metaItem}>
              <Avatar user={question.author} size="xs" />
              <span>{question.author?.username || "작성자 없음"}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{new Date(question.created_at).toLocaleDateString()}</span>
            </div>

            {user && user.username === question.author && (
              <div className={styles.authorActions}>
                <Link
                  to={`/community/edit/${id}`}
                  className={styles.editButton}
                >
                  <Edit size={16} />
                  <span>수정</span>
                </Link>
                <button
                  className={styles.deleteButton}
                  onClick={handleDeleteQuestion}
                >
                  <Trash2 size={16} />
                  <span>삭제</span>
                </button>
              </div>
            )}
          </div>

          <div className={styles.questionContent}>
            {question.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>
            댓글 ({question.comments.length})
          </h2>

          <div className={styles.commentsList}>
            {[...question.comments]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((comment) => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <div className={styles.commentAuthor}>
                      {/* <User size={16} /> */}
                      <Avatar user={comment.author} size="xs" />
                      <span>{comment.author?.username || "작성자 없음"}</span>
                    </div>
                    <div className={styles.commentDate}>
                      <Clock size={16} />
                      <span>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className={styles.commentContent}>{comment.content}</div>
                </div>
              ))}
          </div>

          {user ? (
            <form className={styles.commentForm} onSubmit={handleSubmitComment}>
              <textarea
                className={styles.commentInput}
                placeholder="댓글을 작성해주세요..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
              ></textarea>
              <button
                type="submit"
                className={styles.commentButton}
                disabled={!commentText.trim()}
              >
                <Send size={16} />
                <span>댓글 작성</span>
              </button>
            </form>
          ) : (
            <div className={styles.loginPrompt}>
              <p>댓글을 작성하려면 로그인이 필요합니다.</p>
              <button className={styles.loginButton} onClick={openLoginModal}>
                로그인하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
