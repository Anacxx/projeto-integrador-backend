import {CommentsBusiness} from '../../../src/business/CommentsBusiness'
import { getCommentsByIdSchema } from '../../../src/dtos/comments/getCommentsByIdPostId.dto'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
describe('Testando getCommentsByPostId', () => {
    const commentsBusiness = new CommentsBusiness(
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
    )
    test('getCommentsByPostId com sucesso', async() => {
        const input = getCommentsByIdSchema.parse({
            token: "token-mock-user1",
            postId: "post-id-2"
        })
        const output = await commentsBusiness.getCommentsByPostId(input)
        expect(output).toContainEqual({
            id: 'comment-id-mock1',
            creator_id: 'id-mock-user1',
            content: 'Comentário número 1',
            likes: 0,
            dislikes: 0,
            createdAt: expect.any(String),
            post_id: 'post-id-2',
            creatorNickName: 'User1'
        })
    })
})
