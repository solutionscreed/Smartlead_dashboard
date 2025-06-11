import styles from './ChatInputBox.module.css';

export default function ChatInputBox() {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <button className={styles.iconLeft}>📎</button>

        <input
          type="text"
          placeholder="type a message.."
          className={styles.input}
        />

        <button className={styles.iconRight}>☺</button>
      </div>

      <button className={styles.sendButton}>➤</button>
    </div>
  );
}
