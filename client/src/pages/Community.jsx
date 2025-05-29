import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MessageSquare,
  // User,
  Clock,
  ChevronRight,
  Search,
  Plus,
} from "lucide-react";
import styles from "./Community.module.css";
import useUserStore from "../stores/useUserStore";
import useModalStore from "../stores/useModalStore";
import Avatar from "../components/Avatar";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const { user } = useUserStore();
  const { openLoginModal } = useModalStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/questions`); // 백엔드 API 주소
        setQuestions(response.data.data);
        console.log("질문 목록:", response.data.data);
      } catch (error) {
        console.error("질문을 불러오는 데 실패했습니다:", error);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>커뮤니티</h1>
        <p className={styles.subtitle}>
          음악 변환에 관한 질문을 하고 다른 사용자들과 경험을 공유해보세요.
        </p>

        <div className={styles.actionsBar}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="질문 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          {user ? (
            <Link to="/community/new" className={styles.newQuestionButton}>
              <Plus size={18} />
              <span>질문하기</span>
            </Link>
          ) : (
            <button onClick={openLoginModal} className={styles.newQuestionButton}>
              <Plus size={18} />
              <span>질문하기</span>
            </button>
          )}
        </div>

        <div className={styles.questionsList}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <Link
                to={`/community/${question.id}`}
                key={question.id}
                className={styles.questionCard}
              >
                <div className={styles.questionHeader}>
                  <h3 className={styles.questionTitle}>{question.title}</h3>
                  <ChevronRight className={styles.arrowIcon} size={18} />
                </div>
                <p className={styles.questionPreview}>
                  {question.content.length > 150
                    ? question.content.slice(0, 150) + "..."
                    : question.content}
                </p>
                <div className={styles.questionMeta}>
                  <div className={styles.metaItem}>
                    {/* <User size={14} /> */}
                    <Avatar user={question.author} size="xs" className={styles.questionAvatar}/>
                    <span className={styles.userName}>{question.author?.username || "작성자 없음"}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={14} />
                    <span>
                      {new Date(question.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <MessageSquare size={14} />
                    <span>0</span> {/* 댓글 수는 추후 서버에서 받아서 교체 */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>검색 결과가 없습니다.</p>
              <p>다른 키워드로 검색하거나 새 질문을 작성해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
