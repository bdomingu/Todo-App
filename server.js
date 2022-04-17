const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:5000/todos', 'http://localhost:3000']
}));
const pool = require("./db");
require('dotenv').config()

app.use(express.json()) // => req.body

app.post("/todos", async(req, res) => {
    try {
      const { description } = req.body;
      console.log(req.body)
        if (description===undefined) {
            console.log("If statement")
            res.sendStatus(204)
        }
        else {
            const newTodo = await pool.query(
                "INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]
            );
      
            res.json(newTodo.rows[0]);
        }
    } catch (err) {
      console.error(err.message)
    }
})

// app.put("/todos/:id", async (req, res) => {
//     const {id} = req.params;

// }
// )

app.get("/todos", async (req, res) => {
    try  {
        const allTodos = await pool.query("SELECT * FROM todo");
        console.log(allTodos.rows)
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen (5000, () => { 
    console.log("server is listening on port 5000");
})