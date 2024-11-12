import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";


const Users = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>

        <PageHeader title="Home" subtitle="Manage your users" />
        <h1>Welcome to the Users Management</h1>
        <button onClick={() => { navigate('/login') }}>Login</button>

      </div>

    </>
  )
}

export default Users
