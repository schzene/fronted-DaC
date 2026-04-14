import axios from 'axios';
import { RecognitionResult, CategoriesResponse, ArtifactDetail } from '@/types';

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

export interface DynastyInfo {
  id: string;
  name: string;
  description: string;
  category_count: number;
  artifact_count: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  dynasty_id: string;
  description: string;
  artifact_count: number;
}

export interface ArtifactListItem {
  id: number;
  name: string;
  category_id: string;
  dynasty_id: string;
  description: string;
  image: string | null;
  images: string[];
  category_name: string;
  dynasty_name: string;
}

export interface ArtifactDetailFull extends ArtifactDetail {
  id: number;
  category_id: string;
  dynasty_id: string;
  category_name: string;
  dynasty_name: string;
  images: string[];
  related: Array<{
    id: number;
    name: string;
    category_id: string;
    image: string | null;
  }>;
}

export const getDynasties = async (): Promise<{ code: number; message: string; data: DynastyInfo[] }> => {
  const response = await api.get('/api/v1/dynasties');
  return response.data;
};

export const getDynastyDetail = async (dynastyId: string): Promise<{
  code: number;
  message: string;
  data: DynastyInfo & { categories: CategoryInfo[] };
}> => {
  const response = await api.get(`/api/v1/dynasties/${dynastyId}`);
  return response.data;
};

export const getCategoryDetail = async (categoryId: string): Promise<{
  code: number;
  message: string;
  data: CategoryInfo & { dynasty_name: string; artifacts: ArtifactListItem[] };
}> => {
  const response = await api.get(`/api/v1/categories/${categoryId}`);
  return response.data;
};

export const getArtifactDetail = async (id: number): Promise<{
  code: number;
  message: string;
  data: ArtifactDetailFull;
}> => {
  const response = await api.get(`/api/v1/artifacts/${id}`);
  return response.data;
};

export const getArtifacts = async (params?: { dynasty_id?: string; category_id?: string }): Promise<{
  code: number;
  message: string;
  data: ArtifactListItem[];
}> => {
  const response = await api.get('/api/v1/artifacts', { params });
  return response.data;
};

export default api;
