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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Load todos from localStorage
    const savedToDos = localStorage.getItem("todos");
    if (savedToDos) {
      try {
        setToDos(JSON.parse(savedToDos));
      } catch (error) {
        console.error("Failed to load todos from localStorage:", error);
      }
    }

    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      try {
        setIsDarkMode(JSON.parse(savedDarkMode));
      } catch (error) {
        console.error("Failed to load dark mode preference from localStorage:", error);
      }
    }
  }, []);

  function addToDoList() {
    if (!inputValue.trim()) return;
    
    const newTodo: ToDo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      msg: inputValue,
      status: "toDo",
      isDeleted: false
    };
    
    const updatedToDos = [...toDos, newTodo];
    setToDos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
    setInputValue("");
  }

  function updateStatus(id: string, newStatus: ToDo["status"]) {
    const updatedToDos = toDos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setToDos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
  }

  function deleteFromToDoList(id: string) {
    const updatedToDos = toDos.map(todo => 
      todo.id === id ? { ...todo, isDeleted: true } : todo
    );
    setToDos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
  }

  function deleteAll() {
    const updatedToDos = toDos.map(todo => ({ ...todo, isDeleted: true }));
    setToDos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToDoList();
    }
  };

  function toggleDarkMode() {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem("darkMode", JSON.stringify(newDarkModeState));
  }

  return (
    <div className={`min-h-screen p-5 font-sans transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center justify-between mb-5">
        <h1 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          My ToDo List
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-700'
              : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <div className="mb-5">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a task"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`px-3 py-2 text-base border rounded mr-2.5 w-80 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        <button 
          onClick={addToDoList}
          className="px-4 py-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
        >
          Add Task
        </button>
        <button 
          onClick={deleteAll} 
          className="px-4 py-2 text-base bg-red-600 text-white border-none rounded cursor-pointer ml-2.5 hover:bg-red-700 transition-colors duration-300"
        >
          Delete All
        </button>
      </div>

      <ul className="list-none p-0">
        {toDos
          .filter(todo => !todo.isDeleted)
          .map(todo => (
            <li 
              key={todo.id} 
              className={`my-2.5 p-3 border rounded flex items-center gap-2.5 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span 
                className={`flex-1 text-base transition-colors duration-300 ${
                  todo.status === "document" 
                    ? isDarkMode 
                      ? "line-through text-gray-500" 
                      : "line-through text-gray-500"
                    : isDarkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                }`}
              >
                {todo.msg}
              </span>
              
              <select
                value={todo.status}
                onChange={(e) =>
                  updateStatus(todo.id, e.target.value as ToDo["status"])
                }
                className={`px-2 py-1 text-sm border rounded transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="toDo">To Do</option>
                <option value="doing">Doing</option>
                <option value="document">Done</option>
              </select>
              
              <button
                onClick={() => deleteFromToDoList(todo.id)}
                className="px-3 py-1 text-sm bg-red-600 text-white border-none rounded cursor-pointer hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      {toDos.filter(todo => !todo.isDeleted).length === 0 && (
        <p className={`italic text-center mt-10 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No tasks yet. Add your first task above!
        </p>
      )}

    </div>
  );
}

export default App;