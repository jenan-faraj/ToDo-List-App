import { useState, useEffect } from "react";
import Swal from "sweetalert2";

type ToDo = {
  id: string;
  msg: string;
  status: "toDo" | "doing" | "document";
  isDeleted: boolean;
};

type FilterStatus = "all" | "toDo" | "doing" | "document";

function App() {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

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
        console.error(
          "Failed to load dark mode preference from localStorage:",
          error
        );
      }
    }
  }, []);

  function addToDoList() {
    if (!inputValue.trim()) return;

    const newTodo: ToDo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      msg: inputValue,
      status: "toDo",
      isDeleted: false,
    };

    const updatedToDos = [...toDos, newTodo];
    setToDos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
    setInputValue("");
  }

  function updateStatus(id: string, newStatus: ToDo["status"]) {
    const updatedToDos = toDos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setToDos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
  }

  function deleteFromToDoList(id: string) {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        const updatedToDos = toDos.map((todo) =>
          todo.id === id ? { ...todo, isDeleted: true } : todo
        );
        setToDos(updatedToDos);
        localStorage.setItem("todos", JSON.stringify(updatedToDos));
      }
    });
  }

  function deleteAll() {
    // Show confirmation dialog for delete all
    Swal.fire({
      title: "Delete all tasks?",
      text: "This will remove all your tasks. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
      background: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        const updatedToDos = toDos.map((todo) => ({
          ...todo,
          isDeleted: true,
        }));
        setToDos(updatedToDos);
        localStorage.setItem("todos", JSON.stringify(updatedToDos));
      }
    });
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addToDoList();
    }
  };

  function toggleDarkMode() {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem("darkMode", JSON.stringify(newDarkModeState));
  }

  // Filter and search todos
  const filteredToDos = toDos
    .filter((todo) => !todo.isDeleted)
    .filter((todo) => {
      if (filter === "all") return true;
      return todo.status === filter;
    })
    .filter((todo) => {
      if (!searchQuery) return true;
      return todo.msg.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div
      className={`min-h-screen p-4 md:p-6 font-sans transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between mb-6 p-4 rounded-lg backdrop-blur-sm bg-opacity-90 
          bg-gradient-to-r transition-all duration-300 ${
            isDarkMode
              ? "from-gray-800 to-gray-700 shadow-lg shadow-gray-900/20"
              : "from-white to-blue-50 shadow-md shadow-blue-100/50"
          }`}
        >
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 sm:mb-0 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            📝 My ToDo List
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-yellow-300 hover:bg-gray-600 shadow-lg shadow-yellow-500/10"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-md shadow-gray-200/50"
            }`}
          >
            {isDarkMode ? (
              <>
                ☀️ <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                🌙 <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div
            className={`relative p-1 rounded-xl backdrop-blur-sm bg-opacity-90 transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/30 shadow-lg shadow-gray-900/20"
                : "bg-white/50 shadow-md shadow-blue-100/30"
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search tasks..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 text-base border-0 rounded-xl focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/70 text-white placeholder-gray-400 focus:ring-blue-500"
                  : "bg-white/80 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
              }`}
            />
          </div>
        </div>

        {/* Add Task Section */}
        <div
          className={`mb-6 p-4 rounded-xl backdrop-blur-sm bg-opacity-90 transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800/30 shadow-lg shadow-gray-900/20"
              : "bg-white/50 shadow-md shadow-blue-100/30"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={inputValue}
              placeholder="✏️ Enter a new task..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`flex-1 px-4 py-3 text-base border-0 rounded-xl focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/70 text-white placeholder-gray-400 focus:ring-blue-500"
                  : "bg-white/80 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
              }`}
            />
            <div className="flex gap-2">
              <button
                onClick={addToDoList}
                className="px-4 py-3 text-base bg-blue-600 text-white border-none rounded-xl cursor-pointer hover:bg-blue-700 
                  transition-all duration-300 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 flex items-center gap-2"
              >
                <span>➕</span> Add
              </button>
              <button
                onClick={deleteAll}
                className="px-4 py-3 text-base bg-red-500 text-white border-none rounded-xl cursor-pointer hover:bg-red-600 
                  transition-all duration-300 shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40 flex items-center gap-2"
              >
                <span>🗑️</span> Clear All
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {(["all", "toDo", "doing", "document"] as FilterStatus[]).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    filter === status
                      ? isDarkMode
                        ? status === "all"
                          ? "bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                          : status === "toDo"
                          ? "bg-yellow-700 text-white shadow-lg shadow-yellow-500/20"
                          : status === "doing"
                          ? "bg-orange-700 text-white shadow-lg shadow-orange-500/20"
                          : "bg-green-700 text-white shadow-lg shadow-green-500/20"
                        : status === "all"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-400/30"
                        : status === "toDo"
                        ? "bg-yellow-500 text-white shadow-md shadow-yellow-400/30"
                        : status === "doing"
                        ? "bg-orange-500 text-white shadow-md shadow-orange-400/30"
                        : "bg-green-600 text-white shadow-md shadow-green-400/30"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-md shadow-gray-900/20"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm shadow-gray-200/50"
                  }`}
                >
                  <span>
                    {status === "all"
                      ? "📋"
                      : status === "toDo"
                      ? "⏳"
                      : status === "doing"
                      ? "🚀"
                      : "✅"}
                  </span>
                  {status === "all"
                    ? "All"
                    : status === "toDo"
                    ? "To Do"
                    : status === "doing"
                    ? "Doing"
                    : "Done"}
                </button>
              )
            )}
          </div>
        </div>

        {/* Task Counter */}
        <div
          className={`mb-4 p-3 rounded-xl text-sm transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800/40 text-gray-300"
              : "bg-white/60 text-gray-600"
          }`}
        >
          <span className="font-medium">
            {filteredToDos.length} task{filteredToDos.length !== 1 ? "s" : ""}
          </span>
          {filter !== "all" && ` in ${filter}`}
          {searchQuery && ` containing "${searchQuery}"`}
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {filteredToDos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 border-0 rounded-xl transition-all duration-300 flex flex-col md:flex-row md:items-center gap-3
                backdrop-blur-sm bg-opacity-90 hover:scale-[1.02] hover:shadow-lg ${
                  isDarkMode
                    ? "bg-gray-800/50 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30"
                    : "bg-white/70 shadow-md shadow-blue-100/30 hover:shadow-blue-200/40"
                } ${todo.status === "document" ? "opacity-80" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <span
                  className={`text-base break-words transition-colors duration-300 ${
                    todo.status === "document"
                      ? isDarkMode
                        ? "line-through text-gray-400"
                        : "line-through text-gray-500"
                      : isDarkMode
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  {todo.msg}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <select
                  value={todo.status}
                  onChange={(e) =>
                    updateStatus(todo.id, e.target.value as ToDo["status"])
                  }
                  className={`px-3 py-2 text-sm border-0 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${
                    isDarkMode
                      ? "bg-gray-700 text-white focus:ring-blue-500"
                      : "bg-white text-gray-900 focus:ring-blue-400"
                  }`}
                >
                  <option value="toDo">⏳ To Do</option>
                  <option value="doing">🚀 Doing</option>
                  <option value="document">✅ Done</option>
                </select>

                <button
                  onClick={() => deleteFromToDoList(todo.id)}
                  className="px-3 py-2 text-sm bg-red-500 text-white border-none rounded-lg cursor-pointer hover:bg-red-600 
                    transition-all duration-300 shadow-sm shadow-red-500/30 hover:shadow-md hover:shadow-red-500/40"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filteredToDos.length === 0 && (
          <div
            className={`text-center mt-10 p-6 rounded-xl transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800/40 text-gray-400"
                : "bg-white/60 text-gray-500"
            }`}
          >
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium">
              {searchQuery
                ? `No tasks found matching "${searchQuery}"`
                : filter !== "all"
                ? `No tasks in ${filter}`
                : "Your task list is empty!"}
            </p>
            <p className="mt-2">
              {searchQuery || filter !== "all"
                ? "Try changing your search or filter settings"
                : "Add your first task to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
