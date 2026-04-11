import axios from 'axios';
import { RecognitionResult, CategoriesResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-dc.0xc0de.top:34859';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  if (API_KEY) {
    config.headers['X-API-Key'] = API_KEY;
    config.headers['Authorization'] = `Bearer ${API_KEY}`;
  }
  return config;
});

export const recognizeArtifact = async (
  file: File
): Promise<RecognitionResult> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post(
    '/api/v1/recognize',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get<CategoriesResponse>('/api/v1/categories');
  return response.data;
};

export default api;
