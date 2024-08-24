import TransactionComponent from "../../utils/components/transaction-component/transaction-component";
import UserInfo from "../../utils/components/user-info/user-info";
import { TransactionInterface, UserInterface } from "../../utils/models";
import styles from "./dashboard.module.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/mocks/axios";
import Modal from "../../utils/components/modal/modal";
import InputComponent from "../../utils/components/input-component/input-component";

interface DashboardProps {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  user: UserInterface | null;
}

export default function Dashboard({
  loggedIn,
  setLoggedIn,
  user,
}: DashboardProps) {
  const nav = useNavigate();
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axiosInstance.get("/balance");
        console.log(response.data);
        if (response.data) {
          setBalance(response.data.accountBalance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const list: TransactionInterface[] = [
    {
      name: "Prenda de Natal",
      value: 1250.0,
      type: "ADD",
      uuid: uuidv4(),
      date: new Date(),
    },
    {
      name: "Compras",
      value: 1250.0,
      type: "SUB",
      uuid: uuidv4(),
      date: new Date(),
    },
    {
      name: "Prenda de Natal",
      value: 10.0,
      type: "SUB",
      uuid: uuidv4(),
      date: new Date(),
    },
    {
      name: "Compras",
      value: 125.0,
      type: "ADD",
      uuid: uuidv4(),
      date: new Date(),
    },
    {
      name: "Compras",
      value: 125.0,
      type: "ADD",
      uuid: uuidv4(),
      date: new Date(),
    },
  ];

  const transactionList = list.map((tran) => (
    <TransactionComponent key={tran.uuid} transaction={tran} />
  ));

  return (
    <>
      <header className={styles.header}>
        <FaArrowRightFromBracket
          className={styles.leaveButton}
          size={20}
          onClick={() => {
            setLoggedIn(false);
          }}
        />
      </header>
      <section>
        <div className={styles.informationContainer}>
          <UserInfo user={user} />
          <div className={styles.accountBalance}>
            <span> Account Balance </span>
            <span>{balance}€</span>
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
          {transactionList}
          <span onClick={() => nav("history")}>View All</span>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>New Transaction</h2>

        <div>
          <InputComponent
            label="Value"
            inputType={"number"}
            inputName={""}
            inputData={function (name: string, value: string): void {
              throw new Error("Function not implemented.");
            }}
          />

          <label htmlFor="cards">Type</label>
          <select name="cars" id="cars">
            <option value="ADD">ADD</option>
            <option value="SUB">SUB</option>
          </select>
        </div>

        <InputComponent
          label="Name"
          inputType={"text"}
          inputName={""}
          inputData={function (name: string, value: string): void {
            throw new Error("Function not implemented.");
          }}
        />

        <InputComponent
          label="Date"
          inputType={"date"}
          inputName={""}
          inputData={function (name: string, value: string): void {
            throw new Error("Function not implemented.");
          }}
        />

        <button>Save</button>
      </Modal>
    </>
  );
}

//TODO
//Get mock information from json
//Get data from local storage -> Last 5
//Colocar modal em componente a parte
//Criar formulario para adicionar
//History
