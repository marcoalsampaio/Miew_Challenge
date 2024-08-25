import { useState } from "react";
import InputTransaction from "../../utils/components/input-transaction/input-transaction";
import Modal from "../../utils/components/modal/modal";
import styles from "./expenses-modal.module.css";
import { OptionInterface, TransactionInterface } from "../../utils/models";
import SelectTransaction from "../../utils/components/select-transaction/select-transaction";
import PrimaryButton from "../../utils/components/primary-button/primary-button";
import { v4 as uuidv4 } from "uuid";

interface ExpensesModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (value: TransactionInterface) => void;
}

const optionsList: OptionInterface[] = [
  {
    value: "ADD",
    name: "ADD",
  },
  {
    value: "SUB",
    name: "SUB",
  },
];

export default function ExpensesModal({
  isOpen,
  closeModal,
  onSave,
}: ExpensesModalProps) {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "ADD",
  });

  const [error, setError] = useState("");

  const verifyTransaction = () => {
    setError(() => "");

    if (
      transaction.description === "" &&
      transaction.amount === "" &&
      transaction.date === "" &&
      transaction.type === "ADD"
    ) {
      setError(() => "Please fill all the fields");
      return false;
    }

    if (transaction.amount === "" || transaction.amount === "0") {
      setError(() => "Please insert a number greater than 0");
      return false;
    }
    if (transaction.date === "") {
      setError(() => "Please insert a date");
      return false;
    }
    if (transaction.description === "") {
      setError(() => "Please insert a description for yout transaction");
      return false;
    }

    return true;
  };

  const addTransaction = () => {
    const t: TransactionInterface = {
      uuid: uuidv4(),
      name: transaction.description,
      value: Number(transaction.amount),
      date: new Date(),
      type: transaction.type === "ADD" ? "ADD" : "SUB",
    };
    if (verifyTransaction()) {
      setTransaction(() => ({
        description: "",
        amount: "",
        date: "",
        type: "ADD",
      }));
      onSave(t);
    }
  };

  const handleChange = (name: string, value: string) => {
    setTransaction((prevState) => ({ ...prevState, [name]: value }));
  };

  const onCloseModal = () => {
    setError(() => "");
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <div className={styles.container}>
          <h2>New Transaction</h2>

          <div className={styles.amountTypeContainer}>
            <InputTransaction
              label="Amount"
              id="amount"
              type="number"
              value={transaction.amount}
              error={!!error}
              onChange={handleChange}
            />

            <SelectTransaction
              label="Type"
              id="type"
              onChange={handleChange}
              options={optionsList}
            />
          </div>

          <InputTransaction
            label="Description"
            id="description"
            type="text"
            value={transaction.description}
            error={!!error}
            onChange={handleChange}
          />

          <InputTransaction
            label="Date"
            type="date"
            id="date"
            error={!!error}
            value={transaction.date}
            onChange={handleChange}
          />

          {!!error ? (
            <span style={{ color: "red", height: "1rem", lineHeight: "1rem" }}>
              {error}
            </span>
          ) : (
            <div style={{ height: "1.5rem" }}></div>
          )}

          <PrimaryButton label={"Save"} onClick={addTransaction} />
        </div>
      </Modal>
    </>
  );
}
