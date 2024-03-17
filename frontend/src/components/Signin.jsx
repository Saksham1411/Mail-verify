import React, { useState } from "react";
import Otp from "./Otp";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();

    const res = await axios.post("/register", { email, password,username });
    // console.log(res);
    setShowOtp(true);
  }
  return (
    <div className=" z-50">
      {!showOtp && (
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 text-white"
        >
          <input
            type="text"
            placeholder="Username"
            className="border bg-gray-100 bg-opacity-5 px-2 py-1 rounded-lg text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Sign in
          </button>
        </form>
      )}
      {showOtp && <Otp />}
    </div>
  );
};

export default Signin;
