import {PostBusiness} from '../../../src/business/postBusiness'
import { createPostSchema } from '../../../src/dtos/posts/createPost.dto'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { UserDatabaseMock } from '../../mocks/UserDatabaseMock'

describe('Testando createPost', () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock()
    )
    test('Post criado com sucesso', async() => {
        const input = createPostSchema.parse({
            token: "token-mock-user1",
            content: "O dia está lindo."
        })
        const output = await postBusiness.createPost(input)
        expect(output).toBeUndefined()
    })
})
