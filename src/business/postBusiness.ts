import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { createPostInputDTO, createPostOutputDTO } from "../dtos/posts/createPost.dto"
import { deletePostInputDTO, deletePostOutputDTO } from "../dtos/posts/deletePost.dto"
import { editPostInputDTO, editPostOutputDTO } from "../dtos/posts/editPost.dto"
import { getAllPostsInputDTO, getAllPostsOutputDTO } from "../dtos/posts/getAllPosts.dto"
import { getPostByIdInputDTO, getPostByIdOutputDTO } from "../dtos/posts/getPostById.dto"
import { likeDislikePostInputDTO, likeDislikePostOutputDTO } from "../dtos/posts/likeDislikePost.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { ForbiddenError } from "../errors/ForbiddenError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { LikeDislikeDB, POST_LIKE, Post, PostModel } from "../models/Posts"
import { USER_ROLES } from "../models/Users"
import { IdGenerator } from "../services/Idgenerator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
    constructor(
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
    ){

    }
    public getAllPosts = async (input: getAllPostsInputDTO): Promise<getAllPostsOutputDTO> => {
        const { token } = input
//cria payload a partir do token
        const payload = this.tokenManager.getPayload(token)
// somente admins podem acessar todos os posts.        
        if (!payload) {
                  throw new UnauthorizedError('Invalid Token')
            }
        if (payload.role !== USER_ROLES.ADMIN) {
          throw new BadRequestError("Only admins can access this resource")
        }
        const postsDB = await this.postDatabase.getAllPosts()
//cria um array vazio para guardar todos os posts do tipo PostModel
            const postsModel: PostModel[] = []
// Itera sobre os posts do banco de dados e cria objetos PostModel.
            for (let postDB of postsDB){
 //Nessa iteração, para cada postDB do banco de dados é feita uma busca pelo usuário
 //É necessário encontrar o usuário para construir o post Model com id e nome.          
              const creatorDB = await this.userDatabase.findUserById(postDB.creator_id)
              if(!creatorDB){
                  throw new NotFoundError("User not found")
              }
//Após encontrar o criador do post, é construido cada post com o nome do criador              
              const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.comments,
                postDB.createdAt,
                postDB.updatedAt,
                creatorDB.id,
                creatorDB.nickName
              )
 //é inserido dentro do array vazio cada post com o nome e id do criador já modelado.            
              postsModel.push(post.toPostModel())
            }
            const output: getAllPostsOutputDTO = postsModel
