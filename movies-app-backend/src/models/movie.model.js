import db from "../db/connect.js"
import { DataTypes, HasMany } from "sequelize"
import { Genre } from "./genre.model.js"
import { Actor } from "./actor.model.js"
import { Director } from "./director.model.js"

export const Movie = db.define("movie", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    release_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

// Para el endpoint GET -> /movies, cada película debe traer sus generos, actores y directores 

Genre.belongsToMany(Movie, { through: 'genres_movies' })
Movie.belongsToMany(Genre, { through: 'genres_movies' })

Actor.belongsToMany(Movie, { through: 'actors_movies' })
Movie.belongsToMany(Actor, { through: 'actors_movies' })

Director.belongsToMany(Movie, { through: 'directors_movies' })
Movie.belongsToMany(Director, { through: 'directors_movies' })