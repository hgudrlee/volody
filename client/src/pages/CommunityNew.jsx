import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import styles from "./CommunityNew.module.css"
import useUserStore from "../stores/useUserStore"

export default function CommunityNew() {
  const navigate = useNavigate()
  const token = useUserStore((state) => state.token)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await axios.post(`${API_BASE_URL}/questions`, formData, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      alert("질문이 등록되었습니다.")
      navigate("/community")
    } catch (error) {
      console.error("질문 등록 중 오류:", error)
      const message =
        error.response?.data?.message || "질문 등록에 실패했습니다. 다시 시도해주세요."
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/community" className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>커뮤니티로 돌아가기</span>
        </Link>

        <h1 className={styles.title}>새 질문 작성</h1>
        <p className={styles.subtitle}>
          음악 변환에 관한 질문을 작성해주세요. 상세한 정보를 제공할수록 더 정확한 답변을 받을 수 있습니다.
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
            <button type="button" className={styles.cancelButton} onClick={() => navigate("/community")}>
              취소
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "질문 등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
