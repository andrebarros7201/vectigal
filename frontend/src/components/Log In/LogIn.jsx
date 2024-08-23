import Button from "../Button/Button.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App.jsx";
import Errors from "../Errors/Errors.jsx";
import axios from "axios";
import styles from "./LogIn.module.scss";

export default function LogIn() {
  let otherErrors = null;
  const {
    setErrors,
    errors,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    user,
    setUser,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleDataChange = (value, field) => {
    setData({ ...data, [field]: value });
  };

  useEffect(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (errors)
      otherErrors = errors.filter(
        (x) => x.path !== "username" && x.path !== "password"
      );
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = data;

    let token, user;
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:3000/auth/log-in",
      data: { username, password },
    })
      .then((res) => {
        token = res.data.token;
        user = res.data.user;
        setToken(token);
        setUser(user);
      })
      .catch((errors) => {
        setErrors(errors.response.data.errors);
        if (errors.response.status === 401) {
          setErrors(new Array({ msg: errors.response.data.message }));
        }
      });
  };

  return (
    <main className={styles["log-in"]}>
      <form className={styles.form}>
        {errors ? <Errors errors={errors} /> : null}
        <span>
          <label htmlFor={"username"}>Username</label>
          <input
            type={"text"}
            id={"username"}
            onChange={(e) => handleDataChange(e.target.value, "username")}
          />
        </span>
        <span>
          <label htmlFor={"password"}>Password</label>

          <input
            type={"password"}
            id={"password"}
            onChange={(e) => handleDataChange(e.target.value, "password")}
          />
        </span>

        <Button
          style={"primary"}
          text={"Submit"}
          type={"submit"}
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </main>
  );
}
