import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../shared/form/Input';
import { register } from '../service/authService';
import { unsetError } from '../store/authSlice';

const RegisterView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, isLogged} = useSelector(state => state.auth)
    const [isSent, setSent] = useState(false)
    const [isAdmin, setAdmin] = useState(false)

    const schemaRef = {
        firstname: useRef(),
        lastname: useRef(),
        email: useRef(),
        password: useRef(),
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        const formResult = {
            firstname: schemaRef.firstname.current.value,
            lastname: schemaRef.lastname.current.value,
            email: schemaRef.email.current.value,
            password: schemaRef.password.current.value,
            roles: [{role: "ROLE_USER"}]
        }
        if (isAdmin) formResult.roles.push({role: "ROLE_ADMIN"})
        dispatch(register({body: formResult}))
        setTimeout(() => {
            setSent(true)
        }, 300)
    }

    useEffect(() => {
        if (isSent && !error) navigate("/login")
        setSent(false)
        dispatch(unsetError())
    }, [isSent])

    useEffect(() => {
        if (isLogged) navigate("/tasks")
    }, [isLogged])

    return (
        <form className='w-50 p-3 bg-body border border-light-subtle shadow-sm rounded-1 mx-auto mt-5 row'
            onSubmit={handleRegisterSubmit}>
            <h3>Inscription</h3>
            <hr className='border border-light-subtle' />
            <div className='col-6'>
                <Input name={"lastname"} givenRef={schemaRef.lastname} label={"Nom"} isRequired />
            </div>
            <div className='col-6'>
                <Input name={"firstname"} givenRef={schemaRef.firstname} label={"Prénom"} isRequired />
            </div>
            <hr className='border border-light-subtle' />
            <Input name={"email"} type={"email"} givenRef={schemaRef.email} label={"Adresse email"} isRequired />
            <Input name={"password"} type={"password"} givenRef={schemaRef.password} label={"Mot de passe"} isRequired />
            <div className='px-3 my-2'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="admin" 
                        onChange={e => setAdmin(e.target.checked)} />
                    <label className="form-check-label" htmlFor="admin">Définir ce compte comme administrateur</label>
                </div>
            </div>
            <hr className='border border-light-subtle' />
            <button type='submit' className='btn btn-outline-primary w-75 mx-auto'>Inscription</button>
            <div className='d-flex justify-content-end mt-2 pe-5'>
                <p>Vous n'avez déjà un compte? <Link className='link' to={"/login"}>Connexion</Link> </p>
            </div>
        </form>
    );
};

export default RegisterView;