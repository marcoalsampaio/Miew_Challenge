import styles from "./login.module.css";
import logo from "../../assets/expenses_logo.png";
import { useEffect } from "react";
import LoginForm from "./form/login-form";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../utils/models";


interface LoginProps {
  loggedIn: boolean;
  setLoggedIn: (value: boolean)=> void;
  setUser: (user: UserInterface) => void;
}


export default function Login({loggedIn, setLoggedIn, setUser}: LoginProps) {

  const navigate = useNavigate();
  useEffect (() => {
    if(loggedIn) navigate('dasboard');
  });

  return (
    <main>
      <header>
        <h3>Expenses App</h3>
      </header>
      <body
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>
              Welcome to the best <br />
              Expense
              <br /> tracker application
            </h1>
            <img src={logo} width={120} height={120} alt="logo" />
          </div>
          <h4>
            Start by login into your account and track every cent that you spend
            and earn.
          </h4>
          <LoginForm setLoggedIn={setLoggedIn} setUser={setUser}/>
        </div>
      </body>
    </main>
  );
}
