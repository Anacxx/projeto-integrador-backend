import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { getAllPostsSchema } from "../dtos/posts/getAllPosts.dto"
import { PostBusiness } from "../business/postBusiness"
import { createPostSchema } from "../dtos/posts/createPost.dto"
import { editPostSchema } from "../dtos/posts/editPost.dto"
import { deletePostSchema } from "../dtos/posts/deletePost.dto"
import { likeDislikePostSchema } from "../dtos/posts/likeDislikePost.dto"
import { getPostByIdSchema } from "../dtos/posts/getPostById.dto"
export class PostController {
    constructor(
      private postBusiness: PostBusiness
    ){

    }
    public getAllPosts = async(req: Request, res: Response) => {
        try {
          const input = getAllPostsSchema.parse({
            token: req.headers.authorization
          })
          const output = await this.postBusiness.getAllPosts(input)
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
// No seu controlador PostController
      public getPostById = async (req: Request, res: Response) => {
        try {
          const input = getPostByIdSchema.parse({
            id: req.params.id,
            token: req.headers.authorization
          })
          const output = await this.postBusiness.getPostById(input);
          if (!output) {
            return res.status(404).send("Post not found");
          }

          return res.status(200).send(output);
        } catch (error) {
          console.error(error);
          res.status(500).send("Unexpected error");
        }
      }


    public createPost = async(req: Request, res: Response) => {
        try {
            const input = createPostSchema.parse({
              token: req.headers.authorization,
              content: req.body.content
            })
            const output = await this.postBusiness.createPost(input)
            return res.status(201).send(output);
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
    public editPost = async(req: Request, res: Response) => {
        try {
            const input = editPostSchema.parse({
              token:req.headers.authorization,
              idToEdit: req.params.id,
              content: req.body.content
            })
            const output = await this.postBusiness.editPost(input)
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
    public deletePost = async(req: Request, res: Response) => {
        try {
            const input = deletePostSchema.parse({
              token: req.headers.authorization,
              idToDelete: req.params.id
            })
            const output = await this.postBusiness.deletePost(input)
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
    public likeDislikePost = async(req: Request, res: Response) => {
        try {
            const input = likeDislikePostSchema.parse({
              token: req.headers.authorization,
              postId: req.params.id,
              like: req.body.like
            })
            const output = await this.postBusiness.likeDislikePost(input)
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