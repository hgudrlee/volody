import { Mic, Music, FileMusic, Zap, Shield, Clock } from "lucide-react"
import styles from "./Features.module.css"

export default function Features() {
  const features = [
    {
      icon: <Mic className={styles.featureIcon} />,
      title: "간편한 음성 업로드",
      description: "MP3, WAV, M4A 형식의 음성 파일을 드래그 앤 드롭으로 쉽게 업로드할 수 있습니다.",
    },
    {
      icon: <Music className={styles.featureIcon} />,
      title: "정확한 악보 생성",
      description: "AI 기술을 활용하여 음성 녹음에서 정확한 악보를 PDF 형식으로 생성합니다.",
    },
    {
      icon: <FileMusic className={styles.featureIcon} />,
      title: "MIDI 파일 변환",
      description: "녹음된 음악을 편집 가능한 MIDI 파일로 변환하여 DAW에서 활용할 수 있습니다.",
    },
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "빠른 처리 속도",
      description: "고성능 서버를 통해 대부분의 파일을 몇 분 내에 처리하여 결과를 제공합니다.",
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "안전한 파일 처리",
      description: "모든 파일은 암호화되어 처리되며, 24시간 후 자동으로 삭제됩니다.",
    },
    {
      icon: <Clock className={styles.featureIcon} />,
      title: "무제한 사용",
      description: "무료로 제공되는 기능을 통해 언제든지 음성 파일을 변환할 수 있습니다.",
    },
  ]

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>주요 특징</h2>
          <p className={styles.subtitle}>
            음성 녹음 파일을 MIDI와 악보로 변환하는 과정을 더 쉽고 정확하게 만들어주는 기능들을 제공합니다.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
