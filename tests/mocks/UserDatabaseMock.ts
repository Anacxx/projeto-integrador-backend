import { USER_ROLES, UserDB } from "../../src/models/Users";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-user1",
    nickName: "User1",
    email: "user1@email.com",
    password: "hash-mock-user1", // senha = "passwordUser1"
    role: USER_ROLES.NORMAL
  },

  {
    id: "id-mock-user2",
    nickName: "User2",
    email: "user2@email.com",
    password: "hash-mock-user2", // senha = "passwordUser2"
    role: USER_ROLES.ADMIN
  },
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"
//Esse primeiro teste vai passar pelo array userMocks filtrando por nickName,
// se não existir parametro, todos os usuarios serao retornados.
  public async findUsers(
    q: string | undefined
  ): Promise<UserDB[]> {
    if (q) {
      return usersMock.filter(user =>
          user.nickName.toLocaleLowerCase()
            .includes(q.toLocaleLowerCase()))

    } else {
      return usersMock
    }
  }
//Este segundo teste vai passar pelo array procurando pelo id do parâmetro
// olhando para a primeira posição do array.
  public async findUserById(
    id: string
  ): Promise<UserDB | undefined> {
    return usersMock.filter(user => user.id === id)[0]
  }
//Este segundo teste vai passar pelo array procurando pelo email do parâmetro,
// olhando para a primeira posição do array.
  public async findUserByEmail(
    email: string
  ): Promise<UserDB | undefined> {
    return usersMock.filter(user => user.email === email)[0]
  }

  public async insertUser(
    newUserDB: UserDB
  ): Promise<void> {

  }
}