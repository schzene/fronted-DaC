export interface Artifact {
  id: number;
  name: string;
  category: string;
  description: string;
  similarity_percent: number;
}

export interface RecognitionResult {
  code: number;
  message: string;
  data: {
    status: 'exact_match' | 'candidates';
    result?: Artifact;
    results?: Artifact[];
  };
}

export interface CategoriesResponse {
  code: number;
  data: string[];
}

export interface UploadState {
  file: File | null;
  preview: string | null;
  isUploading: boolean;
  result: RecognitionResult | null;
  error: string | null;
}
