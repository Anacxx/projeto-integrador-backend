import {PostBusiness} from '../../../src/business/postBusiness'
import { likeDislikePostSchema } from '../../../src/dtos/posts/likeDislikePost.dto'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { UserDatabaseMock } from '../../mocks/UserDatabaseMock'

describe('Testando likeDislikePost', () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock()
    )
    test('testando likeDislike em caso de sucesso', async () => {
        const input = likeDislikePostSchema.parse({
            token:"token-mock-user1",
            postId: "post-id-2",
            like: true    
        })
        const output = await postBusiness.likeDislikePost(input)
        expect(output).toBeUndefined()
    })
})
