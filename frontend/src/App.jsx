import "./App.css";
import Header from "./components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

export const AppContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <>
      <AppContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          isLoading,
          setIsLoading,
          errors,
          setErrors,
          token,
          setToken,
        }}
      >
        <Header />
        <Outlet />
      </AppContext.Provider>
    </>
  );
}

export default App;
