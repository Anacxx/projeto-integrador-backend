import { z } from "zod";

export interface likeDislikePostInputDTO {
    token: string;
    postId: string;
    like: boolean
}
export type likeDislikePostOutputDTO = undefined

export const likeDislikePostSchema = z.object({
    token: z.string().min(1),
    postId: z.string().min(1),
    like: z.boolean()
}).transform(data => data as likeDislikePostInputDTO)