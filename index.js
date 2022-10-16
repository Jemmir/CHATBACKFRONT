import express from "express"
import morgan from "morgan"
import {Server as SocketServer} from "socket.io"
import http from "http"
import { PORT } from "./config.js"
import cors from "cors"
import {dirname, join} from "path"
import { fileURLToPath } from "url"
const app = express() 
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: ["http://localhost:3000", process.env.CORS]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("mensaje al usuario", (mensaje, nose) => {
       
        socket.broadcast.emit("mensaje usuario", {
            "body": mensaje,
            "from": nose

        })
    })
})

app.use(cors({
    origin: ["http://localhost:3000", process.env.CORS]
}))

app.use(express.static(join(__dirname, "../client/build")))
app.use(morgan("dev"))
server.listen(PORT, console.log("server started on http://localhost:" + PORT))asd
