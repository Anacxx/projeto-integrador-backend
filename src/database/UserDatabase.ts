import { UserDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"
    //método public, async que retorna uma promise userDB[]
    // Deve colocar o userDB entre [] pois o resultado deve vir em um array,
    //mesmo se vier somente um item.
    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email});
        return userDB;
    }
    public async insertUser(newUser: UserDB) {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUser)
    }
    public async findUserById(id: string) {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where({id:id})
        return userDB
    }
}
