import { z } from "zod";
import { CommentModel } from "../../models/Comments";

export interface getCommentsByIdInputDTO {
    token: string;
    postId: string;
}
export type getCommentsByIdOutputDTO = CommentModel[]

export const getCommentsByIdSchema = z.object({
    token: z.string().min(1),
    postId: z.string().min(1)
}).transform(data => data as getCommentsByIdInputDTO)