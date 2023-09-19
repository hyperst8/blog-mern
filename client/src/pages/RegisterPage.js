import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Message from "../components/Message";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const register = async (ev) => {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      setSuccess(true);
      setMessage("Registration success");
      setTimeout(() => {
        setRedirect(true);
        setSuccess(null);
        setMessage("");
      }, 1500);
    } else {
      setSuccess(false);
      setMessage("Registration failed");
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
    return <Navigate to={"/login"} />;
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button disabled={disabledBtn}>Register</button>

      {message && message !== "" && (
        <Message success={success} message={message} />
      )}
    </form>
  );
};

export default RegisterPage;
