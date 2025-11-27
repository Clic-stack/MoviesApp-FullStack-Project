import { catchError } from "../middlewares/catchError.js"
import { Actor } from "../models/actor.model.js"
import { Movie } from "../models/movie.model.js"

export const getAll = catchError(async (req, res) => {
    const actors = await Actor.findAll({include: [Movie]})
    res.json(actors)
})

export const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const actor = await Actor.findByPk(id)
    if (!actor) return res.status(404).json({ message: "Actor not found" })
    res.json(actor)
})

export const create = catchError(async (req, res) => {
    const actor = await Actor.create(req.body)
    res.status(201).json(actor)
})

export const remove = catchError(async (req, res) => {
    const { id } = req.params
    await Actor.destroy({ where: { id } })
    res.status(204).end()
})

export const update = catchError(async (req, res) => {
    const { id } = req.params
    const actorEdited = await Actor.update(req.body, { 
        where: {id},
        returning: true
    })
    if (actorEdited[0] === 0) return res.status(404).json({ message: "Actor not found" })
    res.json(actorEdited[1][0])
})