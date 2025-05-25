import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import styles from "./CallToAction.module.css"

export default function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>지금 바로 음성 파일을 변환해보세요</h2>
        <p className={styles.subtitle}>
          간단한 음성 녹음부터 복잡한 멜로디까지, 모든 음악을 MIDI와 악보로 변환할 수 있습니다. 지금 바로 시작해보세요.
        </p>
        <Link to="/convert" className={styles.button}>
          시작하기
          <ArrowRight className={styles.buttonIcon} />
        </Link>
      </div>
    </section>
  )
}
