import {PostBusiness} from '../../../src/business/postBusiness'
import { getPostByIdSchema } from '../../../src/dtos/posts/getPostById.dto'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { UserDatabaseMock } from '../../mocks/UserDatabaseMock'

describe('Testando getPostById', () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock()
    )
    test('Testando caso de sucesso getPostById ', async () => {
        const input = getPostByIdSchema.parse({
            id: "post-id-1",
            token: "token-mock-user2"
        })
        const output = await postBusiness.getPostById(input)
        expect(output).toEqual({      
            id: "post-id-1",
            content: "Post 1 content",
            likes: 10,
            dislikes: 2,
            comments: 5,
            createdAt: "2023-09-17T00:00:00.000Z",
            updatedAt: "2023-09-17T00:00:00.000Z",
            creatorId: "id-mock-user1",
            creatorNick_name: "User1"
        })
    })
})
