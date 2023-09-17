import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError{
    constructor(
        message: string
    ){
        super(401,message)
    }
}
//"The attempted access to the resource is unauthorized due to lack of valid credentials"
// export abstract class BaseError extends Error {
//     constructor(
//         public statusCode: number,
//         message: string
//     ) {
//         super(message)
//     }
// }

//Lembar que o constructor é uma "função"
//O super(401, message) chama o construtor da classe pai (BaseError)
// e passa dois argumentos para ele: o código de status 401 e a mensagem de erro.
//É retornado a messagem costumizada de acordo com o que foi definido,
//Caso não tenha uma mensagem definida irá retornar a mensagem da classe pai(BaseError)
