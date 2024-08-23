import styles from "./Button.module.scss";
import PropTypes from "prop-types";

export default function Button({ text, style, type = "button", onClick }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[`btn-${style}`]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
