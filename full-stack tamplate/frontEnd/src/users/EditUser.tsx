import React, { useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { User } from '../types/Types'
import { UserContext } from '../providers/UserProvider';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import PageHeader from '../components/PageHeader';

const EditUser = () => {

    const { users, setusers } = useContext(UserContext);
    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const { id } = useParams();
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const prevUser = users.find(user => user.id === id)!

    const submitHeandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newUser: User = {
            id,
            username: nameRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
            age: Number(ageRef.current!.value),
            img: imgRef.current!.value,
            isLogged: false
        }

        setusers(users.map(user => user.id === id ? newUser : user));

        showSnackbar('User updated successfully!!');

        setTimeout(() => {
            hideSnackbar();
            navigate('/users');
        }, 2000);

    }
    return (
        <div>
            
            <PageHeader title="Edit User" subtitle="here you can edit your user" />

            <form onSubmit={submitHeandler} >
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} defaultValue={prevUser.username} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" ref={emailRef} defaultValue={prevUser.email} />
                <label htmlFor="age">Age</label>
                <input type="text" id="age" ref={ageRef} defaultValue={prevUser.age.toString()} />
                <label htmlFor="img">Image</label>
                <input type="text" id="img" ref={imgRef} defaultValue={prevUser.img} />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" ref={passwordRef} defaultValue={prevUser.password} />
                <button type="submit">Save changes</button>
            </form>

            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}

            <button onClick={() => { navigate('/users') }}>Cancel</button>
        </div>
    )
}

export default EditUser
