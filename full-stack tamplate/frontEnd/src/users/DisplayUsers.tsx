
import { useNavigate } from 'react-router-dom';
import { StarsContext } from '../providers/StarsProvider';
import { UserContext } from '../providers/UserProvider';
import { useContext } from 'react';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import PageHeader from '../components/PageHeader';
import axios from 'axios';


const DisplayUsers = () => {

    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const navigate = useNavigate();

    const { users, setusers } = useContext(UserContext);
    const { stars, setstars } = useContext(StarsContext);
console.log(users);
    const deleteHeandler = (id: string) => {
        axios.delete(`http://localhost:3300/deleteData/${id}`);
        setusers(users.filter(user => user.id !== id))
        showSnackbar('User deleted successfully!!');

        setTimeout(() => {
            hideSnackbar();
            navigate('/users');
        }, 2000);
    }

    const addUserToStarsHeandler = (id: string) => {
        const userStar = users.find(user => user.id === id)!
        if (stars.includes(userStar)) return
        setstars([...stars, userStar])
        showSnackbar('User added to favorites successfully!!');

        setTimeout(() => {
            hideSnackbar();
            navigate('/stars');
        }, 2000);
    }

    return (
        <>
            <PageHeader title="Users" subtitle="here you can manage your users" />

            <div className="card-list">

                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <img src={user.img} alt={`${user.username}'s avatar`} className="user-avatar" />
                        <div className="user-info">
                            <h3>{user.username}</h3>
                            <p>Email: {user.email}</p>
                            <p>Age: {user.age}</p>
                        </div>

                        <button onClick={() => { deleteHeandler(user.id!) }}>Delete</button>
                        <button onClick={() => { navigate(`/edit/${user.id}`) }}>Edit</button>
                        <button onClick={() => { addUserToStarsHeandler(user.id!) }}>Add to favorites</button>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}
        </>
    )
}

export default DisplayUsers
