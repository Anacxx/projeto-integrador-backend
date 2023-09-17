export interface CommentDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string
  }
  export interface CommentModel {
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    creatorId: string;
    creatorNick_name:string;
}
    export interface PostCommentDB {
        post_id: string;
        comment_id: string;
    }
  export interface LikeDislikeDB{
    user_id: string,
    comment_id: string,
    like: number
  }
export class Comment {
    constructor(
      private id: string,
      private content: string,
      private likes: number,
      private dislikes: number,
      private createdAt: string,
      private creatorId: string,
      private creatorNick_name: string
    ) {}

    // Getters
    getId(): string {
        return this.id;
    }

    getContent(): string {
        return this.content;
    }

    getLikes(): number {
        return this.likes;
    }

    getDislikes(): number {
        return this.dislikes;
    }

    getCreatedAt(): string {
        return this.createdAt;
    }

    getCreatorId(): string {
        return this.creatorId;
    }

    getCreatorNickName(): string {
        return this.creatorNick_name;
    }

    // Setters
    setContent(content: string): void {
        this.content = content;
    }

    setLikes(likes: number): void {
        this.likes = likes;
    }

    setDislikes(dislikes: number): void {
        this.dislikes = dislikes;
    }

    setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    setCreatorId(creatorId: string): void {
        this.creatorId = creatorId;
    }

    setCreatorNickName(creatorNick_name: string): void {
        this.creatorNick_name = creatorNick_name;
    }
    addLike = (): void => {
        this.likes++
    }
    removeLike = (): void => {
        this.likes--
    }
    addDislike = (): void => {
        this.dislikes++
    }
    removeDislike = (): void => {
        this.dislikes--
    }
    public toCommentDB() {
        return {
          id: this.id,
          creator_id: this.creatorId,
          content: this.content,
          likes: this.likes,
          dislikes: this.dislikes,
          createdAt: this.createdAt,
        }
      }
    public toCommentModel() {
        return{
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            creatorId: this.creatorId,
            creatorNick_name: this.creatorNick_name
        }
    }
}
