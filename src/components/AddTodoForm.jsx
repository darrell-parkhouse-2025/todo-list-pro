import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Card,
  Input,
  FormGrid,
  FormGroup,
  Label,
  Select,
  Button
} from './TodoListPro.styles';

export default function AddTodoForm({ onAddTodo, darkMode }) {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    const trimmedInput = input?.trim();
    if (trimmedInput) {
      onAddTodo({
        text: trimmedInput,
        category: category || 'personal',
        priority: priority || 'medium',
        dueDate: dueDate || '',
      });
      setInput('');
      setDueDate('');
    }
  };

  return (
    <Card $darkMode={darkMode}>
      <Input
        type="text"
        value={input || ''}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="What needs to be done?"
        $darkMode={darkMode}
        maxLength={200}
      />

      <FormGrid>
        <FormGroup>
          <Label $darkMode={darkMode}>Category</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            $darkMode={darkMode}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label $darkMode={darkMode}>Priority</Label>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            $darkMode={darkMode}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label $darkMode={darkMode}>Due Date</Label>
          <Input
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
            $darkMode={darkMode}
            style={{ padding: '0.5rem' }}
          />
        </FormGroup>
      </FormGrid>

      <Button onClick={handleSubmit} disabled={!input?.trim()}>
        <Plus size={20} />
        Add Task
      </Button>
    </Card>
  );
}
