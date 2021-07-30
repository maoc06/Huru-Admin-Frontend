import styles from './ThreeSections.module.css';

export default function ThreeSection({ lateralPanel, inbox, content }) {
  return (
    <main className={styles.wrapper}>
      <section className={styles.lateral}>{lateralPanel}</section>

      <section className={styles.inbox}>{inbox}</section>

      <section className={styles.content}>{content}</section>
    </main>
  );
}
