import express from "express"
import projectRoutes from "./routes/notes.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import morgan from "morgan";
import cors from "cors";

const app = express(); 
app.use(cors())


app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("<h1>Hello world!</h1>")
})
app.use(projectRoutes)
app.use(categoryRoutes)

export default app