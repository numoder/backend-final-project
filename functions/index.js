import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addBlog, deleteBlog, getBlogs, updateBlog } from "./src/BlogFunctions.js"

const app = express()
app.use(express.json())
app.use(cors())

//this is four endpoints
app.get("/", (req, res) => res.send("🧑‍💻"))
app.get("/blog", getBlogs)
app.post("/blog", addBlog)
app.patch("/blog/:blogId", updateBlog)
app.delete("/blog/:blogId", deleteBlog)

export const api = functions.https.onRequest(app)