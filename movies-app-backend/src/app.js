import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./env/index.js";

const app = express()

//const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"];

app.set('port', env.PORT || 3000)

app.use(cors())

/*app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));*/

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', routes)

// Error handler
app.use(errorHandler)

export default app