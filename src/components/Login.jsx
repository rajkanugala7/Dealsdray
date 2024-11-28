import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Save username to localStorage
    localStorage.setItem("username", username);

    console.log("Username:", username);
    console.log("Password:", password);
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div>
      <div className="navbar logonav">
        <img src="./dealsdray_logo.jpg" alt="" />
      </div>
      <div className="loginpage">
        <h1
          style={{
            position: "absolute",
            left: "700px",
            bottom: "550px",
          }}
        >
          Login
        </h1>
        <img
          src="./student.jpg"
          alt=""
          id="loginimg"
          style={{
            width: "35vw",
            height: "60vh",
            alignSelf: "center",
          }}
        />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
