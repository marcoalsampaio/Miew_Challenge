import userImage from "../../../assets/user_image.jpg";
import { UserInterface } from "../../models";
import styles from "./user-info.module.css";

interface UserInfoProps {
    user: UserInterface | null
}

export default function UserInfo({user}: UserInfoProps) {
  return (
    <div className={styles.container}>
      <img width={100} src={user?.image} />
      <div className={styles.nameContainer}>
        <span>
          <b> {user?.name}</b>
        </span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
}
