import { UserBusiness } from "../../../src/business/userBusiness"
import { loginSchema } from "../../../src/dtos/users/login.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock(),

  )
  test("deve gerar token ao logar", async () => {
    const input = loginSchema.parse({
      email: "user2@email.com",
      password: "passwordUser2"
    })

    const output = await userBusiness.login(input)

    expect(output).toEqual({
      message: "Login successful",
      token: "token-mock-user2"
    })
  })
  test('lançar erro em caso de email inválido', async () => {
    expect.assertions(2);

    try {
      const input = loginSchema.parse({
        email: "email-invalido@email.com",
        password: "passwordUser2"
      })
      const output = await userBusiness.login(input)
    } catch (error: any) {
      if ( error instanceof NotFoundError )//NotFoundError
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Invalid Email");
    }
    
  })
    
  test("Deve retornar erro em caso de password incorreto", async () => {
    expect.assertions(2);

    try {
      const input = loginSchema.parse({
        email: "user1@email.com",
        password: "passwordIncorreto"
      });

      const output = await userBusiness.login(input);
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Invalid password");
      }
    }
  });
})