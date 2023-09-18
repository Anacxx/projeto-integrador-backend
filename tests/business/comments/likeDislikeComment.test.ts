import {CommentsBusiness} from '../../../src/business/CommentsBusiness'
import { likeDislikeCommentSchema } from '../../../src/dtos/comments/likeDislikeComment.dto'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
describe('Testando likeDislikeComment', () => {
    const commentsBusiness = new CommentsBusiness(
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
    )
    test('likeDislikeComment com sucesso', async() => {
        const input = likeDislikeCommentSchema.parse({
            token: "token-mock-user1",
            commentId:"comment-id-mock1",
            like: true
        })
        const output = await commentsBusiness.likeDislikeComment(input)
        expect(output).toBeUndefined()
    })
})
