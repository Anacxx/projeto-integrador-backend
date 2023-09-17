import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { Response, Request } from "express"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { createCommentSchema } from "../dtos/comments/createComment.dto"
import { likeDislikeCommentSchema } from "../dtos/comments/likeDislikeComment.dto"
import { getCommentsByIdSchema } from "../dtos/comments/getCommentsByIdPostId.dto"
export class CommentsController {
    constructor(
        private commentsBusiness: CommentsBusiness
    ){}

    public createComment = async(req: Request, res: Response) => {
        try {
            const input = createCommentSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                content: req.body.content
            })
            const output = await this.commentsBusiness.createComment(input)
            return res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else {
              res.status(500).send("Unexpected error")
            } 
        }
    }
    public getCommentsByPostId = async(req: Request, res: Response) => {
      try {
        const input = getCommentsByIdSchema.parse ({
          token:req.headers.authorization,
          postId:req.params.id
        })
        const output = await this.commentsBusiness.getCommentsByPostId(input)
        res.status(200).send(output)
      } catch (error) {
        console.log(error)

        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else {
          res.status(500).send("Unexpected error")
        } 
      }
    }

    public likeDislikeComment = async(req: Request, res: Response) => {
        try {
          const input = likeDislikeCommentSchema.parse({
            token: req.headers.authorization,
            commentId: req.params.id,
            like: req.body.like
          })
          const output = await this.commentsBusiness.likeDislikeComment(input)
          return res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else {
              res.status(500).send("Unexpected error")
            } 
        }
    }
}