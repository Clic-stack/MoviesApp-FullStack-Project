import { catchError } from "../middlewares/catchError.js";
import { Actor } from "../models/actor.model.js";
import { Director } from "../models/director.model.js";
import { Genre } from "../models/genre.model.js";
import { Movie } from "../models/movie.model.js";

export const getAll = catchError(async (req, res) => {
    const movies = await Movie.findAll({ include: [Genre, Actor, Director]})
    res.json(movies)
})

export const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.status(404).json({ message: "Movie not found" })
    res.json(movie)
})

export const create = catchError(async (req, res) => {
    const movie = await Movie.create(req.body)
    res.status(201).json(movie)
})

export const remove = catchError(async (req, res) => {
    const { id } = req.params
    await Movie.destroy({ where: { id } })
    res.status(204).end()
})

export const update = catchError(async (req, res) => {
    const { id } = req.params
    const movieEdited = await Movie.update(req.body, { 
        where: {id},
        returning: true
    })
    if (movieEdited[0] === 0) return res.status(404).json({ message: "Movie not found" })
    res.json(movieEdited[1][0])
})

export const setGenres = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
        await movie.setGenres(req.body)
    const genres = await movie.getGenres()
    res.json(genres)
})

export const setActors = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
        await movie.setActors(req.body)
    const actors = await movie.getActors()
    res.json(actors)
})

export const setDirectors = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
        await movie.setDirectors(req.body)
    const directors = await movie.getDirectors()
    res.json(directors)
})