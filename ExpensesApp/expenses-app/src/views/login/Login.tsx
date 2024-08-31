import styles from "./login.module.css";
import logo from "../../assets/expenses_logo.png";
import { useEffect } from "react";
import LoginForm from "./form/login-form";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../../utils/models";

export default function Login({ loggedIn, setLoggedIn }: LoginProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) navigate("dasboard");
  });

  return (
    <main>
      <header style={{ paddingLeft: "1rem" }}>
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
          <LoginForm setLoggedIn={setLoggedIn} />
        </div>
      </body>
    </main>
  );
}
