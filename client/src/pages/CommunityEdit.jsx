import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from 'lucide-react'
import styles from "./CommunityNew.module.css" // 동일한 스타일 사용
import useUserStore from "../stores/useUserStore"

export default function CommunityEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUserStore()
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState(null)

  // 기존 게시글 데이터 로드
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        // 실제 구현에서는 API 호출
        // const response = await fetch(`/api/questions/${id}`)
        // const questionData = await response.json()
        
        // 더미 데이터 (실제로는 API에서 가져올 데이터)
        const questionData = {
          id: 1,
          title: "녹음된 피아노 연주가 MIDI로 정확하게 변환되지 않아요",
          author: "피아노러버",
          authorId: user?.id, // 실제로는 서버에서 확인
          content: `피아노 연주를 녹음했는데 화음 부분이 제대로 인식되지 않습니다. 어떻게 해야 더 정확한 결과를 얻을 수 있을까요?
          
특히 빠른 패시지나 복잡한 화음을 연주할 때 문제가 발생합니다. 녹음 환경은 디지털 피아노(Yamaha P-125)를 오디오 인터페이스를 통해 직접 연결했고, 48kHz/24bit WAV 파일로 녹음했습니다.

혹시 비슷한 경험이 있으신 분들 조언 부탁드립니다.`
        }

        // 작성자 권한 확인
        if (!user || user.username !== questionData.author) {
          alert('수정 권한이 없습니다.')
          navigate(`/community/${id}`)
          return
        }

        setQuestion(questionData)
        setFormData({
          title: questionData.title,
          content: questionData.content
        })
      } catch (error) {
        console.error('게시글 로드 중 오류:', error)
        alert('게시글을 불러오는데 실패했습니다.')
        navigate('/community')
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadQuestion()
    } else {
      // 로그인하지 않은 경우
      alert('로그인이 필요합니다.')
      navigate('/community')
    }
  }, [id, user, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    setIsSubmitting(true)

    try {
      // 실제 구현에서는 API를 통해 게시글을 수정합니다
      // const response = await fetch(`/api/questions/${id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData),
      // });

      // 수정 성공 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("게시글이 수정되었습니다.")
      navigate(`/community/${id}`)
    } catch (error) {
      console.error("게시글 수정 중 오류:", error)
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            로딩 중...
          </div>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            게시글을 찾을 수 없습니다.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to={`/community/${id}`} className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>게시글로 돌아가기</span>
        </Link>

        <h1 className={styles.title}>게시글 수정</h1>
        <p className={styles.subtitle}>
          게시글 내용을 수정해주세요. 상세한 정보를 제공할수록 더 정확한 답변을 받을 수 있습니다.
        </p>

        <form className={styles.questionForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="질문의 제목을 입력하세요"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              내용
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="질문 내용을 자세히 작성해주세요. 사용한 장비, 설정, 시도한 방법 등을 포함하면 더 좋습니다."
              rows={10}
              required
            ></textarea>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton} 
              onClick={() => navigate(`/community/${id}`)}
            >
              취소
            </button>
            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}