import { useEffect, useState } from "react";
import { TransactionInterface, ViewProps } from "../../utils/models";
import TransactionComponent from "../../utils/components/transaction-component/transaction-component";
import LocalStorageService from "../../utils/mocks/local-storage";
import { FaArrowRightFromBracket, FaArrowLeft } from "react-icons/fa6";
import styles from  "./history.module.css"
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../utils/components/header/header";

export default function History({ setLoggedIn }: ViewProps) {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const nav = useNavigate();
  const { getTransactions } = LocalStorageService();

  const getTransactionsFromLocal = () => {
    setTransactions(getTransactions());
  };

  useEffect(() => {
    getTransactionsFromLocal();
  }, []);

  const transactionList = transactions.map((tran) => (
    <TransactionComponent key={tran.uuid} transaction={tran} />
  ));

  return (
    <>
      <HeaderComponent setLoggedIn={setLoggedIn} goBack={true}/>

      {transactionList}
    </>
  );
}
