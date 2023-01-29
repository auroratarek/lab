import {Outlet, Navigate} from 'react-router-dom'
import React from 'react'
const PrivateRoutes=()=>{
    let auth = {'token': localStorage.getItem("token")&& localStorage.getItem("token")!=null? true: false}
    return(
        auth.token? <Outlet/>: <Navigate to="/SystemDashBoard/Login"/>
    )
}

export default PrivateRoutes;