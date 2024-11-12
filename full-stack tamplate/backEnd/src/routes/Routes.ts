
import { Router } from "express";
import { getAllUsers, getUserById, postUser, deleteUser, putUser } from "../controllers/userController";
import { isAdmin } from "../controllers/authController";

const usersRoutes = Router();

usersRoutes.get("/getData", getAllUsers);
usersRoutes.get("/getData/:id", getUserById);
usersRoutes.post("/sendData", postUser);
usersRoutes.put("/updateData/:id", putUser);
usersRoutes.delete("/deleteData/:id",deleteUser);


export default  usersRoutes;