// É retornado o array com todos os posts do Tipo postsModel com o nome e id do criador.            
            return output
        };

        public getPostById = async (input: getPostByIdInputDTO): Promise<getPostByIdOutputDTO> => {
          try {
            const { token, id } = input;
        //cria payload a partir do token    
            const payload = this.tokenManager.getPayload(token);
        //Verificação se o token é valido 
            if (!payload) {
              throw new UnauthorizedError('Invalid Token');
            }
        // somente admins podem acessar todos os posts.       
            if (payload.role !== USER_ROLES.ADMIN) {
              throw new BadRequestError("Only admins can access this resource");
            }

            const postDB = await this.postDatabase.getPostById(id);

            if (!postDB) {
              throw new Error('Este post não existe.')
            }
        //busca pelo criador do post
            const creatorDB = await this.userDatabase.findUserById(postDB.creator_id);
            if (!creatorDB) {
              throw new Error('Este criador não existe.')
            }
        //criação de uma instancia da classe Post com id e nome do criador.
            const post = new Post(
              postDB.id,
              postDB.content,
              postDB.likes,
              postDB.dislikes,
              postDB.comments,
              postDB.createdAt,
              postDB.updatedAt,
              creatorDB.id,
              creatorDB.nickName,
            );
            const postModel = post.toPostModel()
            const output: getPostByIdOutputDTO = postModel
            return output
          } catch (error) {
            console.error(error);
            throw new Error("Unexpected error");
          }
        }
      public createPost = async (input: createPostInputDTO): Promise<createPostOutputDTO> => {
          const {token, content } = input 
          const payload = this.tokenManager.getPayload(token)
          if(!payload){
            throw new UnauthorizedError('Invalid Token')
          }
          const id = this.idGenerator.generate()
          const post = new Post(
            id,
            content,
            0, 
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.nickName
          )
          const postDB = post.toPostDB()
          await this.postDatabase.insertPost(postDB)
          const output: createPostOutputDTO = undefined
          return output
      };
  
        public editPost = async (input: editPostInputDTO): Promise<editPostOutputDTO> => {
            const { idToEdit, token, content } = input;
            const payload = this.tokenManager.getPayload(token)
            if (!payload) {
              throw new UnauthorizedError('Invalid Token')
            }
            const postToEdit = await this.postDatabase.getPostById(idToEdit);
            if (!postToEdit) {
              throw new NotFoundError('Post not found'); 
            }
            if (payload.id !== postToEdit.creator_id) {
              throw new ForbiddenError('Only the creator can edit the post')
            }
            const post = new Post (
              postToEdit.id,
              postToEdit.content,
              postToEdit.likes,
              postToEdit.dislikes,
              postToEdit.comments,
              postToEdit.createdAt,
              postToEdit.updatedAt,
              postToEdit.creator_id,
              payload.nickName
            );
            
            post.setContent(content)
            const updatedPost = post.toPostDB()
            await this.postDatabase.updatePost(updatedPost)
            const output: editPostOutputDTO = undefined
            return output
  
        };
  
        public deletePost = async (input: deletePostInputDTO): Promise<deletePostOutputDTO> => {
          const {token, idToDelete} = input
          const payload = this.tokenManager.getPayload(token)
            if (!payload) {
              throw new UnauthorizedError('Invalid Token')
            }
          const postToDelete = await this.postDatabase.getPostById(idToDelete);
          if (!postToDelete) {
            throw new NotFoundError('Post not found');
          }
          if (payload.role !== USER_ROLES.ADMIN){
            if (payload.id !== postToDelete.creator_id) {
              throw new ForbiddenError("Only the creator of the post can delete it")
            }
    
          }
          await this.postDatabase.deletePostById(idToDelete);
          const output: deletePostOutputDTO = undefined
          return output;
        };

          public likeDislikePost = async (input: likeDislikePostInputDTO): Promise<likeDislikePostOutputDTO> => {
            // Recebe os parâmetros de entrada: token, postId e like.
            const { token, postId, like } = input;
          
            // Gera um payload a partir do token usando o tokenManager.
            const payload = this.tokenManager.getPayload(token);
          
            // Verifica se o payload é válido (se existe).
            if (!payload) {
              throw new UnauthorizedError("The attempted access to the resource is unauthorized due to lack of valid credentials");
            }
          
            // Busca o post no banco de dados pelo postId.
            const postDBWithCreatorName = await this.postDatabase.findPostById(postId);
          
            // Verifica se o post foi encontrado.
            if (!postDBWithCreatorName) {
              throw new NotFoundError("The post does not exist");
            }
          
            // Cria uma instância da classe Post com os dados do post do banco de dados.
            const post = new Post(
              postDBWithCreatorName.id,
              postDBWithCreatorName.content,
              postDBWithCreatorName.likes,
              postDBWithCreatorName.dislikes,
              postDBWithCreatorName.comments,
              postDBWithCreatorName.createdAt,
              postDBWithCreatorName.updatedAt,
              postDBWithCreatorName.creator_id,
              postDBWithCreatorName.nickName
            );
          
            // Converte o valor booleano 'like' em um valor inteiro para representar o like/dislike no banco de dados.
            // Se 'like' for verdadeiro, 'likeSQLite' recebe 1, caso contrário, recebe 0.
            const likeSQLite = like ? 1 : 0;
          
            // Cria um objeto 'likeDislikeDB' com informações do usuário, postId e o valor do like/dislike.
            const likeDislikeDB: LikeDislikeDB = {
              user_id: payload.id,
              post_id: postDBWithCreatorName.id,
              like: likeSQLite,
            };
          
            // Verifica se já existe um registro de like/dislike para o usuário e post especificados.
            const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB);
          
            // Verifica se o usuário já curtiu o post anteriormente.
            if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
              // Só vai entrar dentro desse bloco de if se o like = true
              if (like) {
                // Se o usuário já curtiu e está tentando curtir novamente, o like é removido.
                await this.postDatabase.deleteLikeDislike(likeDislikeDB);
                post.removeLike();
              } else {
                // Se o usuário já curtiu e está tentando descurtir, o like é removido e um dislike é adicionado.
                await this.postDatabase.updateLikeDislike(likeDislikeDB);
                post.removeLike();
                post.addDislike();
              }
              //ate aqui ok
            } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
              if (like === false) {
                // Se o usuário já descurtiu e está tentando descurtir novamente, o dislike é removido.
                await this.postDatabase.deleteLikeDislike(likeDislikeDB);
                post.removeDislike();
              } else {
                // Se o usuário já descurtiu e está tentando curtir, o dislike é removido e um like é adicionado.
                await this.postDatabase.updateLikeDislike(likeDislikeDB);
                post.removeDislike();
                post.addLike();
              }
            } else {
              // Se não há registro de like/dislike anterior, um novo registro é inserido.
              // O post é atualizado com o like/dislike correspondente.
              like ? post.addLike() : post.addDislike();
              await this.postDatabase.insertLikeDislike(likeDislikeDB);
            }
          
            // Converte o objeto Post atualizado de volta para um formato que pode ser armazenado no banco de dados.
            const updatedPostDB = post.toPostDB();
          
            // Atualiza o post no banco de dados com as alterações de like/dislike.
            await this.postDatabase.updatePost(updatedPostDB);
          
            // Cria uma saída (output) que será retornada pelo método (no momento está como 'undefined', deve ser ajustado).
            const output: likeDislikePostOutputDTO = undefined;
          
            // Retorna a saída.
            return output;
          };
          
}