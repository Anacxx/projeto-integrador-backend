import {CommentsBusiness} from '../../../src/business/CommentsBusiness'
import { createCommentSchema } from '../../../src/dtos/comments/createComment.dto'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
describe('Testando create Comment', () => {
    const commentsBusiness = new CommentsBusiness(
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
    )
    test('Comentário criado com sucesso', async() => {
        const input = createCommentSchema.parse({
            token: "token-mock-user1",
            content: "O dia está lindo.",
            postId: "post-id-1"
        })
        const output = await commentsBusiness.createComment(input)
        expect(output).toEqual({
            message: "Comentário criado."
        })
    })
})