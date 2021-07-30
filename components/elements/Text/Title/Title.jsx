import styles from './Title.module.css';

export default function Title({ text = 'title' }) {
  return <h4 className={styles.title}>{text}</h4>;
}
