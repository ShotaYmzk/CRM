import { ApiResponse } from '../types';

// 基本的なフェッチャー関数
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error('APIリクエストエラーが発生しました');
    throw error;
  }
  
  return response.json();
};

// POST リクエスト
export const postData = async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'APIリクエストエラーが発生しました');
  }
  
  return response.json();
};

// PUT リクエスト
export const putData = async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'APIリクエストエラーが発生しました');
  }
  
  return response.json();
};

// DELETE リクエスト
export const deleteData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'APIリクエストエラーが発生しました');
  }
  
  return response.json();
};

// API URLを構築する関数
export const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(`/api${endpoint}`, window.location.origin);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => url.searchParams.append(key, item));
        } else if (typeof value === 'object') {
          url.searchParams.append(key, JSON.stringify(value));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });
  }
  
  return url.toString();
};

// IndexedDBとの同期
export const syncWithIndexedDB = async (since: string): Promise<void> => {
  try {
    const response = await fetch(`/api/sync?since=${since}`);
    if (!response.ok) {
      throw new Error('同期に失敗しました');
    }
    
    const data = await response.json();
    
    // IndexedDBに保存する処理は実際の実装で追加
    console.log('同期データ:', data);
  } catch (error) {
    console.error('同期エラー:', error);
    throw error;
  }
};

// AI関連のAPI
export const aiSummarize = async (text: string): Promise<string> => {
  try {
    const response = await postData<{ summary: string }>('/api/ai/summarize', { text });
    return response.data.summary;
  } catch (error) {
    console.error('AI要約エラー:', error);
    throw error;
  }
};

export const aiNextAction = async (context: any): Promise<string> => {
  try {
    const response = await postData<{ actionText: string }>('/api/ai/next-action', context);
    return response.data.actionText;
  } catch (error) {
    console.error('AI次アクション提案エラー:', error);
    throw error;
  }
};
