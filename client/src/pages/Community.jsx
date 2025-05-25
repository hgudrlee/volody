import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  User,
  Clock,
  ChevronRight,
  Search,
  Plus,
} from "lucide-react";
import styles from "./Community.module.css";
import useUserStore from "../stores/useUserStore";
import useModalStore from "../stores/useModalStore";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUserStore()
  const { openLoginModal } = useModalStore()

  // 더미 데이터 - 실제 구현에서는 API에서 가져올 것입니다
  const questions = [
    {
      id: 1,
      title: "녹음된 피아노 연주가 MIDI로 정확하게 변환되지 않아요",
      author: "피아노러버",
      date: "2023-05-15",
      views: 342,
      comments: 8,
      content:
        "피아노 연주를 녹음했는데 화음 부분이 제대로 인식되지 않습니다. 어떻게 해야 더 정확한 결과를 얻을 수 있을까요?",
    },
    {
      id: 2,
      title: "기타 연주 녹음 시 추천 마이크와 설정이 궁금합니다",
      author: "기타맨",
      date: "2023-05-10",
      views: 215,
      comments: 12,
      content:
        "어쿠스틱 기타 연주를 녹음할 때 어떤 마이크와 설정을 사용하면 좋을까요? 변환 품질을 높이기 위한 팁이 있으면 공유해주세요.",
    },
    {
      id: 3,
      title: "변환된 악보에서 박자가 틀리게 나오는 문제",
      author: "작곡초보",
      date: "2023-05-08",
      views: 189,
      comments: 5,
      content:
        "녹음한 멜로디는 4/4박자인데 변환된 악보에서는 3/4박자로 나옵니다. 이런 경우 어떻게 수정할 수 있나요?",
    },
    {
      id: 4,
      title: "여러 악기가 섞인 녹음 파일 변환 가능한가요?",
      author: "밴드리더",
      date: "2023-05-05",
      views: 276,
      comments: 7,
      content:
        "드럼, 기타, 베이스가 함께 녹음된 파일을 각 악기별로 분리해서 MIDI로 변환할 수 있나요?",
    },
    {
      id: 5,
      title: "변환된 MIDI 파일을 Logic Pro에서 사용하는 방법",
      author: "프로듀서K",
      date: "2023-05-01",
      views: 198,
      comments: 4,
      content:
        "이 서비스로 변환한 MIDI 파일을 Logic Pro에 불러왔는데 일부 노트가 이상하게 표시됩니다. 어떻게 해결할 수 있을까요?",
    },
  ];

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
            <button
              onClick={openLoginModal}
              className={styles.newQuestionButton}
            >
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
                <p className={styles.questionPreview}>{question.content}</p>
                <div className={styles.questionMeta}>
                  <div className={styles.metaItem}>
                    <User size={14} />
                    <span>{question.author}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={14} />
                    <span>{question.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <MessageSquare size={14} />
                    <span>{question.comments}</span>
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
