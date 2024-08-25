import { useEffect, useState } from "react";
import { UserInterface } from "../../models";
import styles from "./user-info.module.css";
import LocalStorageService from "../../mocks/local-storage";


export default function UserInfo() {
  const {getUser} = LocalStorageService();
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const getUserFromLocal = () => {
      setUser(getUser());
    }

    getUserFromLocal();
  }, []);

  return (
    <div className={styles.container}>
      <img width={100} src={user?.image} alt="user"/>
      <div className={styles.nameContainer}>
        <span>
          <b> {user?.name}</b>
        </span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
}
