import { useState } from "react"
import { ChevronRight, Send } from "lucide-react"
import styles from "./Support.module.css"

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const faqs = [
    {
      question: "어떤 음성 파일 형식을 지원하나요?",
      answer: "현재 MP3, WAV, M4A 형식의 음성 파일을 지원하고 있습니다. 최대 파일 크기는 50MB입니다.",
    },
    {
      question: "변환된 MIDI 파일과 악보는 어떻게 사용할 수 있나요?",
      answer:
        "변환된 MIDI 파일은 대부분의 디지털 오디오 워크스테이션(DAW)에서 사용할 수 있으며, 악보는 PDF 형식으로 제공되어 인쇄하거나 디지털로 활용할 수 있습니다.",
    },
    {
      question: "변환 정확도는 어느 정도인가요?",
      answer:
        "변환 정확도는 원본 음성의 품질, 배경 소음, 음악적 복잡성 등 여러 요소에 따라 달라질 수 있습니다. 최적의 결과를 위해 깨끗한 녹음 환경에서 녹음된 파일을 사용하는 것이 좋습니다.",
    },
    {
      question: "무료로 사용할 수 있나요?",
      answer:
        "기본적인 변환 기능은 무료로 제공되지만, 고급 기능이나 대용량 파일 처리는 유료 플랜에서 제공될 수 있습니다.",
    },
    {
      question: "변환된 파일은 얼마나 오래 보관되나요?",
      answer:
        "변환된 파일은 24시간 동안 서버에 보관되며, 그 이후에는 자동으로 삭제됩니다. 필요한 파일은 변환 후 즉시 다운로드하여 보관하는 것이 좋습니다.",
    },
  ]

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 실제 제출 로직은 여기에 구현
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // 제출 성공 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("문의 제출 중 오류:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>고객 지원</h1>
        <p className={styles.subtitle}>자주 묻는 질문을 확인하거나 문의사항을 보내주세요.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>자주 묻는 질문</h2>

          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                <ChevronRight
                  className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ""}`}
                  size={18}
                />
                {faq.question}
              </div>

              {openFaq === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
            </div>
          ))}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>문의하기</h2>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                제목
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "전송 중..." : "전송하기"}
              {!isSubmitting && <Send size={16} style={{ marginLeft: "0.5rem" }} />}
            </button>

            {submitSuccess && (
              <div style={{ color: "#10b981", marginTop: "1rem" }}>
                문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
