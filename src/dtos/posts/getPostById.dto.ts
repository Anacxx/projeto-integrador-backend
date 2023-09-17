import { z } from "zod";
import { PostModel } from "../../models/Posts";

export interface getPostByIdInputDTO {
    token: string;
    id: string;
}
export type getPostByIdOutputDTO = PostModel

export const getPostByIdSchema = z.object({
    token: z.string().min(1),
    id: z.string().min(1)
}).transform(data => data as getPostByIdInputDTO)