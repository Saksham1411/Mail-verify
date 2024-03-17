import React from "react";
import axios from "axios";
import { Route, Routes, Link } from "react-router-dom";
import Signin from "./components/Signin";
import { SparklesCore } from "./components/ui/sparkles";
import Login from "./components/Login";
import Index from "./components/Index";
const App = () => {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <>
      <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <nav className="flex text-white gap-4 absolute top-0 right-0 p-6">
          <Link to={"/signin"} className="border rounded px-2 py-1 ">
            Signin
          </Link>
          <Link to={"/login"} className="border rounded px-2 py-1 ">
            login
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
