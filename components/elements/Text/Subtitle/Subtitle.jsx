import styles from './Subtitle.module.css';

export default function Subtitle({ text = 'subtitle' }) {
  return <p className={styles.subtitle}>{text}</p>;
}
