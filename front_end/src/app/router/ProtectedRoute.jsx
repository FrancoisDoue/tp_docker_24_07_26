import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const isLogged = useSelector(state => state.auth.isLogged)

    useEffect(() => {
        if (!isLogged) navigate("/login")
    }, [isLogged])

    return (<>{isLogged && <Outlet />}</>);
};

export default ProtectedRoute;