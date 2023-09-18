import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/userBusiness"
import { signupSchema } from "../../../src/dtos/users/signup.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve gerar token ao cadastrar", async () => {
    const input = signupSchema.parse({
      nickName: "Ciclana",
      email: "ciclana@email.com",
      password: "ciclana321"
    })

    const output = await userBusiness.signup(input)

    expect(output).toEqual({
      message: "User registered successfully.",
      token: "token-mock"
    })
  })
  test("deve disparar erro se o name não possuir pelo menos 2 char", async () => {
    expect.assertions(1)

    try {
      const input = signupSchema.parse({
        nickName: "",
        email: "ciclana@email.com",
        password: "ciclana321"
      })
      
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe('String must contain at least 3 character(s)')
      }
    }
  })
  test("deve disparar erro se o email não for válido", async () => {
    expect.assertions(1);

    try {
      const input = signupSchema.parse({
        nickName: "Ciclana",
        email: "email-invalido", // E-mail inválido
        password: "ciclana321"
      });

    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues)
        expect(error.issues[0].message).toBe('Invalid email');
      }
    }
  });

  test("deve disparar erro se a senha não possuir pelo menos 3 caracteres", async () => {
    expect.assertions(1);

    try {
      const input = signupSchema.parse({
        nickName: "Ciclana",
        email: "ciclana@email.com",
        password: "12" // Senha com menos de 3 caracteres
      });

    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues)
        expect(error.issues[0].message).toBe('String must contain at least 3 character(s)');
      }
    }
  });

})