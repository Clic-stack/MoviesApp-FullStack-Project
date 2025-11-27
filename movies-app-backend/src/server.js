import app from "./app.js";
import { connectDB } from "./db/connect.js";

await connectDB()

async function init() {
    try {
        await connectDB()
        app.listen(app.get('port'), () => {
            console.log(`Server running on port http://localhost:${app.get('port')}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

init()