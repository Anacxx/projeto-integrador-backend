export class HashManagerMock {
    public hash = async (
      plaintext: string
    ): Promise<string> => {
      return "hash-mock"
    }

    public compare = async (
      plaintext: string,
      hash: string
    ): Promise<boolean> => {
      switch(plaintext) {
        case "passwordUser1":
          return hash === "hash-mock-user1"

        case "passwordUser2":
          return hash === "hash-mock-user2"
          
        default:
          return false
      }
    }
}