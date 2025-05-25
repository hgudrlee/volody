import styles from "./Testimonials.module.css"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Eliot Reed",
      role: "작곡가",
      content:
        "Thanks to the music converter, the composing process has become much faster. I can simply record the melody that comes to mind and convert it into a MIDI file, which makes working on music incredibly convenient.",
      avatar: "https://images.unsplash.com/photo-1731496658386-f743fbb3cf95?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 이미지 경로 또는 URL
    },
    {
      name: "Miles Harper",
      role: "음악 유튜버",
      content:
        "Using this music converter has really enriched the content on my YouTube channel. I can convert my recorded performances into MIDI and arrange them with various instruments. My subscribers really love this feature too!",
      avatar: "https://images.unsplash.com/photo-1672863601285-253fc82db868?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Lila Monroe",
      role: "음악 교사",
      content:
        "The feature that converts students' performances into sheet music is incredibly useful. It allows me to give visual feedback by showing their practice progress, which has greatly improved the effectiveness of my teaching.",
      avatar: "https://images.unsplash.com/photo-1581343401100-2c1daf54cb80?q=80&w=2852&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>사용자 후기</h2>
          <p className={styles.subtitle}>음악변환기를 사용해본 다양한 사용자들의 실제 경험담을 확인해보세요.</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.avatar}>
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <blockquote className={styles.quote}>"{testimonial.content}"</blockquote>
                <div className={styles.author}>
                  <p className={styles.name}>{testimonial.name}</p>
                  <p className={styles.role}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
