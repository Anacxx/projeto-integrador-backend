import { z } from "zod";

export interface editPostInputDTO {
    token: string;
    idToEdit: string;
    content: string
}
export type editPostOutputDTO = undefined

export const editPostSchema = z.object({
    token: z.string().min(1),
    idToEdit: z.string().min(1),
    content: z.string()
}).transform(data => data as editPostInputDTO)