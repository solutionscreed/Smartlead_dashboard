import styles from './ChatHeader.module.css';

export default function ChatHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img src="https://i.pravatar.cc/150?img=1" className={styles.avatar} />
        <span className={styles.name}>Company A (HR)</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.icon}>📞</button>
        <button className={styles.icon}>📅</button>
        <button className={styles.icon}>⋮</button>
      </div>
    </div>
  );
}
