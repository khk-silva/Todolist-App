const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./Models/Todo')

const app = express();
app.use(cors());
app.use(express.json());



app.post('/add', (req ,res) => {
    const task =req.body.task
    todoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get', (req ,res) => {
    
    todoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req ,res) => {
    //const id = req.params;
    const id = req.params.id;
    
    console.log(id);
    //todoModel.findByIdAndUpdate({_id :id},{done :true})
    todoModel.findByIdAndUpdate(id, {done: true})
    
    .then(result => res.json(result))
    //.catch(err => res.json(err))
    .catch(err => res.status(500).json({ error: "An error occurred updating" }));  

})

app.delete('/delete/:id', (req ,res) => {
    const id = req.params.id;
    console.log(id);
    todoModel.findByIdAndDelete(id, {done: true})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: "An error occurred in deleting" }));  

})

mongoose.connect('mongodb+srv://TodoApp:todoapp@cluster0.mnnayje.mongodb.net/');

app.listen(3001, () => {
    console.log(`Server is running `);
  });
  