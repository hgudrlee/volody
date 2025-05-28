import styles from "./Avatar.module.css";

export default function Avatar({ user, size = "md", className =  ""}) {
  if (!user) return null;
  console.log(user.profile_picture);

  return (
    <div className={`${styles.avatar} ${styles[size]} ${className}`}>
      {user.profile_picture ? (
        <img
          src={user.profile_picture}
          alt={user.username}
          className={styles.avatarImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.svg";
          }}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className={styles.avatarText}>
          {user.username?.charAt(0).toUpperCase() || "U"}
        </span>
      )}
    </div>
  );
}
