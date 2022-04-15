import React from 'react';
import axios from 'axios'

const Form = ({setInputText, todos, setTodos, inputText, setStatus}) => {

  const inputTextHandler = (e) => {
    console.log(e.target.value)
    setInputText(e.target.value);
    
  };

  const submitTodoHandler = async (e) => {
    e.preventDefault();
    let data = {
      description: inputText
    }
    console.log(inputText)
    setTodos([
      ...todos, 
      {text:inputText, completed:false, id: Math.random() * 1000 }
    ]);
    axios.post('http://localhost:5000/todos', data).then((response) => {
      console.log(response)

    })
    setInputText('');
    // console.log(todos)
    
  
  }; 
  
  const statusHandler = (e) => {
    setStatus(e.target.value)
  } 

    return(
      <form> 
        <input value={inputText} 
        onChange={inputTextHandler}
        type="text" 
        className="todo-input" 
        />
        <button onClick={submitTodoHandler} className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i> 
        </button>
        <div className="select">
            <select onChange={statusHandler} name="todos" className="filter-todo">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>

            </select>
        </div>
      </form>
    )
}

export default Form;