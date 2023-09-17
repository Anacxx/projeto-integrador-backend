import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string
    ){
        super(404,message)
    }
}
//"The requested resource could not be found on the server, leading to a Not Found Error."
// export abstract class BaseError extends Error {
//     constructor(
//         public statusCode: number,
//         message: string
//     ) {
//         super(message)
//     }
// }

//Lembar que o constructor é uma "função"
//O super(404, message) chama o construtor da classe pai (BaseError)
// e passa dois argumentos para ele: o código de status 404 e a mensagem de erro.
//É retornado a messagem costumizada de acordo com o que foi definido,
//Caso não tenha uma mensagem definida irá retornar a mensagem da classe pai(BaseError)
