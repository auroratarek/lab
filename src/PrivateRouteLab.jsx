import {Outlet, Navigate} from 'react-router-dom'
import React from 'react'
const PrivateRoutesLab=()=>{
    let auth = {'token': localStorage.getItem("lab_token")&& localStorage.getItem("lab_token")!=null? true: false}
    return(
        auth.token? <Outlet/>: <Navigate to="/login"/>
    )
}

export default PrivateRoutesLab;