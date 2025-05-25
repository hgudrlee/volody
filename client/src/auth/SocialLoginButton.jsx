import styles from "./Modal.module.css";

const SocialLoginButton = ({ provider, icon, onClick, label }) => {
  return (
    <button className={`${styles.socialButton} ${styles[provider]}`} onClick={onClick}>
      <img src={icon} alt={provider} className={styles.socialIcon} />
      {label}
    </button>
  );
};

export default SocialLoginButton;
