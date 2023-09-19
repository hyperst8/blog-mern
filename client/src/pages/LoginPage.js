import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Message from "../components/Message";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (ev) => {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setMessage("Login successfully");
        setSuccess(true);
        setTimeout(() => {
          setRedirect(true);
          setMessage("");
          setSuccess(null);
        }, 1500);
      });
    } else {
      setMessage("Wrong username or password");
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (username === "" || password === "") {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [username, password]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button disabled={disabledBtn}>Login</button>
      {message && message !== "" && (
        <Message success={success} message={message} />
      )}
    </form>
  );
};

export default LoginPage;
