import styles from './Badge.module.css';

export default function Badge({ isActive }) {
  return (
    <div
      className={`${styles.base} ${isActive ? styles.active : styles.inactive}`}
    />
  );
}
