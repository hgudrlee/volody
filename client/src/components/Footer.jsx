import { Link } from "react-router-dom"
import { Music } from "lucide-react"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>VOLODY</span>
        </div>

        <nav className={styles.footerNav}>
          <Link to="/convert" className={styles.footerLink}>
            변환하기
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            GITHUB
          </a>
          <Link to="/community" className={styles.footerLink}>
            커뮤니티
          </Link>
        </nav>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} VOLODY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
