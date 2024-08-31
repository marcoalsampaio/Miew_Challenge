import styles from "./input-transaction.module.css";

interface InputProps {
  id: string;
  label: string;
  value: string;
  type: string;
  error?: boolean;
  onChange: (name: string, value: string) => void;
}

export default function InputTransaction({
  id,
  label,
  value,
  onChange,
  type,
  error,
}: InputProps) {
  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        style={{ color: error ? "red" : "#52826a", fontWeight: "bold" }}
      >
        {label}
      </label>
      <input
        style={{ borderColor: error ? "red" : "#BEC9C2" }}
        type={type}
        className={styles.input}
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      ></input>
    </div>
  );
}
