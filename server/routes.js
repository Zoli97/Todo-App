const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

//* 4 routes

// GET /todos (get the list of todos)

router.get("/todos", async (req, res) => {
  //bring back all of the todos with empty array
  try {
    const collection = mongoose.connection.db.collection("todos");
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
  //res.status(200).json({ msg: "GET REQUEST to /api/todos" });
});

// Post /todos (create a new todo)
//pull the todo from req body
router.post("/todos", async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("todos");
    let { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ msg: "Error todo not found" });
    }
    todo =  (typeof todo === "string") ? todo :  JSON.stringify(todo);
    const newTodo = await collection.insertOne({ todo, status: false });
    console.log(newTodo);
    //res.status(200).json({ msg: "POST REQUEST to /api/todos" });
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (error) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

//PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  try {
    const todoId = new ObjectId(req.params.id); // Get the todo ID from the URL and convert todoId to ObjectId
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const collection = mongoose.connection.db.collection("todos");

    //cehck if the provided id is a valid objectid;

    if (!ObjectId.isValid(todoId)) {
      return res.status(400).json({ error: "Invalid Todo ID" });
    }
    const updated = await collection.updateOne(
      { _id: todoId },
      { $set: { status: !status } }
    );
    // Check if the document was actually updated
    if (updated.matchedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }

  //res.status(200).json({ msg: "PUT REQUEST to /api/todos/:id" });
});

//DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const todoId = new ObjectId(req.params.id); // Get the todo ID from the URL
  try {
    const colelction = mongoose.connection.db.collection("todos");
    const deletedTodo = await colelction.deleteOne({ _id: todoId });
    res.status(200).json(deletedTodo);
  } catch (error) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }

  // res.status(200).json({ msg: "DELTE REQUEST to /api/todos/:id" });
});

module.exports = router;
