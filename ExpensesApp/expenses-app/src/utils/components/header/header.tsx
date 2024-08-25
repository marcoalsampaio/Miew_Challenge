import { FaArrowLeft, FaArrowRightFromBracket } from "react-icons/fa6";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { ViewProps } from "../../models";

interface HeaderProps {
  setLoggedIn: (value: boolean) => void;
  goBack?: boolean;
}

export default function HeaderComponent({ setLoggedIn, goBack }: HeaderProps) {
  const nav = useNavigate();
  return (
    <header className={styles.header}>
      <FaArrowRightFromBracket
        className={styles.leaveButton}
        size={20}
        onClick={() => {
          localStorage.removeItem("loggedIn");
          setLoggedIn(false);
        }}
      />

      {goBack ? (
        <FaArrowLeft
          className={styles.leaveButton}
          size={20}
          onClick={() => {
            nav(-1);
          }}
        />
      ) : (
        <></>
      )}
    </header>
  );
}
