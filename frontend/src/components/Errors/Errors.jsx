import PropTypes from "prop-types";
import styles from "./Error.module.scss";

export default function Errors({ errors }) {
  return (
    <div className={styles.errors}>
      {errors.map((error, index) => (
        <p key={index}>{error.msg}</p>
      ))}
    </div>
  );
}

Errors.propType = {
  errors: PropTypes.array,
};
