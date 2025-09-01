import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext.jsx';

const  UserRoute = () => {
    const [ok, setOk] = useState(null);
    const {user , loading} = useAuth();

    useEffect(() => { 
        const autoCheck = async ()=>{
            const res = await axios.get("http://localhost:3000/api/user-auth",{
                headers: {
                    Authorization: user.token
                },
            }
        );
        if(res.data.ok){
            setOk(true);
        }else{
            setOk(null);
        }
        }
        if (user?.token) {
            autoCheck()
        }else{
            setOk(null);
        }
     }, [user?.token]);
     if (loading || ok === null) return <Spinner path="" />;
    return ok && ok === true ? <Outlet /> 
     :  <Navigate to="/unauthorized" replace />;
}

export default UserRoute;