import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/postBusiness"
import { TokenManager } from "../services/TokenManager"
import { UserDatabase } from "../database/UserDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/Idgenerator"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new TokenManager(),
        new PostDatabase(),
        new UserDatabase(),
        new IdGenerator 
    )
);
//getAllPosts
postRouter.get('/', postController.getAllPosts);
//CreatePost
postRouter.post('/', postController.createPost);
//getPostById
postRouter.get("/:id", postController.getPostById);
//editPost
postRouter.put('/:id', postController.editPost);
//deletePost
postRouter.delete('/:id', postController.deletePost);
//likeDislike
postRouter.put('/:id/like', postController.likeDislikePost);