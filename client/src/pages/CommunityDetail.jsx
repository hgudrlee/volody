import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { User, Clock, ArrowLeft, Send, Edit, Trash2 } from "lucide-react";
import styles from "./CommunityDetail.module.css";
import useUserStore from "../stores/useUserStore";
import useModalStore from "../stores/useModalStore";

export default function CommunityDetail() {
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const { user } = useUserStore();
  const { openLoginModal } = useModalStore();

  // 더미 데이터 - 실제 구현에서는 API에서 가져올 것입니다
  const question = {
    id: 1,
    title: "녹음된 피아노 연주가 MIDI로 정확하게 변환되지 않아요",
    author: "피아노러버",
    date: "2023-05-15",
    views: 342,
    content: `피아노 연주를 녹음했는데 화음 부분이 제대로 인식되지 않습니다. 어떻게 해야 더 정확한 결과를 얻을 수 있을까요?
    
    특히 빠른 패시지나 복잡한 화음을 연주할 때 문제가 발생합니다. 녹음 환경은 디지털 피아노(Yamaha P-125)를 오디오 인터페이스를 통해 직접 연결했고, 48kHz/24bit WAV 파일로 녹음했습니다.
    
    혹시 비슷한 경험이 있으신 분들 조언 부탁드립니다.`,
    comments: [
      {
        id: 1,
        author: "음악전문가",
        date: "2023-05-15",
        content:
          "녹음 품질은 좋은 것 같네요. 변환 전에 오디오 노멀라이징을 해보시는 건 어떨까요? 또한 복잡한 화음의 경우 템포를 조금 늦춰서 연주한 후 변환하면 더 정확한 결과를 얻을 수 있습니다.",
      },
      {
        id: 2,
        author: "개발자Kim",
        date: "2023-05-16",
        content:
          "현재 AI 변환 알고리즘이 복잡한 화음을 100% 정확하게 인식하는 데 한계가 있습니다. 피아노 연주의 경우 각 음을 조금 더 분리해서 연주하면 인식률이 높아집니다. 그리고 변환 후 MIDI 편집기에서 수동으로 조정하는 것도 좋은 방법입니다.",
      },
      {
        id: 3,
        author: "클래식팬",
        date: "2023-05-16",
        content:
          "저도 비슷한 문제를 겪었는데, 녹음 전에 피아노 음량을 조금 줄이고 각 음을 더 또렷하게 연주하니 인식률이 높아졌어요. 그리고 가능하다면 MIDI 출력을 지원하는 디지털 피아노를 사용하는 것이 가장 정확합니다.",
      },
    ],
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // 실제 구현에서는 API를 통해 댓글을 저장합니다
    alert("댓글이 등록되었습니다.");
    setCommentText("");
  };

  if (!question) {
    return <div className={styles.container}>질문을 찾을 수 없습니다.</div>;
  }

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
              <User size={16} />
              <span>{question.author}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{question.date}</span>
            </div>

            {/* {user && user.username === question.author && (
              <div className={styles.authorActions}>
                <Link to={`/community/edit/${id}`} className={styles.editButton}>
                  <Edit size={16} />
                  <span>수정</span>
                </Link>
                <button className={styles.deleteButton}>
                  <Trash2 size={16} />
                  <span>삭제</span>
                </button>
              </div>
            )} */}

            <div className={styles.authorActions}>
              <Link to={`/community/edit/${id}`} className={styles.editButton}>
                <Edit size={16} />
                <span>수정</span>
              </Link>
              <button className={styles.deleteButton}>
                <Trash2 size={16} />
                <span>삭제</span>
              </button>
            </div>
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
            {question.comments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentAuthor}>
                    <User size={16} />
                    <span>{comment.author}</span>
                  </div>
                  <div className={styles.commentDate}>
                    <Clock size={16} />
                    <span>{comment.date}</span>
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
