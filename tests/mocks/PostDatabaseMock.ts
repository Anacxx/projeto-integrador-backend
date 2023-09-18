import {
    PostDB,
    postDBWithCreatorName,
    LikeDislikeDB,
    POST_LIKE,
  } from "../../src/models/Posts";
  import { BaseDatabase } from "../../src/database/BaseDatabase";
  const postsMock: postDBWithCreatorName[] = [
    {
      id: "post-id-1",
      creator_id: "id-mock-user1",
      content: "Post 1 content",
      likes: 10,
      dislikes: 2,
      comments: 5,
      createdAt: "2023-09-17T00:00:00.000Z",
      updatedAt: "2023-09-17T00:00:00.000Z",
      nickName: "User1"
    },
    {
      id: "post-id-2",
      creator_id: "id-mock-user2",
      content: "Post 2 content",
      likes: 5,
      dislikes: 1,
      comments: 3,
      createdAt: "2023-09-18T00:00:00.000Z",
      updatedAt: "2023-09-18T00:00:00.000Z",
      nickName: "User2"
    },
  ];
  const likeDislikePostDBMock: LikeDislikeDB[] = [
    {
      user_id: "id-mock-user2",
      post_id: "post-id-1",
      like: 1,
    },
    {
      user_id: "id-mock-user1",
      post_id: "post-id-2",
      like: 1,
    },
  ];

  export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts";
    public static TABLE_LIKES_DISLIKES_POST = "likes_dislikes_post";

    public async getAllPosts(): Promise<postDBWithCreatorName[]> {
      return postsMock;
    }
  
    public async getPostById(id: string): Promise<PostDB | undefined> {
      return postsMock.find((post) => post.id === id);
    }
  
    public async findPostsById(id: string): Promise<postDBWithCreatorName | undefined> {
      return postsMock.find((post) => post.id === id) as postDBWithCreatorName;
    }

    public async findLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> {
      const result = likeDislikePostDBMock.find(
        (like) => like.user_id === likeDislikeDB.user_id && like.post_id === likeDislikeDB.post_id
      );
      if(result === undefined){
      return undefined
      } else if(result.like === 1){
      return POST_LIKE.ALREADY_LIKED
      } else {
          return POST_LIKE.ALREADY_DISLIKED
      }
    }
    
      public async findPostById(postId: string): Promise<PostDB | undefined> {
        // Encontre o post com base no ID
        const foundPost = postsMock.find((post) => post.id === postId);
        return foundPost;
      }
    public updatePost = async (newPost: PostDB): Promise<void> => {};
    public insertPost = async (postDB: PostDB): Promise<void> => {};
    public insertLikeDislike = async (likeOrDislike: LikeDislikeDB): Promise<void> => {};
    public deleteLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {};
    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {};

  }
