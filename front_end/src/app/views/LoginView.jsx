import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../shared/form/Input';
import { login } from '../service/authService';
import { Link, useNavigate } from 'react-router-dom';
import { unsetError } from '../store/authSlice';

const LoginView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, isLogged} = useSelector(state => state.auth)
    const [isSent, setSent] = useState(false)

    const schemaRef = {
        email: useRef(),
        password: useRef()
    }

    const handleAuthSubmit = (e) => {
        e.preventDefault()
        const formResult = {
            email: schemaRef.email.current?.value,
            password: schemaRef.password.current?.value
        }
        dispatch(login({body: formResult}))
        setTimeout(() => {
            setSent(true)
        }, 300)
    }

    useEffect(() => {
        if (isSent && !error) navigate("/tasks")
        setSent(false)
        dispatch(unsetError())
    }, [isSent])

    useEffect(() => {
        if (isLogged) navigate("/tasks")
    }, [isLogged])

    return (
        <form className='w-50 p-3 bg-body border border-light-subtle shadow-sm rounded-1 mx-auto mt-5 row'
            onSubmit={handleAuthSubmit}>
            <h3 className='mb-4'>Connexion</h3>
            <hr className='border border-light-subtle' />
            <Input name={"email"} givenRef={schemaRef.email} label={"Adresse email"} isRequired />
            <Input type='password' name={"password"} givenRef={schemaRef.password} label={"Mot de passe"} isRequired />
            <hr className='border border-light-subtle' />
            <button type='submit' className='btn btn-outline-primary w-75 mx-auto'>Connexion</button>
            <div className='d-flex justify-content-end mt-2 pe-5'>
                <p>Vous n'avez pas de compte? <Link className='link' to={"/register"}>Inscription</Link> </p>
            </div>
        </form>
    );
};

export default LoginView;