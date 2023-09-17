export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    updatedAt: string
  }
  export interface PostModel {
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    comments: number;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
    creatorNick_name:string;
}

  export interface postDBWithCreatorName {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments:number,
    createdAt: string,
    updatedAt: string,
    nickName: string
  }
  export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number
  }
  export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
  }
  export class Post {
      constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorNick_name: string,
      ) {}
    
      // Getters
      public getId(): string {
        return this.id;
      }
    
      public getCreatorId(): string {
        return this.creatorId;
      }
    
      public getcreatorNick_name(): string {
        return this.creatorNick_name;
      }
    
      public getContent(): string {
        return this.content;
      }
    
      public getLikes(): number {
        return this.likes;
      }
    
      public getDislikes(): number {
        return this.dislikes;
      }

      public getComments(): number {
        return this.comments
      }
    
      public getCreatedAt(): string {
        return this.createdAt;
      }
    
      public getUpdatedAt(): string {
        return this.updatedAt;
      }
    
      // Setters
      public setId(id: string): void {
        this.id = id;
      }
    
      public setCreatorId(creatorId: string): void {
        this.creatorId = creatorId;
      }
    
      public setcreatorNick_name(creatorNick_name: string): void {
        this.creatorNick_name = creatorNick_name;
      }
    
      public setContent(content: string): void {
        this.content = content;
      }
    
      public setLikes(likes: number): void {
        this.likes = likes;
      }
      public addLike = (): void => {
        this.likes++
      }
      public removeLike = (): void => {
        this.likes--
      }
      public setDislikes(dislikes: number): void {
        this.dislikes = dislikes;
      }
      public setComments(comments: number): void {
        this.comments = comments
      }
      public addDislike = (): void => {
        this.dislikes++
      }
      public addComment = (): void => {
        this.comments++
      }
      public removeDislike = (): void => {
        this.dislikes--
      }
    
      public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
      }
    
      public setUpdatedAt(updatedAt: string): void {
        this.updatedAt = updatedAt;
      }
      public toPostDB() {
        return {
          id: this.id,
          creator_id: this.creatorId,
          content: this.content,
          likes: this.likes,
          comments: this.comments,
          dislikes: this.dislikes,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        }
      }
      public toPostModel(): PostModel {
        return {
          id: this.id,
          content: this.content,
          likes: this.likes,
          dislikes: this.dislikes,
          comments: this.comments,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          creatorId: this.creatorNick_name,
          creatorNick_name:this.creatorNick_name,
        };
    }
  }
  