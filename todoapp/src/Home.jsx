import React, { useEffect, useState } from "react";
import Create from './Create';
import axios from "axios";
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";



function Home(){

    const[todos, setTodos] =useState([])

    useEffect(() => {
         axios.get('http://localhost:3001/get')
           .then(result =>setTodos(result.data))
           .catch(err => console.log(err));
          }, []);

     const handleEdit=(id) =>{
           // axios.put('http://localhost:3001/update/' +id)
           axios.put('http://localhost:3001/update/' + id,{ done: true })
          .then(result =>{location.reload()})
          .catch(err => console.log(err))
          }
        
     const handleDelete=(id) =>{
            axios.delete('http://localhost:3001/delete/' +id,{ done: true })
          .then(result =>{location.reload()})
          .catch(err => console.log(err))
          }
    
    
    return (
        <div className="home  page">
             
          <div className="topic"><h1>TO DO LIST.</h1></div >
          <Create/>
          {
             todos.length === 0 
             ?
             <div>
               <div className="topic"><h2>No Records.</h2></div >
             </div>
             :
            todos.map(todo => (
             <div className="task" key={todo._id}>
                <div className="checkbox" onClick={() =>handleEdit(todo._id)}  >
                  {todo.done ?
                    <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                  :<BsCircleFill className="icon"/>
                  }
                  <p className={todo.done ? "line_through" : ""}> {todo.task}</p>
                
                  </div>
                <div >
                 <span><BsFillTrashFill className="icon" onClick={() =>handleDelete(todo._id)} /></span>
                </div>
             </div>

               ) )
          }
         
        </div>
      )
}

export default Home