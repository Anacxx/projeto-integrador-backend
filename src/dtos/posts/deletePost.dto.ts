import z from 'zod'
export interface deletePostInputDTO {
    token: string;
    idToDelete: string
}
export type deletePostOutputDTO = undefined

export const deletePostSchema = z.object({
    token: z.string(),
    idToDelete: z.string()
}).transform(data => data as deletePostInputDTO)