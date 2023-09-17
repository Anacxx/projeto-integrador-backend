import { z } from "zod";
import { PostModel } from "../../models/Posts";

export interface getAllPostsInputDTO {
    token: string;
}
export type getAllPostsOutputDTO = PostModel[]

export const getAllPostsSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as getAllPostsInputDTO)