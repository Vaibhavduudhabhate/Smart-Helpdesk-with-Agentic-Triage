import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext.jsx';
import { AdminDashboard } from '../pages/Dashboards/AdminDashboard.jsx';

const  AgentRoute = () => {
    const [ok, setOk] = useState(false);
    const {user} = useAuth();

    useEffect(() => { 
        const autoCheck = async ()=>{
            const res = await axios.get("http://localhost:3000/api/agent-auth",{
                headers: {
                    Authorization: user.token
                },
            }
        );
        console.log("response",res)
        if(res.data){
            setOk(true);
        }else{
            setOk(false);
        }
        }
        // console.log(user.token)
        if (user?.token) {
            autoCheck()
        }else{
            setOk(false);
        }
     }, [user?.token]);
     if (ok === null) return <Spinner path="" />;
    return ok ? <Outlet /> 
     :  <Navigate to="/unauthorize" replace />;
}

export default AgentRoute;