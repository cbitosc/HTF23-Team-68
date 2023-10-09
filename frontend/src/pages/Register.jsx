import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    roll: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:8000/createuser", user);
    console.log(data);
    if (data.success) {
      navigate("/student");
      Cookie.set("token", data.authtoken);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bodyAuth">
      <div className="containerAuth">
        <h2 className="title">Equippy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Roll Number"
              name="roll"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </div>
          <button className="authBtn" onSubmit={handleSubmit}>Register</button>
        </form>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;