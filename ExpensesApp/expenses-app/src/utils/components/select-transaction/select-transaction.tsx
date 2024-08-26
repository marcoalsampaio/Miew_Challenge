import { OptionInterface } from "../../models";
import { v4 as uuidv4 } from "uuid";

import styles from "../input-transaction/input-transaction.module.css";
interface SelectTransactionProps {
  id: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: OptionInterface[];
}

export default function SelectTransaction({
  id,
  label,
  onChange,
  options,
  value,
}: SelectTransactionProps) {
  const optionList = options.map((option) => (
    <option key={uuidv4()} value={option.value}>{option.name}</option>
  ));

  return (
    <div className={styles.container}>
      <label style={{ color:"#52826a", fontWeight: "bold" }} htmlFor="type">{label}</label>
      <select
        style={{width: "100%"}}
        className={styles.input}
        id={id}
        value={value}
        onChange={(event) => onChange("type", event.target.value)}
      >
        {optionList}
      </select>
    </div>
  );
}
