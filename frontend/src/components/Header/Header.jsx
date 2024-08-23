import styles from "./header.module.scss";
import Button from "../Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn, setToken, setUser } =
    useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    navigate("/");
  }

  return (
    <header className={styles["header"]}>
      <h2>
        <NavLink to={"/"}>
          <em>Vectigal</em>
        </NavLink>
      </h2>
      <nav>
        {isLoggedIn ? (
          <NavLink to={"/"}>
            <Button text="Logout" style="secondary" onClick={handleLogout} />
          </NavLink>
        ) : (
          <>
            <NavLink to={"/sign-up"}>
              <Button text={"Sign Up"} style={"primary"} />
            </NavLink>
            <NavLink to={"/log-in"}>
              <Button text={"Log in"} style={"secondary"} />
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
