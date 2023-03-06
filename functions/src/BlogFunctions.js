import { ObjectId } from "mongodb";
import { mongoCredentials } from "../secrets.js";
import { dbConnect } from "./dbConnect.js";

const mongo_collection = mongoCredentials.Collection

// -~===========~- GET -~===========~-

export function getBlogs(req, res) {
  const db = dbConnect()
  const collection = db.collection(mongo_collection)
  collection.find().sort({ createdAt: -1 }).toArray()
    .then(docs => {
      const blog = docs.map(doc => ({ ...doc }))
      res.send(blog)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.message })
    });
}

// -~===========~- ADD -~===========~-

export function addBlog(req, res) {
  const { title, description, image, review } = req.body
  if((title.length <1 || description.length <1 || image.length <1 || review.length <1 )) {
    res.status(500).json({message: "Inputs are too short!"})
    return
  }
  const newBlog = { title, description, image, review, createdAt: new Date() }
  const db = dbConnect()
  db.collection(mongo_collection).insertOne(newBlog)
    .then(() => getBlogs(req, res))
    .catch(err => res.status(500).json({ error: err.message }))
}

// -~===========~- UPDATE -~===========~-

export function updateBlog(req, res) {
  const db = dbConnect()
  const { blogId } = req.params

  db.collection(mongo_collection)
    .findOneAndUpdate({ _id: new ObjectId(blogId) }, { $set: req.body })
    .catch(err => res.status(500).json({ error: err.message }))
    .then(() => getAllCommentsInPost(req, res))
}

// -~===========~- DELETE -~===========~-

export function deleteBlog(req, res) {
  const db = dbConnect()
  const { blogId } = req.params
  
  db.collection(mongo_collection)
    .findOneAndDelete({_id: new ObjectId(blogId)})
    .catch(err => res.status(500).json({error: err.message}))
    .then(() => getBlogs(req, res))

}
