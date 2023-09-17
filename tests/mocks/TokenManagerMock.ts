import { TokenPayload, USER_ROLES } from '../../src/models/Users'

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // signup de nova conta
      return "token-mock"

    } else if (payload.id === "id-mock-user1") {
      // login de fulano (conta normal)
      return "token-mock-user1"

    } else {
      // login de astrodev (conta admin)
      return "token-mock-user2"
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-user1") {
      return {
        id: "id-mock-user1",
        nickName: "User1",
        role: USER_ROLES.NORMAL
      }

    } else if (token === "token-mock-user2") {
      return {
        id: "id-mock-user2",
        nickName: "User2",
        role: USER_ROLES.ADMIN
      }

    } else {
      return null
    }
  }
}