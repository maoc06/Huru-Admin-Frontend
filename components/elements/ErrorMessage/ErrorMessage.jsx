import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ visible, message }) {
  if (!visible) return null;
  return <p className={styles.statusMsg}>{message}</p>;
}
