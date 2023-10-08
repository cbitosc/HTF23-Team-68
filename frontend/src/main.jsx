import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import adminLogin from "./pages/adminLogin.jsx";
import adminRegister from "./pages/adminRegister.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Student from "./pages/Student.jsx";
import Booking from "./pages/Booking.jsx";
import Admin from "./pages/admin.jsx";
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/adminLogin" Component={adminLogin} />
          <Route path="/adminRegister" Component={adminRegister} />
          <Route path="/student" Component={Student}></Route>
          <Route path="/admin" Component={Admin}></Route>
          <Route path="/booking" Component={Booking}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);