import React, { useContext, useRef } from 'react'
import { User } from '../types/Types';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import axios from 'axios';

const AddNewUser = () => {
    const { users, setusers } = useContext(UserContext);
    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const submitHeandler = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const newUser: User = {
            id: v4(),
            username: nameRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
            age: Number(ageRef.current!.value),
            img: imgRef.current!.value,
            isLogged: false
        }

        setusers([...users, newUser]);
        axios.post('http://localhost:3300/sendData', newUser);

        showSnackbar('User added successfully!!');

        setTimeout(() => {
            hideSnackbar();
            navigate('/users');
        }, 2000);


    }
    return (
        <>
            <form onSubmit={submitHeandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" ref={emailRef} />
                <label htmlFor="age">Age</label>
                <input type="text" id="age" ref={ageRef} />
                <label htmlFor="img">Image</label>
                <input type="text" id="img" ref={imgRef} />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" ref={passwordRef} />
                <button type="submit">Add User</button>
            </form>
            <button onClick={() => { navigate('/') }}>Cancel</button>
    
            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}
        </>
    );}
    

export default AddNewUser
