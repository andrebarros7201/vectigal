import styles from "./header.module.scss";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <h2>
        <em>Vectigal</em>
      </h2>
      <nav>
        <NavLink to={"/sign-up"}>
          <Button text={"Sign Up"} style={"primary"} />
        </NavLink>
        <NavLink to={"/log-in"}>
          <Button text={"Log in"} style={"secondary"} />
        </NavLink>
      </nav>
    </header>
  );
}
