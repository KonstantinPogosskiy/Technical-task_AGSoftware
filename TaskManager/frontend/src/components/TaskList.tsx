import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Task } from '../types/task';
import { taskApi } from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const limit = 5;

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await taskApi.getTasks(page, limit, search);
      setTasks(response.tasks);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при загрузке задач');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const handleCreateTask = useCallback(() => {
    setEditingTask(null);
    setOpenDialog(true);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setEditingTask(null);
  }, []);

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const handleSaveTask = useCallback(async (title: string, description: string) => {
    try {
      if (editingTask) {
        const updatedTask = await taskApi.updateTask(editingTask.id, { title, description }) as Task;
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      } else {
        await taskApi.createTask({ title, description });
        if (page !== 1) {
          setPage(1);
        } else {
          fetchTasks();
        }
      }
      handleCloseDialog();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при сохранении задачи');
    }
  }, [editingTask, page, fetchTasks, handleCloseDialog]);

  const handleToggleComplete = useCallback(async (task: Task) => {
    try {
      const updatedTask = await taskApi.updateTask(task.id, { completed: !task.completed }) as Task;
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Ошибка при обновлении задачи');
    }
  }, []);

  const handleDeleteTask = useCallback(async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      return;
    }
    try {
      await taskApi.deleteTask(id);
      const currentTasksCount = tasks.length;

      if (currentTasksCount === 1 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      } else {
        fetchTasks();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при удалении задачи');
    }
  }, [page, tasks.length, fetchTasks]);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            fullWidth={isMobile}
            placeholder="Поиск по названию..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{ minWidth: isMobile ? '100%' : 'auto' }}
          >
            Найти
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateTask}
            sx={{ minWidth: isMobile ? '100%' : 'auto' }}
          >
            Добавить задачу
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : tasks.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 4 }}>
            {search ? 'Задачи не найдены' : 'Нет задач. Создайте первую задачу!'}
          </Typography>
        ) : (
          <>
            <List>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </List>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      <TaskForm
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </Box>
  );
};

export default TaskList;
