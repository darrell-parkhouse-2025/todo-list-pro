# Parent-Child Component Relationship

## Overview

In React, components can contain other components, creating a parent-child hierarchy. This is fundamental to React's component-based architecture.

## Current Relationship

```
TodoListPro (Parent)
    └── AddTodoForm (Child)
```

### TodoListPro (Parent Component)

**Location:** `src/components/TodoListPro.jsx`

**Responsibilities:**
- Manages the main application state (todos, filters, dark mode, etc.)
- Renders the overall layout and structure
- Imports and renders the AddTodoForm child component
- Provides callback functions to child components
- Handles data persistence (localStorage)

**Code:**
```jsx
import AddTodoForm from './AddTodoForm';

// Inside the component:
<AddTodoForm onAddTodo={addTodo} darkMode={darkMode} />
```

### AddTodoForm (Child Component)

**Location:** `src/components/AddTodoForm.jsx`

**Responsibilities:**
- Manages its own local state (input, category, priority, dueDate)
- Renders the form UI for adding todos
- Validates and formats todo data before submission
- Calls parent's callback function when user submits

**Code:**
```jsx
export default function AddTodoForm({ onAddTodo, darkMode }) {
  // Local state
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('personal');
  // ...

  const handleSubmit = () => {
    // Create todo data
    onAddTodo({
      text: trimmedInput,
      category,
      priority,
      dueDate,
    });
  };
}
```

## Data Flow

React follows a **unidirectional data flow** pattern:

### 1. Props Down (Parent → Child)

The parent passes data and functions to the child via **props**:

```jsx
// Parent sends:
<AddTodoForm
  onAddTodo={addTodo}    // Function callback
  darkMode={darkMode}     // Boolean state
/>

// Child receives:
function AddTodoForm({ onAddTodo, darkMode }) {
  // Can now use onAddTodo and darkMode
}
```

### 2. Callbacks Up (Child → Parent)

The child communicates back to the parent by calling callback functions:

```jsx
// In Child:
const handleSubmit = () => {
  onAddTodo({
    text: 'Buy groceries',
    category: 'shopping',
    priority: 'medium',
    dueDate: '2025-11-01'
  });
};

// In Parent:
const addTodo = (todoData) => {
  setTodos([...todos, {
    id: Date.now(),
    ...todoData,
    completed: false,
    createdAt: new Date().toISOString(),
  }]);
};
```

## Benefits of This Architecture

### Separation of Concerns
- **Parent** handles business logic and state management
- **Child** focuses on UI and user input

### Reusability
- `AddTodoForm` can be reused in other parts of the app
- Can easily create multiple instances with different callbacks

### Maintainability
- Changes to form UI don't affect parent logic
- Each component has a clear, focused responsibility

### Testability
- Can test `AddTodoForm` independently by passing mock functions
- Can test `TodoListPro` by mocking child components

## Example Flow

1. User types "Buy milk" in the form
2. User selects category "shopping" and priority "high"
3. User clicks "Add Task" button
4. `AddTodoForm` calls `handleSubmit()`
5. `handleSubmit()` calls `onAddTodo({ text: 'Buy milk', category: 'shopping', ... })`
6. This triggers `addTodo()` in `TodoListPro`
7. `TodoListPro` updates its `todos` state
8. React re-renders and the new todo appears in the list

## Visual Representation

```
┌─────────────────────────────────────────────┐
│           TodoListPro (Parent)              │
│                                             │
│  State:                                     │
│  - todos: []                                │
│  - darkMode: false                          │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │   AddTodoForm (Child)                 │ │
│  │                                       │ │
│  │   Props received:                     │ │
│  │   - onAddTodo (function)              │ │
│  │   - darkMode (boolean)                │ │
│  │                                       │ │
│  │   Local State:                        │ │
│  │   - input: ""                         │ │
│  │   - category: "personal"              │ │
│  │   - priority: "medium"                │ │
│  │   - dueDate: ""                       │ │
│  │                                       │ │
│  │   [Input field]                       │ │
│  │   [Category dropdown]                 │ │
│  │   [Priority dropdown]                 │ │
│  │   [Date picker]                       │ │
│  │   [Add Task button] ──────────────────┼─┼──> Calls onAddTodo()
│  │                                       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  addTodo() receives data ◄──────────────────┘
│  Updates todos state
│  React re-renders
└─────────────────────────────────────────────┘
```

## Key Principles

1. **Single Source of Truth**: The parent (`TodoListPro`) owns the todos data
2. **Props are Read-Only**: Child cannot modify props directly
3. **Callbacks for Communication**: Child uses callbacks to request changes
4. **Encapsulation**: Each component manages its own concerns
5. **Composition**: Building complex UIs from simple, focused components
