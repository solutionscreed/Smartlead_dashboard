import styles from './ChatMessageBubble.module.css';

export default function ChatMessageBubble({
  type,
  text,
  time,
}: {
  type: 'incoming' | 'outgoing';
  text: string;
  time: string;
}) {
  return (
    <div className={type === 'incoming' ? styles.incomingWrapper : styles.outgoingWrapper}>
      <div className={type === 'incoming' ? styles.incoming : styles.outgoing}>
        {text}
      </div>
    </div>
  );
}
