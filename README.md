# ToDo List Application

A modern, responsive ToDo list application built with React and TypeScript that helps you manage your tasks efficiently with a clean, dark/light mode interface, advanced filtering, and search capabilities.

## ✨ Features

### ✅ Core Features
- **Add new tasks** with a simple input form
- **Track task status** (To Do, Doing, Done)
- **Search functionality** to find tasks quickly
- **Filter tasks** by status (All, To Do, Doing, Done)
- **Soft delete tasks** (mark as deleted without permanent removal)
- **Dark/Light mode toggle** with persistent storage
- **Local storage integration** for data persistence
- **Fully responsive design** that works on all devices
- **Fast and lightweight** with modern React hooks
- **Task counter** showing filtered results

### 🚀 Upcoming Features
- **Task categories or tags** - Organize tasks with custom categories
- **Due dates for tasks** - Set deadlines and receive reminders
- **Task priorities** - Mark tasks as high, medium, or low priority
- **Drag and drop reordering** - Organize tasks visually
- **Export/import functionality** - Backup and restore your tasks
- **Task sharing capabilities** - Share tasks with others
- **Recurring tasks** - Set tasks to repeat daily, weekly, or monthly
- **Task notes** - Add detailed descriptions to tasks
- **Calendar view** - Visualize tasks on a calendar
- **Progress tracking** - Monitor your productivity with statistics
- **Multiple workspaces** - Separate tasks for different projects
- **Collaborative editing** - Work on tasks with team members
- **Email notifications** - Get reminders via email
- **Mobile app** - Dedicated mobile application
- **Voice input** - Add tasks using voice commands
- **AI suggestions** - Get smart task recommendations
- **Pomodoro timer integration** - Built-in focus timer
- **Task templates** - Quick-add common task types
- **Advanced sorting** - Sort by date, priority, or custom criteria
- **Attachments** - Add files to tasks
- **Keyboard shortcuts** - Navigate quickly with hotkeys
- **Offline functionality** - Work without internet connection
- **Data encryption** - Secure your task data
- **Multi-language support** - Use the app in different languages
- **Custom themes** - Personalize the appearance beyond dark/light mode

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework with hooks |
| **TypeScript** | Type-safe JavaScript implementation |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **React Hooks** | State management (useState, useEffect) |
| **Local Storage API** | Browser-based data persistence |
| **Vite** | Fast build tool and development server |
| **SweetAlert2** | Beautiful alerts and notifications |

## 🚀 Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd todo-list-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📖 Usage

1. **Adding Tasks**: Type your task in the input field and press Enter or click "Add Task"
2. **Searching Tasks**: Use the search bar to find specific tasks by content
3. **Filtering Tasks**: Click on status buttons (All, To Do, Doing, Done) to filter tasks
4. **Updating Status**: Use the dropdown next to each task to change its status
5. **Deleting Tasks**: Click the "Delete" button next to any task to remove it
6. **Bulk Delete**: Use the "Delete All" button to clear all tasks at once
7. **Theme Toggle**: Switch between light and dark mode using the theme toggle button

## 🎯 Status Meanings

| Status | Description | Color | Icon |
|--------|-------------|-------|------|
| **To Do** | Tasks that haven't been started yet | Yellow | ⏳ |
| **Doing** | Tasks currently in progress | Orange | 🚀 |
| **Done** | Completed tasks | Green | ✅ |

## 📁 Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── components/      # Reusable UI components
│   ├── TaskItem.tsx # Individual task component
│   ├── Header.tsx   # App header with theme toggle
│   ├── SearchBar.tsx# Search functionality
│   └── FilterBar.tsx# Status filtering component
├── hooks/           # Custom React hooks
│   ├── useLocalStorage.ts # Local storage management
│   └── useTasks.ts  # Task management logic
├── types/           # TypeScript type definitions
│   └── index.ts     # Application types
├── utils/           # Utility functions
│   └── helpers.ts   # Helper functions
└── styles/          # Global styles and themes
    └── index.css    # Main stylesheet
```

## 🗃️ Data Model

The application uses the following TypeScript interface for tasks:

```typescript
type ToDo = {
  id: string;                    // Unique identifier
  msg: string;                   // Task description
  status: "toDo" | "doing" | "done";  // Task status
  isDeleted: boolean;            // Soft delete flag
  createdAt: Date;               // Task creation date (future feature)
  dueDate?: Date;                // Optional due date (future feature)
  priority?: "low" | "medium" | "high"; // Task priority (future feature)
  tags?: string[];               // Categorization tags (future feature)
};

type FilterStatus = "all" | "toDo" | "doing" | "done";
```

## 💾 Local Storage

The application stores two key pieces of information in localStorage:

| Key | Description | Data Type |
|-----|-------------|-----------|
| `todos` | Serialized array of all tasks | JSON string |
| `darkMode` | Boolean value indicating the current theme preference | JSON boolean |

## 🎨 Customization

You can easily customize the application by:

- Modifying the color scheme in the Tailwind CSS classes
- Adding new task status options
- Changing the localStorage keys for different data persistence needs
- Adjusting the responsive breakpoints for different screen sizes
- Customizing the search and filter functionality
- Adding new task properties (due dates, priorities, etc.)

## 🌐 Browser Compatibility

This application works on all modern browsers that support:

- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage API

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop screens (1024px and up)

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution:
- Implementing upcoming features
- Improving accessibility
- Enhancing performance
- Adding tests
- Improving documentation
- Translating to other languages

## 🐛 Known Issues

- None currently. Please report any issues you find in the GitHub Issues section!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Created with ❤️ using React, TypeScript, and Tailwind CSS.

---

**⭐ Star this repo if you found it helpful!**
