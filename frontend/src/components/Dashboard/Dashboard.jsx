import { useContext } from "react";
import { AppContext } from "../../App";

export default function Dashboard() {
  const { user } = useContext(AppContext);
  return <h2>Welcome back, {user.username}</h2>;
}
