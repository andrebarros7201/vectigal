import Button from "../Button/Button.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App.jsx";
import Errors from "../Errors/Errors.jsx";
import styles from "./SignUp.module.scss";

export default function SignUp() {
  const { setErrors, errors } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleDataChange = (value, field) => {
    setData({ ...data, [field]: value });
  };

  useEffect(() => {
    setErrors(null);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = data;

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:3000/auth/sign-up",
      data: { username, email, password, confirmPassword },
    })
      .then(() => {
        navigate("/log-in");
      })
      .catch((errors) => setErrors(errors.response.data.errors));
  };

  return (
    <main className={styles["sign-up"]}>
      <form className={styles["sign-form"]}>
        <span>
          <label htmlFor={"username"}>Username</label>
          <input
            type={"text"}
            id={"username"}
            onChange={(e) => handleDataChange(e.target.value, "username")}
          />
          {errors && (
            <Errors errors={errors.filter((x) => x.path === "username")} />
          )}
        </span>
        <span>
          <label htmlFor={"email"}>Email</label>

          <input
            type={"email"}
            id={"email"}
            onChange={(e) => handleDataChange(e.target.value, "email")}
          />
          {errors && (
            <Errors errors={errors.filter((x) => x.path === "email")} />
          )}
        </span>
        <span>
          <label htmlFor={"password"}>Password</label>

          <input
            type={"password"}
            id={"password"}
            onChange={(e) => handleDataChange(e.target.value, "password")}
          />
          {errors && (
            <Errors errors={errors.filter((x) => x.path === "password")} />
          )}
        </span>
        <span>
          <label htmlFor={"confirm-password"}>Confirm Password</label>

          <input
            type={"password"}
            id={"confirm-password"}
            onChange={(e) =>
              handleDataChange(e.target.value, "confirmPassword")
            }
          />
          {errors && (
            <Errors
              errors={errors.filter((x) => x.path === "confirm-password")}
            />
          )}
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
