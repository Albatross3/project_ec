import React, { useState } from "react";

const Login = () => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
  };

  return (
    <form onSubmit={onSubmit} className="loginForm">
      <div>
        <input
          name="id"
          type="id"
          placeholder="아이디"
          required
          value={id}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
      </div>
      <input
        type="submit"
        value="로그인"
      />
    </form>    
  );
};
export default Login;