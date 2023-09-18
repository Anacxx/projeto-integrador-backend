import { LikeDislikeDB, POST_LIKE, PostDB, postDBWithCreatorName } from "../models/Posts";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
        public static TABLE_POSTS = "posts"
        public static TABLE_LIKES_DISLIKES = "likes_dislikes"
        
        
    public getAllPosts = async (): Promise<PostDB[]> => {
      const posts = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select();
      return posts
    }
    public getPostById = async (id: string): Promise<PostDB | undefined> => {
      
      const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select()
      .where({ id })
      return result as PostDB | undefined
    
      }
      //junção da TABLE_POSTS com a table USERS
      // selecionando as colunas necessárias.  
      //onde o creator_id = user.id
      // busca do id recebido por parâmetro.
      public findPostsById = async (id: string): Promise<postDBWithCreatorName | undefined> => {
        const [result] = await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .select(
            `${PostDatabase.TABLE_POSTS}.id`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            `${PostDatabase.TABLE_POSTS}.content`,
            `${PostDatabase.TABLE_POSTS}.likes`,
            `${PostDatabase.TABLE_POSTS}.dislikes`,
            `${PostDatabase.TABLE_POSTS}.comments`,
            `${PostDatabase.TABLE_POSTS}.createdAt`,
            `${PostDatabase.TABLE_POSTS}.updatedAt`,
            `${UserDatabase.TABLE_USERS}.nickName`
          )
          .join(
            `${UserDatabase.TABLE_USERS}`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDatabase.TABLE_USERS}.id`
          )
          .where({[`${PostDatabase.TABLE_POSTS}.id`]: id})
          return result as postDBWithCreatorName | undefined
      }
      public findLikeDislike = async(likeDislikeDB: LikeDislikeDB):Promise<POST_LIKE | undefined> => {
        //o resultado será guardado em um array
        //modelado tipo LikeDislikeDB ou undefined
        //    user_id: string,
        //    post_id: string,
        //    like: number
        const [result]:Array<LikeDislikeDB | undefined> = await BaseDatabase
          .connection(PostDatabase.TABLE_LIKES_DISLIKES)
          .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id,
          })

          
          if (result === undefined) {
            return undefined // pois não houve like ou dislike
          } else if (result.like === 1){
            return POST_LIKE.ALREADY_LIKED // já houve like
          } else {
            return POST_LIKE.ALREADY_DISLIKED // já hpuve dislike
          }
      }
    
      public updatePost = async (input: PostDB): Promise<void> => {
        await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .where({ id: input.id })
          .update(input);
      }
    
    public insertPost = async (postDB: PostDB): Promise<void> => {
      await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
}
public insertLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {
  await BaseDatabase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .insert(likeDislikeDB);
}


        async findPostById(postId: string) {
          return await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where('id', postId)
            .first();
        }

        public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB):Promise <void> => {
          await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .where({
              user_id: likeDislikeDB.user_id,
              post_id: likeDislikeDB.post_id,
            })
            .update(likeDislikeDB);
        }
      
        public deleteLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {
          await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .where({
              user_id: likeDislikeDB.user_id,
              post_id: likeDislikeDB.post_id,
            })
            .del();
        }
        

      }
      
      