import styles from "./header.module.scss";
import Button from "../Button/Button";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <h2>
        <em>Vectigal</em>
      </h2>
      <nav>
        <Button text={"Sign Up"} type={"primary"} />
        <Button text={"Log in"} type={"secondary"} />
      </nav>
    </header>
  );
}
