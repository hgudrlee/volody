// EmailLoginForm.jsx
import { useState, useRef, useEffect } from "react";
import styles from "./Modal.module.css";

const EmailLoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    await onSubmit(e, formData);
    setIsLoading(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.inputLabel}>이메일</label>
        <input
          id="email"
          type="email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          ref={inputRef}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.inputLabel}>비밀번호</label>
        <input
          id="password"
          type="password"
          name="password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
          placeholder="영문, 숫자 포함 8자 이상"
          required
        />
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};

export default EmailLoginForm;
