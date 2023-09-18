import { BaseDatabase } from '../../src/database/BaseDatabase'
import { CommentDB, LikeDislikeDB, PostCommentDB } from '../../src/models/Comments'
import { POST_LIKE } from '../../src/models/Posts'

interface post_commentsMock extends CommentDB {
    post_id: string
    creatorNickName: string
}
const commentsMock: CommentDB[] = [
    {
        id: 'comment-id-mock1',
        creator_id: 'id-mock-user1',
        content: 'Comentário número 1',
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: 'comment-id-mock2',
        creator_id: 'id-mock-user2',
        content: 'Comentário número 2',
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString()
    }
]
const post_commentsMock: post_commentsMock[] = [
    {
        id: 'comment-id-mock1',
        creator_id: 'id-mock-user1',
        content: 'Comentário número 1',
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
        post_id: 'post-id-2',
        creatorNickName: 'User1'
    },
    {
        id: 'comment-id-mock2',
        creator_id: 'id-mock-user2',
        content: 'Comentário número 2',
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
        post_id: 'post-id-2',
        creatorNickName: 'User2'
    }
]
const likeDislikeCommentMock: LikeDislikeDB[] = [
    {
        user_id: "id-mock-user1",
        comment_id: 'comment-id-mock2',
        like: 1
    },
    {
        user_id: "id-mock-user2",
        comment_id: 'comment-id-mock1',
        like: 1
    }
]
// const commentsMockWithCreatorName: any[] = [
//     {
//         id: 'comment-id-mock1',
//         creator_id: 'id-mock-user1',
//         content: 'Comentário número 1',
//         likes: 0,
//         dislikes: 0,
//         createdAt: new Date().toISOString(),
//         creatorNickName:'User1'
//     },
//     {
//         id: 'comment-id-mock2',
//         creator_id: 'id-mock-user2',
//         content: 'Comentário número 2',
//         likes: 0,
//         dislikes: 0,
//         createdAt: new Date().toISOString(),
//         creatorNickName: "User2"
//     }
// ]

export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POST_COMMENTS = "post_comments"
    public static TABLE_LIKES_DISLIKES_COMMENTS = 'likes_dislikes_comments'
  
    public findCommentsByPostId = async (postId: string): Promise<any> => {
        const result = post_commentsMock.filter((comment) => comment.post_id === postId)
        return result
    };
 
    public findLikeDislike = async(likeDislikeDB: LikeDislikeDB):Promise<POST_LIKE | undefined> => {
    const result = likeDislikeCommentMock.find((comment) => comment.comment_id === likeDislikeDB.comment_id && comment.user_id === likeDislikeDB.user_id)
    if(result === undefined){
        return undefined
        } else if(result.like === 1){
        return POST_LIKE.ALREADY_LIKED
        } else {
            return POST_LIKE.ALREADY_DISLIKED
        }
    }
    public findCommentById = async(commentId:any):Promise<any> => {
        const [result] = commentsMock.filter((comment) => comment.id === commentId);
        return result;
    }
    public insertPostComment = async (postComment: PostCommentDB): Promise<void> => {}
    public deleteLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {}
    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB):Promise <void> => {}
    public insertLikeDislike = async(likeDislikeDB: LikeDislikeDB): Promise<void> => {}
    public updateComment = async (input: CommentDB): Promise<void> => {}
    public insertComment = async (commentDB: CommentDB): Promise<void> => {}
}
