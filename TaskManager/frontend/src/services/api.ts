import axios from 'axios';
import { CreateTaskDto, UpdateTaskDto } from '../types/task';

const API_URL = process.env.API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const taskApi = {
  getTasks: async (page: number = 1, limit: number = 10, search: string = '') => {
    const res = await api.get('/tasks', {
      params: { page, limit, search },
    });
    return res.data;
  },

  createTask: async (data: CreateTaskDto) => {
    const res = await api.post('/tasks', data);
    return res.data;
  },

  updateTask: async (id: number, data: UpdateTaskDto) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
