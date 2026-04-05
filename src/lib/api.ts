import axios from 'axios';
import { RecognitionResult, CategoriesResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const recognizeArtifact = async (
  file: File,
  k: number = 3,
  threshold: number = 85
): Promise<RecognitionResult> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post<RecognitionResult>(
    `/api/v1/recognize?k=${k}&threshold=${threshold}`,
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
