export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
  }
export interface TokenPayload {
    id: string,
	nickName: string,
    role: USER_ROLES
}
export interface UserDB {
    id: string,
    nickName: string,
    email: string,
    password: string,
    role: USER_ROLES
}

export interface UserModel {
    id: string,
    nickName: string,
    email: string,
    role: USER_ROLES
}
export class User {    
    constructor(
        private id: string,
        private nickName: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) {}
//Ele é projetado para retornar o valor do campo da instância atual da classe
    public getId(): string {
        return this.id
    }
//Ele é projetado para receber um novo valor por parametro e atribui-lo.
    public setId(value: string): void {
        this.id = value
    }

    public getNickName(): string {
        return this.nickName
    }

    public setNickName(value: string): void {
        this.nickName = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }
    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }
    public toDBModel():UserDB {
        return {
            id: this.id,
            nickName: this.nickName,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
    public toModel():UserModel {
        return {
            id: this.id,
            nickName: this.nickName,
            email: this.email,
            role: this.role   
        }
    }
}

