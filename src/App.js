import React, { useState, useEffect } from "react";
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import axios from 'axios'


function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState(null);


  useEffect(() => {
    filterHandler();
  }, [todos, status]);


  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
        

    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/todos').then(response => {
      setTotalTodos(response.data.total)
      console.log(response);
    
    } ).catch(error => {
      console.error("There was an error", error);
    });
      

  },[]);


  return (
    <div className="App">
      <header>
        <h1>Betty's Todo List</h1>
       </header>
       <Form 
       inputText={inputText} 
       todos={todos} 
       setTodos={setTodos} 
       setInputText={setInputText}
       setStatus={setStatus}
       />
       
       <TodoList 
       filteredTodos={filteredTodos}
       setTodos={setTodos} 
       todos={todos} />
    </div>
  );
}

export default App;
