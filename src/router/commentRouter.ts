import express from "express"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { CommentsController } from "../controller/CommentsController"
import { CommentDatabase } from "../database/CommentDatabase"
import { IdGenerator } from "../services/Idgenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const commentRouter = express.Router()
const commentsController = new CommentsController(
    new CommentsBusiness(
        new TokenManager(),
        new IdGenerator(),
        new CommentDatabase(),
        new PostDatabase()
    )
)
//createComment
commentRouter.post('/:id',commentsController.createComment)
//getCommentsByPostId
commentRouter.get('/post/:id', commentsController.getCommentsByPostId)
//likeDislike
commentRouter.put('/:id/like', commentsController.likeDislikeComment);