import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StarsContext } from '../providers/StarsProvider';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import PageHeader from '../components/PageHeader';


const DisplayStars = () => {
    const { stars, setstars } = useContext(StarsContext);

    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const Navigate = useNavigate();

    const removeHeandler = (id: string) => {
        setstars(stars.filter(user => user.id !== id))
        showSnackbar('User removed successfully!!');

        setTimeout(() => {
            hideSnackbar();
            Navigate('/users');
        }, 2000);
    }

    return (<>
    
        <PageHeader title="Favorites" subtitle="Manage your favorites" />

        <div className="card-list">

            <h1>Favorites</h1>

            {stars.map((user) => (
                <div key={user.id} className="user-card">

                    <img src={user.img} alt={`${user.username}'s avatar`} className="user-avatar" />
                    <div className="user-info">
                        <h3>{user.username}</h3>
                        <p>Email: {user.email}</p>
                        <p>Age: {user.age}</p>

                    </div>
                    <button onClick={() => { removeHeandler(user.id!) }}>Remove from favorites</button>
                </div>

            ))}

            <button onClick={() => { Navigate("/users") }}>Cancle</button>

            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}

        </div>
    </>
    )
}

export default DisplayStars
