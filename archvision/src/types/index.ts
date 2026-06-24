export interface Generation {
  id: string;
  sessionId: string;
  prompt: string;
  styles: string[];
  imagePath: string;
  createdAt: string;
}

export type StylePreset =
  | 'Brutalist'
  | 'Minimalist Japanese'
  | 'Bauhaus'
  | 'Futuristic'
  | 'Art Deco'
  | 'Organic';

export type ErrorType = 'timeout' | 'invalid_prompt' | 'api_error' | null;

export interface GenerateResponse {
  id: string;
  imagePath: string;
  prompt: string;
}

export interface ApiError {
  error: 'timeout' | 'invalid_prompt' | 'api_error';
  message: string;
}
