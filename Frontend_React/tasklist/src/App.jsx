import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TodoSearch from './components/TodoSearch'
import TodoList from './components/TodoList'

function App() {

  const [todos, setTodos] = useState([
    { id: 0, task: "Write a story", status: "Active" },
    { id: 1, task: "Go to Temple", status: "Active" },
    { id: 2, task: "Study JavaScript", status: "Active" },
    { id: 3, task: "Go to Grocery Store", status: "Active" },
    { id: 3, task: "Cook Dinner", status: "Active" },

  ]);
  const [errors,setErrors] = useState("");

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000")
  //   .then(res => setTodos(res.data))
  //   .catch(err => setErrors(err.message))
  // }, [])
    

  // delete function
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
    const originalTodos = [...todos]
    axios.delete("http://127.0.0.1:8000" + id)
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }

  // add todo function
  const addTodo = (data) => {
    const originalTodos = [...todos]
    setTodos([...todos, data = {...data, id:parseInt(todos[todos.length-1].id) + 1}])
    axios.post("http://127.0.0.1:8000", data)
    .then(res => setTodos([...todos, res.data]))
  }

  // update function
  const updateTodo = (e, id, new_task) => {
    const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, task: new_task } : todo);
    setTodos(updatedTodos);
  }

  const completeTodo = (e, id) => {

    if(e.target.checked){
      console.log("okay")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, status:"Completed"}: todo))
    }
    else
    {
      console.log("omo")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, status:"Active"}: todo))
    }

   
  }


  return (
    <div className="todo-container">
      {errors && <p>{errors}</p>}
      <TodoSearch add_todo={addTodo} />
      <TodoList todos={todos} delete_todo={deleteTodo} updated_todo={updateTodo} />
    </div>
  );
}

export default App;
