import { catchError } from "../middlewares/catchError.js";
import { Director } from "../models/director.model.js"
import { Movie } from "../models/movie.model.js";

export const getAll = catchError(async (req, res) => {
    const directors = await Director.findAll({ include: [Movie]})
    res.json(directors)
})

export const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const director = await Director.findByPk(id)
    if (!director) return res.status(404).json({ message: "Director not found" })
    res.json(director)
})

export const create = catchError(async (req, res) => {
    const director = await Director.create(req.body)
    res.status(201).json(director)
})

export const remove = catchError(async (req, res) => {
    const { id } = req.params
    await Director.destroy({ where: { id } })
    res.status(204).end()
})

export const update = catchError(async (req, res) => {
    const { id } = req.params
    const directorEdited = await Director.update(req.body, { 
        where: {id},
        returning: true
    })
    if (directorEdited[0] === 0) return res.status(404).json({ message: "Director not found" })
    res.json(directorEdited[1][0])
})