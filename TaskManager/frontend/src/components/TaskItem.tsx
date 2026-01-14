import React, { memo } from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskItemProps } from '../types/task';

const TaskItem: React.FC<TaskItemProps> = memo(({ task, onToggleComplete, onDelete, onEdit }) => {
  
  const handleToggle = () => onToggleComplete(task);
  const handleDelete = () => onDelete(task.id);
  const handleEdit = () => onEdit(task);

  return (
    <ListItem
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        bgcolor: task.completed ? 'action.hover' : 'background.paper',
      }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleDelete}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={task.completed}
        onChange={handleToggle}
        sx={{ mr: 1 }}
      />
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
                cursor: 'pointer',
              }}
              onClick={handleEdit}
            >
              {task.title}
            </Typography>
            {task.completed && (
              <Chip label="Выполнено" size="small" color="success" />
            )}
          </Box>
        }
        secondary={
          <Box>
            {task.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  mb: 0.5,
                }}
              >
                {task.description}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Создано: {new Date(task.createdAt).toLocaleString('ru-RU')}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
