import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor(
        message: string
    ){
        super(403,message)
    }
}
// export abstract class BaseError extends Error {
//     constructor(
//         public statusCode: number,
//         message: string
//     ) {
//         super(message)
//     }
// }

//Lembar que o constructor é uma "função"
//O super(403, message) chama o construtor da classe pai (BaseError)
// e passa dois argumentos para ele: o código de status 403 e a mensagem de erro.
//É retornado a mensagem costumizada de acordo com o que foi definido,
//Caso não tenha uma mensagem definida irá retornar a mensagem da classe pai(BaseError)
