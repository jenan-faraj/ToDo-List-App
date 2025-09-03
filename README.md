# ToDo List Application

A modern, responsive ToDo list application built with React and TypeScript that helps you manage your tasks efficiently with a clean, dark/light mode interface.

## Features

- ✅ Add new tasks with a simple input form
- 🎯 Track task status (To Do, Doing, Done)
- 🗑️ Soft delete tasks (mark as deleted without permanent removal)
- 🌙 Dark/Light mode toggle with persistent storage
- 💾 Local storage integration for data persistence
- 📱 Responsive design that works on all devices
- ⚡ Fast and lightweight with modern React hooks

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useState and useEffect hooks
- **Data Persistence**: Browser Local Storage
- **Build Tool**: Vite (assuming based on modern React patterns)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-list-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. **Adding Tasks**: Type your task in the input field and press Enter or click "Add Task"
2. **Updating Status**: Use the dropdown next to each task to change its status (To Do, Doing, Done)
3. **Deleting Tasks**: Click the "Delete" button next to any task to remove it
4. **Bulk Delete**: Use the "Delete All" button to clear all tasks at once
5. **Theme Toggle**: Switch between light and dark mode using the theme toggle button

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── vite-env.d.ts    # TypeScript definitions
```

## Data Model

The application uses the following TypeScript interface for tasks:

```typescript
type ToDo = {
  id: string;                    // Unique identifier
  msg: string;                   // Task description
  status: "document" | "doing" | "toDo";  // Task status
  isDeleted: boolean;            // Soft delete flag
};
```

## Local Storage

The application stores two key pieces of information in localStorage:
- `todos`: Serialized array of all tasks
- `darkMode`: Boolean value indicating the current theme preference

## Customization

You can easily customize the application by:
- Modifying the color scheme in the Tailwind CSS classes
- Adding new task status options
- Changing the localStorage keys for different data persistence needs
- Adjusting the responsive breakpoints for different screen sizes

## Browser Compatibility

This application works on all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.