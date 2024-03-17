import axios from "axios";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [data,setData] = useState(null);
  const [msg,setMsg] = useState("");
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) =>{
        setData(res.data);
      })
      .catch((err) =>{ 
        setMsg(err.response.data)
        console.log(err)
      });
  }, []);
  return <div>
    {data && (
      <div className="text-white text-5xl">
        Welcome {data.username}
      </div>
    )}
          <div className="text-white text-5xl">{msg}</div>

  </div>;
};

export default Index;
