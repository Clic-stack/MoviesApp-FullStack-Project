import { Router } from "express"
import actorRouter from "./actor.routes.js"
import directorRouter from "./director.routes.js"
import genreRouter from "./genre.routes.js"
import movieRouter from "./movie.routes.js"

const apiRouter = Router()

apiRouter.use('/actors', actorRouter)
apiRouter.use('/directors', directorRouter)
apiRouter.use('/genres', genreRouter)
apiRouter.use('/movies', movieRouter)

export default apiRouter