import { useEffect, useState } from "react";
import InputTransaction from "../../utils/components/input-transaction/input-transaction";
import Modal from "../../utils/components/modal/modal";
import styles from "./expenses-modal.module.css";
import {
  ExpensesModalProps,
  OptionInterface,
  TransactionInterface,
} from "../../utils/models";
import SelectTransaction from "../../utils/components/select-transaction/select-transaction";
import PrimaryButton from "../../utils/components/primary-button/primary-button";
import { v4 as uuidv4 } from "uuid";

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
  transactionToEdit,
  onEdit,
}: ExpensesModalProps) {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "ADD",
  });

  useEffect(() => {
    if (transactionToEdit) {
      setTransaction({
        description: transactionToEdit.name ?? "",
        amount: transactionToEdit.value.toString() ?? "",
        date: transactionToEdit.date.toISOString().split("T")[0] ?? "",
        type: transactionToEdit.type ?? "ADD",
      });
    }
  }, [transactionToEdit]);

  console.log(transactionToEdit);
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
    console.log(new Date(Date.parse(transaction.date)));
    const t: TransactionInterface = {
      uuid: uuidv4(),
      name: transaction.description,
      value: Number(transaction.amount),
      date: new Date(Date.parse(transaction.date)),
      type: transaction.type === "ADD" ? "ADD" : "SUB",
      createDate: new Date(),
    };
    if (verifyTransaction()) {
      setTransaction(() => ({
        uuid: "",
        description: "",
        amount: "",
        date: "",
        type: "ADD",
      }));
      onSave(t);
    }
  };

  const editTransaction = () => {
    console.log(new Date(Date.parse(transaction.date)));
    const t: TransactionInterface = {
      uuid: transactionToEdit!.uuid,
      name: transaction.description,
      value: Number(transaction.amount),
      date: new Date(Date.parse(transaction.date)),
      type: transaction.type === "ADD" ? "ADD" : "SUB",
      createDate: new Date(),
    };
    if (verifyTransaction()) {
      setTransaction(() => ({
        description: "",
        amount: "",
        date: "",
        type: "ADD",
      }));
      onEdit(t, transactionToEdit!.uuid);
    }
  };

  const handleChange = (name: string, value: string) => {
    setTransaction((prevState) => ({ ...prevState, [name]: value }));
  };

  const onCloseModal = () => {
    setError(() => "");
    setTransaction(() => ({
      uuid: "",
      description: "",
      amount: "",
      date: "",
      type: "ADD",
    }));
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <div className={styles.container}>
          <h2>{transactionToEdit ? "Edit " : "New "}Transaction</h2>

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
              value={transaction.type}
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

          <PrimaryButton
            label={"Save"}
            onClick={transactionToEdit ? editTransaction : addTransaction}
          />
        </div>
      </Modal>
    </>
  );
}
