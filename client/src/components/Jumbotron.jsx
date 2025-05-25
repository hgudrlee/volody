import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import styles from "./Jumbotron.module.css"

export default function Jumbotron() {
  return (
    <div className={styles.jumbotron}>
      <div className={styles.content}>
        <h1 className={styles.title}>목소리 하나로 시작되는 나만의 음악</h1>
        <p className={styles.description}>
          작곡이 어렵게 느껴지시나요? <br /> 음악 지식이 없어도 VOLODY와 함께라면 누구나 작곡을 시작할 수 있어요. <br />{" "}
          허밍만 녹음하면, VOLODY가 그것을 MIDI 파일로 바꿔 멋진 음악으로 완성해드립니다.
        </p>

        <Link to="/convert" className={styles.button}>
          시작하기
          <ArrowRight className={styles.buttonIcon} />
        </Link>
      </div>
    </div>
  )
}
