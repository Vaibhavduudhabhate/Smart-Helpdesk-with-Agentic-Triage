import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext.jsx';
import { API_URL } from '../config.js';

const  AdminRoute = () => {
    const [ok, setOk] = useState(null);
    const { user, loading } = useAuth();

    useEffect(() => { 
        console.log("successfully entered")
        
        const autoCheck = async ()=>{
            const res = await axios.get(`${API_URL}/admin-auth`,{
                headers: {
                   Authorization: `Bearer ${user.token}`
                },
            }
        );
            console.log("response",res.data.ok)
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(null);
            }
        }
        if (user?.token) {
            autoCheck();
        }else{
            setOk(null);
        }
     }, [user?.token]);
     if (loading || ok === null) return <Spinner path="" />;
    return ok && ok === true ? <Outlet /> 
    :  <Navigate to="/unauthorized" replace />;
}

export default AdminRoute;