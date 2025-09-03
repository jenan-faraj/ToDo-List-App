import { useState, useEffect } from "react";

type ToDo = {
  id: string;
  msg: string;
  status: "document" | "doing" | "toDo"; 
  isDeleted: boolean;
};

function App() {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        setToDos(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load todos from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  function addToDoList() {
    if (!inputValue.trim()) return;
    
    const newTodo: ToDo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      msg: inputValue,
      status: "toDo",
      isDeleted: false
    };
    
    setToDos([...toDos, newTodo]);
    setInputValue("");
  }

  function updateStatus(id: string, newStatus: ToDo["status"]) {
    setToDos(toDos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  }

  function deleteFromToDoList(id: string) {
    setToDos(toDos.map(todo => 
      todo.id === id ? { ...todo, isDeleted: true } : todo
    ));
  }

  function deleteAll() {
    setToDos(toDos.map(todo => ({ ...todo, isDeleted: true })));
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToDoList();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>My ToDo List</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a task"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginRight: "10px",
            width: "300px"
          }}
        />
        <button 
          onClick={addToDoList}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add Task
        </button>
        <button 
          onClick={deleteAll} 
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px"
          }}
        >
          Delete All
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {toDos
          .filter(todo => !todo.isDeleted)
          .map(todo => (
            <li 
              key={todo.id} 
              style={{ 
                margin: "10px 0", 
                padding: "12px",
                border: "1px solid #eee",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span 
                style={{ 
                  flex: 1,
                  fontSize: "16px",
                  textDecoration: todo.status === "document" ? "line-through" : "none",
                  color: todo.status === "document" ? "#888" : "#333"
                }}
              >
                {todo.msg}
              </span>
              
              <select
                value={todo.status}
                onChange={(e) =>
                  updateStatus(todo.id, e.target.value as ToDo["status"])
                }
                style={{
                  padding: "4px 8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }}
              >
                <option value="toDo">To Do</option>
                <option value="doing">Doing</option>
                <option value="document">Done</option>
              </select>
              
              <button
                onClick={() => deleteFromToDoList(todo.id)}
                style={{
                  padding: "4px 12px",
                  fontSize: "14px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      {toDos.filter(todo => !todo.isDeleted).length === 0 && (
        <p style={{ color: "#888", fontStyle: "italic", textAlign: "center", marginTop: "40px" }}>
          No tasks yet. Add your first task above!
        </p>
      )}

      {/* Debug info - remove this in production */}
      <div style={{ 
        marginTop: "40px", 
        padding: "10px", 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #dee2e6", 
        borderRadius: "4px",
        fontSize: "12px",
        color: "#6c757d"
      }}>
        <strong>Debug Info:</strong>
        <br />
        Total todos in state: {toDos.length}
        <br />
        Visible todos: {toDos.filter(todo => !todo.isDeleted).length}
        <br />
        localStorage key 'todos': {localStorage.getItem("todos") ? "exists" : "empty"}
        <br />
      </div>
    </div>
  );
}

export default App;