import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Check, X, Search, Filter, Calendar, Moon, Sun, Download, Upload, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import AddTodoForm from './AddTodoForm';
import {
  AppContainer,
  MaxWidthContainer,
  Header,
  HeaderTop,
  HeaderContent,
  Title,
  Subtitle,
  DarkModeButton,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  Card,
  Input,
  FilterHeader,
  FilterTitle,
  ToggleButton,
  SearchWrapper,
  FilterButtonGroup,
  FilterButton,
  ControlBar,
  ControlGroup,
  SmallButton,
  TodoList,
  TodoItem,
  TodoContent,
  Checkbox,
  TodoTextArea,
  TodoText,
  TodoBadges,
  Badge,
  TodoActions,
  IconButton,
  EditInput,
  EditActions,
  EmptyState,
  HiddenInput
} from './TodoListPro.styles';

export default function TodoListPro() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mark as loaded after first render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos:', error);
      }
    }
  }, [todos, isLoaded]);

  // Save dark mode to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      } catch (error) {
        console.error('Failed to save dark mode:', error);
      }
    }
  }, [darkMode, isLoaded]);

  const addTodo = (todoData) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todoData.text,
        completed: false,
        category: todoData.category,
        priority: todoData.priority,
        dueDate: todoData.dueDate,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    const trimmedText = editText?.trim();
    if (trimmedText) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: trimmedText } : todo
        )
      );
    }
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const markAllComplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const markAllIncomplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: false })));
  };

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTodos([]);
    }
  };

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle direction if clicking same sort
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort type, default to ascending
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  const exportTodos = () => {
    try {
      const dataStr = JSON.stringify(todos, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export todos');
    }
  };

  const importTodos = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result);
          if (Array.isArray(imported)) {
            setTodos(imported);
            alert('Todos imported successfully!');
          } else {
            alert('Invalid file format');
          }
        } catch (error) {
          alert('Failed to import todos');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  // Filter and search logic
  const filteredTodos = todos.filter((todo) => {
    const isPriorityFilter = ['high', 'medium', 'low'].includes(filter);
    const isCategoryFilter = ['work', 'personal', 'shopping', 'health'].includes(filter);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed) ||
      (isPriorityFilter && filter === todo.priority && !todo.completed) ||
      (isCategoryFilter && filter === todo.category);

    const matchesSearch = todo.text
      .toLowerCase()
      .includes((searchTerm || '').toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Sort logic
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      }
      case 'alphabetical':
        comparison = a.text.localeCompare(b.text);
        break;
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = new Date(a.dueDate) - new Date(b.dueDate);
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Stats
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    high: todos.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' };
      case 'medium':
        return { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' };
      case 'low':
        return { bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' };
      default:
        return { bg: '#e5e7eb', color: '#374151', border: '#d1d5db' };
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'work':
        return { bg: '#dbeafe', color: '#1e40af' };
      case 'personal':
        return { bg: '#e9d5ff', color: '#6b21a8' };
      case 'shopping':
        return { bg: '#fce7f3', color: '#9f1239' };
      case 'health':
        return { bg: '#d1fae5', color: '#065f46' };
      default:
        return { bg: '#e5e7eb', color: '#374151' };
    }
  };

  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
  };

  return (
    <AppContainer $darkMode={darkMode}>
      <MaxWidthContainer>
        {/* Header */}
        <Header $darkMode={darkMode}>
          <HeaderTop>
            <HeaderContent>
              <Title $darkMode={darkMode}>Pro Todo List</Title>
              <Subtitle $darkMode={darkMode}>Organize your tasks with style and efficiency</Subtitle>
            </HeaderContent>
            <DarkModeButton $darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? 'Light' : 'Dark'} Mode
            </DarkModeButton>
          </HeaderTop>
        </Header>

        {/* Stats Dashboard */}
        <StatsGrid>
          <StatCard $darkMode={darkMode}>
            <StatValue $color="#667eea">{stats.total}</StatValue>
            <StatLabel $darkMode={darkMode}>Total Tasks</StatLabel>
          </StatCard>
          <StatCard $darkMode={darkMode}>
            <StatValue $color="#48bb78">{stats.completed}</StatValue>
            <StatLabel $darkMode={darkMode}>Completed</StatLabel>
          </StatCard>
          <StatCard $darkMode={darkMode}>
            <StatValue $color="#4299e1">{stats.active}</StatValue>
            <StatLabel $darkMode={darkMode}>Active</StatLabel>
          </StatCard>
          <StatCard $darkMode={darkMode}>
            <StatValue $color="#f56565">{stats.high}</StatValue>
            <StatLabel $darkMode={darkMode}>High Priority</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Add Todo Form */}
        <AddTodoForm onAddTodo={addTodo} darkMode={darkMode} />

        {/* Filters and Search */}
        <Card $darkMode={darkMode}>
          <FilterHeader>
            <FilterTitle $darkMode={darkMode}>Filters & Search</FilterTitle>
            <ToggleButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} />
              {showFilters ? 'Hide' : 'Show'}
            </ToggleButton>
          </FilterHeader>

          {showFilters && (
            <>
              <SearchWrapper $darkMode={darkMode}>
                <Search size={20} />
                <Input
                  type="text"
                  value={searchTerm || ''}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  $darkMode={darkMode}
                />
              </SearchWrapper>

              <FilterButtonGroup>
                {['all', 'active', 'completed', 'high', 'medium', 'low', 'work', 'personal', 'shopping', 'health'].map((f) => (
                  <FilterButton
                    key={f}
                    $active={filter === f}
                    $darkMode={darkMode}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </FilterButton>
                ))}
              </FilterButtonGroup>
            </>
          )}
        </Card>

        {/* Bulk Actions & Sort */}
        {todos.length > 0 && (
          <Card $darkMode={darkMode}>
            <ControlBar>
              <ControlGroup>
                <SmallButton
                  $darkMode={darkMode}
                  onClick={() => handleSort('date')}
                  title="Sort by date (click to toggle direction)"
                  $variant={sortBy === 'date' ? 'success' : ''}
                >
                  {sortBy === 'date' ? (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />) : <ArrowUpDown size={16} />}
                  Date
                </SmallButton>
                <SmallButton
                  $darkMode={darkMode}
                  onClick={() => handleSort('priority')}
                  title="Sort by priority (click to toggle direction)"
                  $variant={sortBy === 'priority' ? 'success' : ''}
                >
                  {sortBy === 'priority' ? (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />) : <ArrowUpDown size={16} />}
                  Priority
                </SmallButton>
                <SmallButton
                  $darkMode={darkMode}
                  onClick={() => handleSort('alphabetical')}
                  title="Sort alphabetically (click to toggle direction)"
                  $variant={sortBy === 'alphabetical' ? 'success' : ''}
                >
                  {sortBy === 'alphabetical' ? (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />) : <ArrowUpDown size={16} />}
                  A-Z
                </SmallButton>
                <SmallButton
                  $darkMode={darkMode}
                  onClick={() => handleSort('dueDate')}
                  title="Sort by due date (click to toggle direction)"
                  $variant={sortBy === 'dueDate' ? 'success' : ''}
                >
                  {sortBy === 'dueDate' ? (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />) : <ArrowUpDown size={16} />}
                  Due Date
                </SmallButton>
              </ControlGroup>

              <ControlGroup>
                <SmallButton $variant="success" onClick={markAllComplete}>
                  <Check size={16} />
                  Mark All
                </SmallButton>
                <SmallButton $darkMode={darkMode} onClick={markAllIncomplete}>
                  <X size={16} />
                  Unmark All
                </SmallButton>
                <SmallButton
                  $variant="danger"
                  onClick={deleteCompleted}
                  disabled={stats.completed === 0}
                >
                  <Trash2 size={16} />
                  Delete Done
                </SmallButton>
                <SmallButton $variant="danger" onClick={clearAll}>
                  <Trash2 size={16} />
                  Clear All
                </SmallButton>
              </ControlGroup>
            </ControlBar>

            <ControlBar>
              <ControlGroup>
                <SmallButton $darkMode={darkMode} onClick={exportTodos}>
                  <Download size={16} />
                  Export
                </SmallButton>
                <SmallButton
                  $darkMode={darkMode}
                  onClick={() => document.getElementById('importFile').click()}
                >
                  <Upload size={16} />
                  Import
                </SmallButton>
                <HiddenInput
                  id="importFile"
                  type="file"
                  accept=".json"
                  onChange={importTodos}
                />
              </ControlGroup>
            </ControlBar>
          </Card>
        )}

        {/* Todo List */}
        <Card $darkMode={darkMode}>
          <FilterTitle $darkMode={darkMode} style={{ marginBottom: '1rem' }}>
            Tasks ({sortedTodos.length})
          </FilterTitle>

          {sortedTodos.length === 0 ? (
            <EmptyState $darkMode={darkMode}>
              <p>No tasks found</p>
              <p>Add a new task or adjust your filters</p>
            </EmptyState>
          ) : (
            <TodoList>
              {sortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  $completed={todo.completed}
                  $darkMode={darkMode}
                >
                  {editId === todo.id ? (
                    <TodoContent>
                      <EditInput
                        type="text"
                        value={editText || ''}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        $darkMode={darkMode}
                        maxLength={200}
                        autoFocus
                      />
                      <EditActions>
                        <IconButton
                          onClick={saveEdit}
                          $color="#48bb78"
                          $hoverBg="#c6f6d5"
                          title="Save"
                        >
                          <Check size={18} />
                        </IconButton>
                        <IconButton
                          onClick={cancelEdit}
                          $color="#718096"
                          $hoverBg="#e2e8f0"
                          title="Cancel"
                        >
                          <X size={18} />
                        </IconButton>
                      </EditActions>
                    </TodoContent>
                  ) : (
                    <TodoContent>
                      <Checkbox
                        $checked={todo.completed}
                        $darkMode={darkMode}
                        onClick={() => toggleComplete(todo.id)}
                        aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
                      >
                        {todo.completed && <Check size={14} />}
                      </Checkbox>

                      <TodoTextArea>
                        <TodoText $completed={todo.completed} $darkMode={darkMode}>
                          {todo.text}
                        </TodoText>

                        <TodoBadges>
                          <Badge
                            $bg={getCategoryColor(todo.category).bg}
                            $color={getCategoryColor(todo.category).color}
                          >
                            {todo.category}
                          </Badge>
                          <Badge
                            $bg={getPriorityColor(todo.priority).bg}
                            $color={getPriorityColor(todo.priority).color}
                            $border={getPriorityColor(todo.priority).border}
                          >
                            {todo.priority}
                          </Badge>
                          {todo.dueDate && (
                            <Badge
                              $bg={isOverdue(todo.dueDate) ? '#fee2e2' : '#f3f4f6'}
                              $color={isOverdue(todo.dueDate) ? '#991b1b' : '#374151'}
                            >
                              <Calendar size={12} />
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </TodoBadges>
                      </TodoTextArea>

                      <TodoActions>
                        <IconButton
                          onClick={() => startEdit(todo)}
                          $color="#4299e1"
                          $hoverBg="#bee3f8"
                          $darkMode={darkMode}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteTodo(todo.id)}
                          $color="#f56565"
                          $hoverBg="#fed7d7"
                          $darkMode={darkMode}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </TodoActions>
                    </TodoContent>
                  )}
                </TodoItem>
              ))}
            </TodoList>
          )}
        </Card>
      </MaxWidthContainer>
    </AppContainer>
  );
}
