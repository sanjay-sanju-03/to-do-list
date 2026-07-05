import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem.trim() === "") return

    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem.trim(), completed: false }
    ])
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    )
  }

  function deleteTodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-container">
      <h1 className="header">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
            placeholder="Add a new task..."
          />
          <button className="btn" type="submit">Add</button>
        </div>
      </form>

      <ul className="list">
        {todos.length === 0 && <li className="empty-message">No tasks left!</li>}
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)}
              />
              <span className={todo.completed ? "todo-text completed" : "todo-text"}>
                {todo.title}
              </span>
            </label>
            <button 
              onClick={() => deleteTodo(todo.id)} 
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
} 