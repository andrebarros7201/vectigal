import styles from "./Button.module.scss";

export default function Button({ text, type }) {
  return (
    <button className={`${styles.btn} ${styles[`btn-${type}`]}`}>{text}</button>
  );
}
