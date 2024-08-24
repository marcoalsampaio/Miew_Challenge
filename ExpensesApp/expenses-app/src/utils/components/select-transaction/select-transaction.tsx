import { OptionInterface } from "../../models";
import styles from "../input-transaction/input-transaction.module.css";
interface SelectTransactionProps {
  id: string;
  label: string;
  onChange: (name: string, value: string) => void;
  options: OptionInterface[];
}

export default function SelectTransaction({
  id,
  label,
  onChange,
  options,
}: SelectTransactionProps) {
  const optionList = options.map((option) => (
    <option value={option.value}>{option.name}</option>
  ));

  return (
    <div className={styles.container}>
      <label style={{ color:"#52826a", fontWeight: "bold" }} htmlFor="type">{label}</label>
      <select
        style={{width: "100%"}}
        className={styles.input}
        id={id}
        onChange={(event) => onChange("type", event.target.value)}
      >
        {optionList}
      </select>
    </div>
  );
}
