import { UserBusiness } from "../../../src/business/userBusiness"
import { loginSchema } from "../../../src/dtos/users/login.dto"
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
})