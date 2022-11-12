import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

function PrivateRoute({children}) {
    const {loading, user } = useContext(AuthContext);
    const location =useLocation();
    if(loading){
        return <Spinner variant='primary'></Spinner>
    }
    if (!user) {
        return <Navigate to={`/login`} state={{from:location}} replace></Navigate>
    }
    return children
    
}

export default PrivateRoute



