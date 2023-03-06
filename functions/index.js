import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addBlog, deleteBlog, getBlogs, updateBlog } from "./src/blogFunctions.js"

const app = express()
app.use( express.json() )
app.use( cors() )

app.get("/", (req, res) => res.send("This works!!!"))

app.get("/blog", getBlogs)
app.post("/blog", addBlog)
app.patch("/blog/:blodId", updateBlog)
app.delete("/blog/:blogId", deleteBlog)

export const api = functions.https.onRequest(app)