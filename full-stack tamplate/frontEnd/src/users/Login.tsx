import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import PageHeader from '../components/PageHeader';


const Login = () => {

    const { users, setusers } = useContext(UserContext);
    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const submitHeandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userLoged = users.find(user => user.username === nameRef.current!.value && user.password === passwordRef.current!.value);

        if (!userLoged) {
            showSnackbar('User name or password incorrect!!');
            nameRef.current!.value = '';
            passwordRef.current!.value = '';
            setTimeout(() => {
                hideSnackbar();
            }, 2000);
            return
        };

        setusers(users.map(user => user.id === userLoged.id ? { ...user, isLogged: true } : user));

        showSnackbar('User logged successfully!!');

        setTimeout(() => {
            hideSnackbar();
            navigate('/users');
        }, 2000);
    }

    return (
        <div>
            <PageHeader title="Login" subtitle="here you can login" />

            <form onSubmit={submitHeandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} required />
                <label htmlFor="age">Password</label>
                <input type="text" id="password" ref={passwordRef} required />
                <button type="submit">Login</button>
            </form>

            <button onClick={() => { navigate('/') }}>Cancel</button>

            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}
        </div>
    )
}

export default Login
