import express from "express"
import { UserBusiness } from "../business/userBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/Idgenerator";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router()


const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new TokenManager()
    )
)
//Signup
userRouter.post('/signup', userController.signup);
//Login
userRouter.post('/login', userController.login);