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
})