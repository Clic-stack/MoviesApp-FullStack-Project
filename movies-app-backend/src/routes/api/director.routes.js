import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../../controllers/director.controllers.js";

const directorRouter = Router()

directorRouter.get('/', getAll)
directorRouter.get('/:id', getOne)
directorRouter.post('/', create)
directorRouter.delete('/:id', remove)
directorRouter.put('/:id', update)

export default directorRouter