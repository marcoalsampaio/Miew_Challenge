import styles from "./primary-button.module.css";

interface PrimaryButtonProps {
  label: String;
  onClick: () => void;
}

export default function PrimaryButton({ label, onClick }: PrimaryButtonProps) {
  return (
    <main className={styles.alignCenter}>
      <button tabIndex={0} className={styles.button} onClick={onClick}>
        {label}
      </button>
    </main>
  );
}
