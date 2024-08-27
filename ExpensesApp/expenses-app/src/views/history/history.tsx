import { useEffect, useState } from "react";
import {
  OptionInterface,
  TransactionInterface,
  ViewProps,
} from "../../utils/models";
import TransactionComponent from "../../utils/components/transaction-component/transaction-component";
import LocalStorageService from "../../utils/mocks/local-storage";
import styles from "./history.module.css";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../utils/components/header/header";
import SelectTransaction from "../../utils/components/select-transaction/select-transaction";

export default function History({ setLoggedIn }: ViewProps) {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [selectedValue, setSelectedValue] = useState("NEW");
  const { getTransactions, getFilteredTransactions } = LocalStorageService();

  const getTransactionsFromLocal = () => {
    setTransactions(getFilteredTransactions("date", "NEW"));
  };

  useEffect(() => {
    getTransactionsFromLocal();
  }, []);

  const transactionList = transactions.map((tran) => (
    <TransactionComponent key={tran.uuid} transaction={tran} onClick={() => {}} />
  ));

  const dateList: OptionInterface[] = [
    {
      value: "NEW",
      name: "New first",
    },
    {
      value: "OLD",
      name: "Old first",
    },
  ];

  const handleChange = (name: string, value: string) => {
    setSelectedValue(() => value);
    setTransactions( () => getFilteredTransactions(name, value));
  };

  return (
    <>
      <HeaderComponent setLoggedIn={setLoggedIn} goBack={true} />
      <section>
        <div className={styles.main}>
          <h3 style={{margin: 0}}>Transactions History</h3>
          <div className={styles.filter}>
            <SelectTransaction
              label="Date"
              id="date"
              value={selectedValue}
              onChange={handleChange}
              options={dateList}
            />
          </div>
          <div className={styles.listFather}>{transactionList}</div>
        </div>
      </section>
    </>
  );
}
