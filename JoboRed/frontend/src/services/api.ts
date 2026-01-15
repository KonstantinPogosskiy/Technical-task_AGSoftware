import axios from 'axios';
import { Vacancy, Favorite, VacancyFilters } from '../types/vacancy';

const API_URL = process.env.API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const vacanciesApi = {
  getAll: async (filters?: VacancyFilters): Promise<Vacancy[]> => {
    const response = await api.get<Vacancy[]>('/vacancies', { params: filters });
    return response.data;
  },

  getById: async (id: number): Promise<Vacancy> => {
    const response = await api.get<Vacancy>(`/vacancies/${id}`);
    return response.data;
  },
};

export const favoritesApi = {
  getAll: async (): Promise<Favorite[]> => {
    const response = await api.get<Favorite[]>('/favorites');
    return response.data;
  },

  add: async (vacancyId: number): Promise<Favorite> => {
    const response = await api.post<Favorite>('/favorites', { vacancyId });
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/favorites/${id}`);
  },
};

export default api;
