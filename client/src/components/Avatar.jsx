import styles from "./Avatar.module.css"

export default function Avatar({ user, size = "md" }) {
  if (!user) return null

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {user.profile_picture ? (
        <img
          src={user.profile_picture || "/placeholder.svg"}
          alt={user.username}
          className={styles.avatarImage}
        />
      ) : (
        <span className={styles.avatarText}>
          {user.username?.charAt(0).toUpperCase() || "U"}
        </span>
      )}
    </div>
  )
}
