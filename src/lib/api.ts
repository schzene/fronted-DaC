import axios from 'axios';
import { RecognitionResult, CategoriesResponse } from '@/types';

const API_BASE_URL = 'http://121.36.225.183:34859';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
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
