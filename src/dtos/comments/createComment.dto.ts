import z from 'zod'
export interface createCommentInputDTO {
    token: string;
    content: string;
    postId: string
}

export interface createCommentOutputDTO {
    message: string
}

export const createCommentSchema = z.object({
    token: z.string(),
    content: z.string(),
    postId: z.string()
}).transform(data => data as createCommentInputDTO)
