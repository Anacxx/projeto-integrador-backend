import { CommentDB, LikeDislikeDB, PostCommentDB } from "../models/Comments";
import { POST_LIKE, PostDB, PostModel } from "../models/Posts";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POST_COMMENTS = "post_comments"
    public static TABLE_LIKES_DISLIKES_COMMENTS = 'likes_dislikes_comments'
    public insertComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase
          .connection(CommentDatabase.TABLE_COMMENTS)
          .insert(commentDB)
  }
//método que irá receber um id do post que desejamos buscar os comentários
  public findCommentsByPostId = async (postId: string): Promise<any> => {
    const result: any = await BaseDatabase.connection(
// Uma busca na TABLE_COMMENTS 
      CommentDatabase.TABLE_COMMENTS
    )
      .select(
        `${CommentDatabase.TABLE_POST_COMMENTS}.post_id as postId`,
        `${UserDatabase.TABLE_USERS}.id as creatorId`,
        `${UserDatabase.TABLE_USERS}.nickName`,
        `${CommentDatabase.TABLE_COMMENTS}.id as commentId`,
        `${CommentDatabase.TABLE_COMMENTS}.content as commentContent`,
        `${CommentDatabase.TABLE_COMMENTS}.likes`,
        `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentDatabase.TABLE_COMMENTS}.content as commentContent`
      )
//esse primeiro .join está fazendo a junção de TABLE_COMMENTS + TABLE_POST_COMMENTS
//quando TABLE_POST_COMMENTS.comment_id for = TABLE_COMMENTS.id
      .join(
        `${CommentDatabase.TABLE_POST_COMMENTS}`,
        `${CommentDatabase.TABLE_POST_COMMENTS}.comment_id`,
        "=",
        `${CommentDatabase.TABLE_COMMENTS}.id`
      )
//esse segundo .join está juntado as outras duas tabelas a TABLE_USERS
// quando o TABLE_USERS.id for =  TABLE_COMMENTS.creator_id
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${UserDatabase.TABLE_USERS}.id`,
        "=",
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`
      )
//o where está buscando o post específico de id específico recebido no parametro.   
      .where("post_id", "LIKE", `${postId}`);
  
    return result;
  };
  // criar o insertPostComment que vai inserir na TABLE_POSTS_COMMENTS
  public insertPostComment = async (postComment: PostCommentDB): Promise<void> => {
    await BaseDatabase
    .connection(CommentDatabase.TABLE_POST_COMMENTS)
    .insert(postComment)
  }
  public findCommentById = async(commentId:any):Promise<any> => {
    return await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENTS)
    .where({id: commentId})
    .first();
  }
 
  public findLikeDislike = async(likeDislikeDB: LikeDislikeDB):Promise<POST_LIKE | undefined> => {
  // a const [result] está guardando a informação dentro de um array.

    const [result]:Array<LikeDislikeDB | undefined> = await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .where({
        user_id: likeDislikeDB.user_id,
        Comment_id: likeDislikeDB.comment_id,
      })
      if (result === undefined) {
        return undefined
      } else if (result.like === 1){
        return POST_LIKE.ALREADY_LIKED
      } else {
        return POST_LIKE.ALREADY_DISLIKED
      }
  }

  public deleteLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id,
      })
      .del();
  }
  public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB):Promise <void> => {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id,
      })
      .update(likeDislikeDB);
  }
  public insertLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .insert(likeDislikeDB);
  }
  public updateComment = async (input: CommentDB): Promise<void> => {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .where({ id: input.id })
      .update(input);
  }
}