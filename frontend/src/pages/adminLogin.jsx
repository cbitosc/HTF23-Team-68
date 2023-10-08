import { useRef } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const passRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:8000/adminLogin", {
      email: emailRef.current.value,
      password: passRef.current.value,
    });
    console.log(data);
    if (data.success) {
      navigate("/admin");
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
            <input type="text" placeholder="Email" ref={emailRef} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" ref={passRef} />
          </div>
          <div className="form-group">
            <button className="authBtn" onSubmit={handleSubmit}>Login as Admin</button>
          </div>
          <p>
            Dont have an account <Link to="/adminRegister">Register as Admin</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;