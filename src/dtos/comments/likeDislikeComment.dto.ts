import { z } from "zod";

export interface likeDislikeCommentInputDTO {
    token: string;
    commentId: string;
    like: boolean
}
export type likeDislikeCommentOutputDTO = undefined

export const likeDislikeCommentSchema = z.object({
    token: z.string().min(1),
    commentId: z.string().min(1),
    like: z.boolean()
}).transform(data => data as likeDislikeCommentInputDTO)