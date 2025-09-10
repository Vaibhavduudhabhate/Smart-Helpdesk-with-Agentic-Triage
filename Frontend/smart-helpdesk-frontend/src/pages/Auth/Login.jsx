import { useState } from "react";
import { loginUser } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login,logout } = useAuth();

  const navigate = useNavigate();

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form)
    try {
      const res = await axios.post(`${API_URL}/login`,{
        email: form.email,
        password: form.password
      });
      console.log("ROLE:-",res.data.user.role )
      if (res && res.data.success) {
        login(res.data.user , res.data.token)
        if (res.data.user.role == "Admin") {
          navigate("/dashboard")
        }else if(res.data.user.role == "Agent"){
          navigate("/agent-dashboard")
        }else if(res.data.user.role == "User"){
          navigate("/user-dashboard");
        }else{
          navigate("/login")
        }
        toast.success("Login Successfully!");
        setForm({ email: "", password: "" });
      }else{
        toast.error("Login failed!");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
      {/* <button onClick={()=>{
        logout();
        setForm({ email: "", password: "" });
      }
      } type="submit" className="bg-white text-blue-500 border mt-2 p-2 w-full">
          Logout
      </button> */}
    </div>
  );
}
