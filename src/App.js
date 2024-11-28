import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
  }, []);

  return (<div>
    <Navbar/>
    <div
      style={{
        width: "100vw",
        height: "94vh",
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          padding: "60px",
          alignSelf: "center",
          marginTop: "30vh",
          fontSize: "3rem",
          animation: "fadeInUp 2s ease-out",
        }}
      >
        🎉 Welcome {username || "Guest"}!
      </h1>

      {/* Keyframes Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
  </div>
  </div>
 
  );
}

export default App;
