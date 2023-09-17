import { Request, Response } from "express"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { signupSchema } from "../dtos/users/signup.dto"
import { UserBusiness } from "../business/userBusiness"
import { loginSchema } from "../dtos/users/login.dto"

export class UserController {
    constructor(
      private userBusiness: UserBusiness
    ){}
    //métodos que iniciarão a requisição
    public signup = async(req: Request, res: Response) => {
        try {
            const input = signupSchema.parse({
              nickName: req.body.nickName,
              email: req.body.email,
              password: req.body.password
            })
            const output = await this.userBusiness.signup(input)
            return res.status(201).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else {
              res.status(500).send("Unexpected error")
            } 
        }
    }
    public login = async(req: Request, res: Response) => {
        try {
            const input = loginSchema.parse({
              email: req.body.email,
              password: req.body.password
            })
            const output = await this.userBusiness.login(input)
            return res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else {
              res.status(500).send("Unexpected error")
            } 
        }
    }
}