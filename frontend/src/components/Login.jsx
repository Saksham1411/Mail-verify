import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect] = useState('');

  async function submitHandler(e) {
    e.preventDefault();

    const res = await axios.post("/login", { email, password });
    setRedirect('/');

    console.log(res);
  }
  if(redirect) return <Navigate to='/'></Navigate>
  return (
    <div className=" z-50">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 text-white"
        >
          <input
            type="email"
            placeholder="Email"
            className="border bg-gray-100 bg-opacity-5 px-2 py-1 rounded-lg text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border bg-gray-100 bg-opacity-5 px-2 py-1 rounded-lg text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border bg-gray-100 bg-opacity-5 px-2 py-1 rounded-lg text-white"
          >
            Log in
          </button>
        </form>
    </div>
  );
};

export default Login;
