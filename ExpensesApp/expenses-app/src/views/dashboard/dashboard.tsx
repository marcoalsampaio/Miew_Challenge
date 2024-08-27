import TransactionComponent from "../../utils/components/transaction-component/transaction-component";
import UserInfo from "../../utils/components/user-info/user-info";
import { TransactionInterface } from "../../utils/models";
import styles from "./dashboard.module.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ExpensesModal from "../expenses/expenses-modal";
import LocalStorageService from "../../utils/mocks/local-storage";
import HeaderComponent from "../../utils/components/header/header";

interface ViewProps {
  setLoggedIn: (value: boolean) => void;
}

export default function Dashboard({ setLoggedIn }: ViewProps) {
  const { setTransaction, getBalance, getLast5Transactions, getTransactions, updateTransaction } =
    LocalStorageService();
  const nav = useNavigate();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [transactionToEdit, setTransactionToEdit] = useState<
    TransactionInterface | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getBalanceFromLocal = () => {
    setBalance(getBalance());
  };

  const getTransactionsFromLocal = () => {
    setTransactions(getLast5Transactions());
  };

  useEffect(() => {
    getTransactionsFromLocal();
    getBalanceFromLocal();
  }, []);

  const updateBalance = (lastTransaction: TransactionInterface) => {
    if (lastTransaction.type === "ADD") {
      const newBalance = balance + lastTransaction.value;
      console.log("New Balance (ADD):", newBalance);
      return newBalance;
    } else {
      const newBalance = balance - lastTransaction.value;
      console.log("New Balance (SUB):", newBalance);
      return newBalance;
    }
  };

  const onSave = (value: TransactionInterface) => {
    const newBalance = updateBalance(value);
    setTransaction([...getTransactions(), value], newBalance.toFixed(2));
    getTransactionsFromLocal();
    getBalanceFromLocal();
    closeModal();
  };

  const onEdit = (value: TransactionInterface, uuid: string) => {
    updateTransaction(value, uuid);
    getBalanceFromLocal();
    getTransactionsFromLocal();
    closeModal();
  };

  const transactionList = transactions.map((tran) => (
    <TransactionComponent
      key={tran.uuid}
      transaction={tran}
      onClick={() => {
        setTransactionToEdit(tran);
        openModal();
      }}
    />
  ));

  return (
    <>
      <HeaderComponent setLoggedIn={setLoggedIn} />
      <section>
        <div className={styles.informationContainer}>
          <UserInfo />
          <div className={styles.accountBalance}>
            <span> Account Balance </span>
            <span>{balance.toFixed(2)}€</span>
          </div>
        </div>
        <div className={styles.last5Container}>
          <div className={styles.last5Title}>
            <span style={{ paddingLeft: "0.25rem" }}>Last transactions</span>
            <AiOutlinePlusCircle
              size={25}
              style={{ paddingRight: "0.25rem", cursor: "pointer" }}
              onClick={openModal}
            />
          </div>
          {transactions.length === 0 ? (
            <span>Whithout Transactions in your account</span>
          ) : (
            transactionList
          )}

          <span onClick={() => nav("/history", {})}>View All</span>
        </div>
      </section>

      <ExpensesModal
        isOpen={isModalOpen}
        transactionToEdit={transactionToEdit}
        closeModal={closeModal}
        onSave={onSave}
        onEdit={onEdit}
      />
    </>
  );
}

//TODO
//Get mock information from json
//Get data from local storage -> Last 5
//Colocar modal em componente a parte
//Criar formulario para adicionar
//History
