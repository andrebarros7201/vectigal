import styles from "./Button.module.scss";
import PropTypes from "prop-types";

export default function Button({ text, type }) {
  return (
    <button className={`${styles.btn} ${styles[`btn-${type}`]}`}>{text}</button>
  );
}

Button.propTypes={
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}