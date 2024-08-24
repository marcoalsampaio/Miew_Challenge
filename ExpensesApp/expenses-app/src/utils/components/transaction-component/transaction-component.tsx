import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { TransactionInterface } from "../../models";
import styles from "./transaction-component.module.css";

interface TransactionComponentProps {
  transaction: TransactionInterface;
}

export default function TransactionComponent({
  transaction,
}: TransactionComponentProps) {
  const isAdd = transaction.type === "ADD";

  return (
    <>
      <div className={isAdd ? styles.addContainer : styles.subContainer}>
        <div style={{ paddingLeft: "1rem" }}>
          {isAdd ? (
            <FaArrowUp style={{ color: "green" }} />
          ) : (
            <FaArrowDown style={{ color: "red" }} />
          )}
          
          <span className={styles.transactionName}>{transaction.name}</span>
        </div>
        <span className={styles.transactionValue}>
          {" "}
          {isAdd ? "+" : "-"} {transaction.value}{" "}
        </span>
      </div>
    </>
  );
}
