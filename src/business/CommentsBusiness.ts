import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { createCommentInputDTO, createCommentOutputDTO } from "../dtos/comments/createComment.dto";
import {  getCommentsByIdInputDTO, getCommentsByIdOutputDTO } from "../dtos/comments/getCommentsByIdPostId.dto";
import { likeDislikeCommentInputDTO, likeDislikeCommentOutputDTO } from "../dtos/comments/likeDislikeComment.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Comment, LikeDislikeDB, PostCommentDB } from "../models/Comments";
import { POST_LIKE, Post } from "../models/Posts";
import { IdGenerator } from "../services/Idgenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentsBusiness {
    constructor(
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private commentDatabase: CommentDatabase,
        private postDataBase: PostDatabase
    ){}

    public createComment = async(input:createCommentInputDTO): Promise<createCommentOutputDTO> => {
        //desestruturar o input que são um token e um content.
        const {token,postId, content} = input
        //gerar payload a partir do token
        const payload = this.tokenManager.getPayload(token)
        if(!payload){
          throw new UnauthorizedError('Invalid Token')
        }
        const postWithCreatorName = await this.postDataBase.findPostsById(postId)
        if(!postWithCreatorName) {
            throw new Error('Post não encontrado')
        }
        // gerar a id
        const id = this.idGenerator.generate()
        // criando uma instancia de comment
        const comment = new Comment(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            payload.id,
            payload.nickName
        )
// modelando a const comment para guardar no DB        
        const commentDB = comment.toCommentDB()
// inserindo no DB        
        await this.commentDatabase.insertComment(commentDB)
// criando a const que irá guardar na tabela POSTS_COMMENTS os ids        
        const postComment: PostCommentDB = {
            post_id: postId,
            comment_id: id
        }
        await this.commentDatabase.insertPostComment(postComment)

        const updatedPostWithCreatorName = new Post(
            postWithCreatorName.id,
            postWithCreatorName.content,
            postWithCreatorName.likes,
            postWithCreatorName.dislikes,
            postWithCreatorName.comments,
            postWithCreatorName.createdAt,
            postWithCreatorName.updatedAt,
            postWithCreatorName.creator_id,
            postWithCreatorName.nickName
        )
        updatedPostWithCreatorName.addComment()
        const updatedPostDB = updatedPostWithCreatorName.toPostDB()
        await this.postDataBase.updatePost(updatedPostDB)
        const output: createCommentOutputDTO = {
            message: "Comentário criado."
        }
        return output
    }
    public getCommentsByPostId = async(input:getCommentsByIdInputDTO): Promise<getCommentsByIdOutputDTO> => {
        const {postId, token} = input
        const payload = this.tokenManager.getPayload(token)
        if(!payload) {
            throw new UnauthorizedError('Invalid Token') 
        }
        const comments = await this.commentDatabase.findCommentsByPostId(postId);
        const output: getCommentsByIdOutputDTO = comments
        return output
    }

    public likeDislikeComment = async (input: likeDislikeCommentInputDTO): Promise<likeDislikeCommentOutputDTO> => {
        // Recebe os parâmetros de entrada: token, postId e like.
        const { token, commentId, like } = input;
        
        // Gera um payload a partir do token usando o tokenManager.
        const payload = this.tokenManager.getPayload(token)
        
        // Verifica se o payload é válido (se existe).
        if (!payload){
          throw new UnauthorizedError("The attempted access to the resource is unauthorized due to lack of valid credentials")
        }
        
        // Busca o comentário no banco de dados pelo commentId.
        const commentDB = await this.commentDatabase.findCommentById(commentId) 
        
        // Verifica se o commentId foi encontrado.
        if (!commentDB){
          throw new NotFoundError("The comment does not exist")
        }
        
        // Cria uma instância da classe Post com os dados do post do banco de dados.
        const comment = new Comment(
          commentDB.id,
          commentDB.content,
          commentDB.likes,
          commentDB.dislikes,
          commentDB.createdAt,
          commentDB.creator_id,
          commentDB.nickName
        )
        // Converte o valor booleano 'like' em um valor inteiro para representar o like/dislike no banco de dados.
        // Se 'like' for verdadeiro, 'likeSQlite' recebe 1, caso contrário, recebe 0.
        const likeSQlite = like ? 1 : 0
        
        // Cria um objeto 'likeDislikeDB' com id user, comment Id e o valor do like/dislike.
        const likeDislikeDB: LikeDislikeDB = {
          user_id: payload.id,
          comment_id: comment.getId(),
          like: likeSQlite,
        }
        
        // Verifica se já existe um registro de like/dislike para o usuário e post especificados.
        const likeDislikeExists = await this.commentDatabase.findLikeDislike(likeDislikeDB)
        
        // Verifica se o usuário já curtiu o post anteriormente.
        if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
          // só vai entrar dentro desse bloco de if se o like = true
          if (like) {
            // Se o usuário já curtiu e está tentando curtir novamente, o like é removido.
            await this.commentDatabase.deleteLikeDislike(likeDislikeDB)
            comment.removeLike()
          } else {
            // Se o usuário já curtiu e está tentando descurtir, o like é removido e um dislike é adicionado.
            await this.commentDatabase.updateLikeDislike(likeDislikeDB)
            comment.removeLike()
            comment.addDislike()
          }
        } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) { 
          if (!like) {
            // Se o usuário já descurtiu e está tentando descurtir novamente, o dislike é removido.
            await this.commentDatabase.deleteLikeDislike(likeDislikeDB)
            comment.removeDislike()
          } else {
            // Se o usuário já descurtiu e está tentando curtir, o dislike é removido e um like é adicionado.
            await this.commentDatabase.updateLikeDislike(likeDislikeDB)
            comment.removeDislike()
            comment.addLike()
          }
        } else {
          // Se não há registro de like/dislike anterior, um novo registro é inserido.
          // O post é atualizado com o like/dislike correspondente.
          await this.commentDatabase.insertLikeDislike(likeDislikeDB)
          like ? comment.addLike() : comment.addDislike()
        }
        
        // Converte o objeto Post atualizado de volta para um formato que pode ser armazenado no banco de dados.
        const updatedCommentDB = comment.toCommentDB()
        
        // Atualiza o post no banco de dados com as alterações de like/dislike.
        await this.commentDatabase.updateComment(updatedCommentDB)
        
        // Cria uma saída (output) que será retornada pelo método (no momento está como 'undefined', deve ser ajustado).
        const output: likeDislikeCommentOutputDTO = undefined
        
        // Retorna a saída.
        return output
      };
}