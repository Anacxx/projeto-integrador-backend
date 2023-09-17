import z from 'zod'
export interface createPostInputDTO {
    token: string;
    content: string
}

export type createPostOutputDTO = undefined

export const createPostSchema = z.object({
    token: z.string(),
    content: z.string()
}).transform(data => data as createPostInputDTO)
