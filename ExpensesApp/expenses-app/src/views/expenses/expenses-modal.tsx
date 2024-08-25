import { useState } from "react";
import InputTransaction from "../../utils/components/input-transaction/input-transaction";
import Modal from "../../utils/components/modal/modal";
import styles from "./expenses-modal.module.css";
import { OptionInterface, TransactionInterface } from "../../utils/models";
import SelectTransaction from "../../utils/components/select-transaction/select-transaction";
import PrimaryButton from "../../utils/components/primary-button/primary-button";

interface ExpensesModalProps {
  isOpen: boolean;
  closeModal: () => void;
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
}: ExpensesModalProps) {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "ADD",
  });

  const addTransaction = () => {
    console.log(transaction);
  };

  const handleChange = (name: string, value: string) => {
    setTransaction((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className={styles.container}>
          <h2>New Transaction</h2>

          <div className={styles.amountTypeContainer}>
            <InputTransaction
              label="Amount"
              id="amount"
              type="number"
              value={transaction.amount}
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
            onChange={handleChange}
          />

          <InputTransaction
            label="Date"
              type="date"
            id="date"
            value={transaction.date}
            onChange={handleChange}
          />

          <PrimaryButton label={"Save"} onClick={addTransaction} />
        </div>
      </Modal>
    </>
  );
}
