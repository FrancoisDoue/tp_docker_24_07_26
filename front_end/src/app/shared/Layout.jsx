import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Layout = () => {

    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.auth.isLogged)

    return (
        <div
            style={{ maxWidth: '100dvw', minHeight: '100dvh' }}
            className='d-flex flex-column justify-content-between bg-light'
        >
            <header className="p-3 mb-3 border-bottom bg-body shadow-sm">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link to={'/'} className="d-flex flex-column align-items-center mb-2 mb-lg-0 text-dark text-decoration-none border border-2 border-dark">
                            <h2 className='text-decoration-underline'>TODO</h2>
                            <h6>Or not todo</h6>
                        </Link>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-4 justify-content-center mb-md-0">
                            <li><Link to={"/tasks"} className="nav-link mx-2 px-2 link-secondary">Liste des tâches</Link></li>
                        </ul>

                        <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            {isLogged
                                ? <a className='btn btn-outline-dark rounded-1' onClick={() => dispatch(logout())} > Déconnexion </a>
                                : <Link className='btn btn-outline-light text-primary' to={"/login"}> Connexion </Link>
                            }
                        </div>
                    </div>
                </div>
            </header>
            <main className='flex-fill d-flex'>
                <div className='container flex-fill d-flex flex-column'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout