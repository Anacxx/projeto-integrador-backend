import { UserDatabase } from "../database/UserDatabase"
import { loginInputDTO, loginOutputDTO } from "../dtos/users/login.dto"
import { signupInputDTO, signupOutputDTO } from "../dtos/users/signup.dto"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { USER_ROLES, User, UserDB } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/Idgenerator"
import { TokenManager } from "../services/TokenManager"

export class UserBusiness {
    constructor(
      private userDatabase: UserDatabase,
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private tokenManager: TokenManager,
    ){}
// métodos onde ficam as regras de negocio
// gerar as uuid
// hashear as senhas antes de guardar no banco de dados
//deve ser um método assincrono que recebe um input no formatado 
//retorna uma promise formatada
    public signup = async(input: signupInputDTO): Promise<signupOutputDTO> => {
//recebendo o input desestruturado da controller
      const {nickName, email, password} = input
//gerando id
      const id = this.idGenerator.generate()
//hasheando a senha
      const hashedPassword = await this.hashManager.hash(password)
// verificando se já existe o email cadastrado
      const emailExists = await this.userDatabase.findUserByEmail(email)
      if(emailExists){
            throw new ConflictError("This email is already registered!");
      }
// Criação de uma nova instância de User com os dados fornecidos
      const newUser = new User(
            id,
            nickName,
            email,
            hashedPassword,
            USER_ROLES.ADMIN
      )
//No SQLite, um banco de dados relacional, não é possível salvar uma instância de objeto diretamente no banco de dados.   
//Criação de um objeto UserDB para armazenar no banco de dados      
      const newUserDB: UserDB = {
            id: newUser.getId(),
            nickName: newUser.getNickName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole()
      }
      await this.userDatabase.insertUser(newUserDB)
//criação do payload para a geração do token
      const payload = {
            id: newUser.getId(),
            nickName: newUser.getNickName(),
            role: newUser.getRole()
      }
      const token = this.tokenManager.createToken(payload)
      const output: signupOutputDTO = {
            message: "User registered successfully.",
            token
      }
      return output
    }
    public login = async(input: loginInputDTO): Promise<loginOutputDTO> => {
      const { email, password } = input;
        
      const userDB = await this.userDatabase.findUserByEmail(email)
      if (!userDB) {
            throw new NotFoundError('User not found');
      }
      const hashedPassword = userDB.password
      const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
      if (!isPasswordCorrect) {
            throw new UnauthorizedError("Invalid password")
        }
      const payload = {
          id: userDB.id,
          nickName: userDB.nickName,
          role:userDB.role
      }
      const token = this.tokenManager.createToken(payload)
      const output: loginOutputDTO = {
          message: 'Login successful',
          token
      }
      return output
    }
}