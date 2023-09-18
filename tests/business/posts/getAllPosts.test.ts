import {PostBusiness} from '../../../src/business/postBusiness'
import { getAllPostsSchema } from '../../../src/dtos/posts/getAllPosts.dto'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { UserDatabaseMock } from '../../mocks/UserDatabaseMock'

describe('Testando getAllPosts', () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock()
    )
    test('Deve retornar todos os posts', async () => {
        const input = getAllPostsSchema.parse({
            token: "token-mock-user2"
        })
        const output = await postBusiness.getAllPosts(input)
        expect(output).toContainEqual({      
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
