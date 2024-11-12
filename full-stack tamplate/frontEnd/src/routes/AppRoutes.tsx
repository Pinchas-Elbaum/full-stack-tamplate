import { Route, Routes } from "react-router-dom"
import Users from "../users/Users"
import Login from "../users/Login"
import EditUser from "../users/EditUser"
import DisplayStars from "../users/DisplayStars"
import DisplayUsers from "../users/DisplayUsers"
import AddNewUser from "../users/AddNewUser"
import ErrorPage from "../pages/ErrorPage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/stars" element={<DisplayStars />} />
            <Route path="/users" element={<DisplayUsers />} />
            <Route path="/adduser" element={<AddNewUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="*" element={<ErrorPage  />} />
        </Routes>
    )
}