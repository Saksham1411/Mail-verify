import React, { useState } from "react";
import { OTPInput } from "input-otp";
import { cn } from "../utils/cn";
import { Navigate } from 'react-router-dom'
import axios from "axios";
const Otp = () => {
  const [otp,setOtp]=useState('');
  const [verified,setVerified] = useState("");
  const [redirect,setRedirect] = useState('');
  async function completeHandler(){
      // console.log(otp);
      try {
        const res = await axios.post('/verify',{otp});
      // console.log(res);
        setVerified("You are verified");
        setRedirect('/');
      } catch (error) {
        setVerified(error.response.data);
        console.log(error.response.data);
      }
      
  }
  if(redirect) return <Navigate to='/'></Navigate>
  return (
    <div className="p-10 bg-black flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-white">Enter OTP</h1>
      <OTPInput
        onComplete={completeHandler}
        maxLength={6}
        value={otp}
        onChange={setOtp}
        containerClassName="group flex items-center has-[:disabled]:opacity-30 text-white"
        render={({ slots }) => (
          <>
            <div className="flex">
              {slots.slice(0, 3).map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>

            <FakeDash />

            <div className="flex">
              {slots.slice(3).map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          </>
        )}
      />
      <h1 className="text-3xl font-bold text-white">{verified}</h1>
    </div>
  );
};

export default Otp;

function Slot(props) {
  return (
    <div
      className={cn(
        "relative w-10 h-14 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-accent-foreground": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-white" />
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}
