export interface Artifact {
  id: number;
  name: string;
  category: string;
  description: string;
  image?: string;
  similarity_percent?: number;
}

export interface RecognitionResult {
  code: number;
  message: string;
  data: {
    status: 'exact_match' | 'candidates';
    results?: Artifact[];
  };
}

export interface CategoriesResponse {
  code: number;
  data: {
    id: string;
    name: string;
    dynasty_id: string;
    description: string;
    artifact_count: number;
  }[];
}

export interface UploadState {
  file: File | null;
  preview: string | null;
  isUploading: boolean;
  result: RecognitionResult | null;
  error: string | null;
}

export interface DynastyCategory {
  id: string;
  name: string;
  count: string;
}

export interface ArtifactDetail extends Artifact {
  image?: string;
  dynasty?: string;
  period?: string;
  material?: string;
  size?: string;
  location?: string;
}
