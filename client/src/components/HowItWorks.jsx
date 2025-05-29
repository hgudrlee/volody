import styles from "./HowItWorks.module.css"

export default function HowItWorks() {
  const steps = [
    {
      icon: <img src="/play.svg" alt="play icon" className={styles.stepIcon} />,
      title: "목소리 녹음",
      description: "피아노, 기타, 목소리 등 원하는 악기나 목소리로 자유롭게 연주하거나 노래를 녹음합니다.",
    },
    {
      icon: <img src="/voice.svg" alt="voice icon" className={styles.stepIcon} />,
      title: "음악 정보 분석",
      description: "AI를 활용하여 녹음된 음성에서 음높이, 음길이, 박자, 화음 등의 음악적 요소를 분석합니다.",
    },
    {
      icon: <img src="/files.svg" alt="files icon" className={styles.stepIcon} />,
      title: "MIDI 파일 및 악보 생성",
      description: "분석된 정보를 바탕으로 편집 가능한 MIDI 파일과 전문적인 악보를 자동으로 생성합니다.",
    },
  ]

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>음성 분석과 악보 변환</h2>
          <p className={styles.subtitle}>
            음성 녹음을 분석해 MIDI 파일과 악보로 변환합니다.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.progressLine}>
            <div className={styles.line}></div>
            <div className={`${styles.dot} ${styles.dot1}`}></div>
            <div className={`${styles.dot} ${styles.dot2}`}></div>
            <div className={`${styles.dot} ${styles.dot3}`}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
