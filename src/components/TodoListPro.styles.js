import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.$darkMode
    ? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #ebf8ff 0%, #c3dafe 100%)'};
  padding: 2rem;
  transition: background 0.3s ease;
`;

export const MaxWidthContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

export const Header = styled.div`
  background: ${props => props.$darkMode ? '#2d3748' : 'white'};
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${props => props.$darkMode ? '#f7fafc' : '#2d3748'};
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.p`
  color: ${props => props.$darkMode ? '#cbd5e0' : '#718096'};
  margin: 0;
`;

export const DarkModeButton = styled.button`
  padding: 0.75rem;
  background: ${props => props.$darkMode ? '#4a5568' : '#f7fafc'};
  color: ${props => props.$darkMode ? '#fbbf24' : '#4a5568'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$darkMode ? '#718096' : '#e2e8f0'};
    transform: scale(1.05);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div`
  background: ${props => props.$darkMode ? '#2d3748' : 'white'};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: all 0.3s ease;
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.$color || '#667eea'};
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.$darkMode ? '#cbd5e0' : '#718096'};
  margin-top: 0.25rem;
`;

export const Card = styled.div`
  background: ${props => props.$darkMode ? '#2d3748' : 'white'};
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.$darkMode ? '#4a5568' : '#e2e8f0'};
  background: ${props => props.$darkMode ? '#1a202c' : 'white'};
  color: ${props => props.$darkMode ? '#f7fafc' : '#2d3748'};
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${props => props.$darkMode ? '#718096' : '#a0aec0'};
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.$darkMode ? '#e2e8f0' : '#4a5568'};
  margin-bottom: 0.5rem;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$darkMode ? '#4a5568' : '#e2e8f0'};
  background: ${props => props.$darkMode ? '#1a202c' : 'white'};
  color: ${props => props.$darkMode ? '#f7fafc' : '#2d3748'};
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const FilterTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.$darkMode ? '#f7fafc' : '#2d3748'};
  margin: 0;
`;

export const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  color: #667eea;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #764ba2;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.$darkMode ? '#718096' : '#a0aec0'};
  }

  input {
    padding-left: 2.5rem;
  }
`;

export const FilterButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$active
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : props.$darkMode ? '#1a202c' : '#f7fafc'};
  color: ${props => props.$active ? 'white' : props.$darkMode ? '#e2e8f0' : '#4a5568'};
  border: 2px solid ${props => props.$active ? 'transparent' : props.$darkMode ? '#4a5568' : '#e2e8f0'};
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    color: ${props => props.$active ? 'white' : '#667eea'};
  }
`;

export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ControlGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const SmallButton = styled.button`
  padding: 0.5rem 0.75rem;
  background: ${props => props.$variant === 'danger'
    ? '#f56565'
    : props.$variant === 'success'
    ? '#48bb78'
    : props.$darkMode ? '#4a5568' : '#e2e8f0'};
  color: ${props => props.$variant ? 'white' : props.$darkMode ? '#f7fafc' : '#2d3748'};
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TodoItem = styled.div`
  border: 2px solid ${props => props.$completed
    ? props.$darkMode ? '#4a5568' : '#e2e8f0'
    : props.$darkMode ? '#4a5568' : '#cbd5e0'};
  background: ${props => props.$completed
    ? props.$darkMode ? '#1a202c' : '#f7fafc'
    : props.$darkMode ? '#2d3748' : 'white'};
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => !props.$completed && '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }
`;

export const TodoContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const Checkbox = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  border: 2px solid ${props => props.$checked ? '#667eea' : props.$darkMode ? '#718096' : '#cbd5e0'};
  background: ${props => props.$checked ? '#667eea' : 'transparent'};
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 0.25rem;

  &:hover {
    border-color: #667eea;
    transform: scale(1.1);
  }

  svg {
    color: white;
  }
`;

export const TodoTextArea = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TodoText = styled.p`
  color: ${props => props.$completed
    ? props.$darkMode ? '#718096' : '#a0aec0'
    : props.$darkMode ? '#f7fafc' : '#2d3748'};
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  margin: 0;
  word-break: break-word;
`;

export const TodoBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${props => props.$bg || '#e2e8f0'};
  color: ${props => props.$color || '#2d3748'};
  border: ${props => props.$border ? `1px solid ${props.$border}` : 'none'};
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  color: ${props => props.$color || (props.$darkMode ? '#cbd5e0' : '#718096')};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$hoverBg || (props.$darkMode ? '#4a5568' : '#f7fafc')};
  }
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 2px solid ${props => props.$darkMode ? '#4a5568' : '#cbd5e0'};
  background: ${props => props.$darkMode ? '#1a202c' : 'white'};
  color: ${props => props.$darkMode ? '#f7fafc' : '#2d3748'};
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.$darkMode ? '#a0aec0' : '#718096'};

  p:first-child {
    font-size: 1.125rem;
    margin: 0 0 0.5rem 0;
  }

  p:last-child {
    font-size: 0.875rem;
    margin: 0;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
