export * from './automation'; 

// ユーザー関連
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  }
  
  // 連絡先関連
  export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone?: string;
    companyId?: string;
    company?: Company;
    position?: string;
    tags: string[];
    lastContactedAt?: string;
    status: 'active' | 'inactive' | 'lead';
    createdAt: string;
    updatedAt: string;
    assignedTo?: string;
    notes?: string;
  }
  
  // 会社関連
  export interface Company {
    id: string;
    name: string;
    domain?: string;
    address?: string;
    description?: string;
    industry?: string;
    size?: string;
    website?: string;
    logo?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // 取引関連
  export interface Deal {
    id: string;
    title: string;
    stage: 'new' | 'negotiation' | 'contract' | 'lost';
    amount: number;
    currency: string;
    probability: number;
    companyId: string;
    company?: Company;
    contactIds: string[];
    contacts?: Contact[];
    assignedTo?: string;
    closingDate?: string;
    createdAt: string;
    updatedAt: string;
    notes?: string;
  }
  
  // メール関連
  export interface Email {
    id: string;
    subject: string;
    body: string;
    sender: string;
    recipients: string[];
    sentAt: string;
    read: boolean;
    threadId: string;
    contactIds: string[];
    attachments?: Attachment[];
    createdAt: string;
  }
  
  export interface Attachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }
  
  // 予定関連
  export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    location?: string;
    description?: string;
    attendees: string[];
    contactIds: string[];
    createdAt: string;
    updatedAt: string;
    color?: string;
  }
  
  // タイムライン項目
  export interface TimelineItem {
    id: string;
    type: 'email' | 'event' | 'note' | 'task';
    title: string;
    description?: string;
    date: string;
    relatedTo?: {
      type: 'contact' | 'company' | 'deal';
      id: string;
      name: string;
    }|null;
    status?: string;
    createdBy?: string;
  }
  
  // タスク関連
  export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: 'pending' | 'completed' | 'overdue';
    priority: 'low' | 'medium' | 'high';
    assignedTo?: string;
    relatedTo?: {
      type: 'contact' | 'company' | 'deal';
      id: string;
    }|null;
    createdAt: string;
    updatedAt: string;
  }
  
  // AI関連
  export interface AISummary {
    text: string;
    generatedAt: string;
  }
  
  export interface AINextAction {
    actionText: string;
    generatedAt: string;
  }
  
  // ページネーション
  export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
  }
  
  // フィルター
  export interface FilterParams {
    search?: string;
    dateRange?: {
      start: string;
      end: string;
    };
    assignedTo?: string[];
    tags?: string[];
    status?: string[];
  }
  
  // ソート
  export interface SortParams {
    field: string;
    direction: 'asc' | 'desc';
  }
  
  // API レスポンス
  export interface ApiResponse<T> {
    data: T;
    pagination?: PaginationParams;
    message?: string;
    success: boolean;
  }
  
  // ディールステージの型 (追加)
  export type DealStage = 'new' | 'negotiation' | 'contract' | 'lost';

  // ユーザー関連
  export interface User { 
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  }
// 連絡先関連
  export interface Contact { 
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone?: string;
    companyId?: string;
    company?: Company;
    position?: string;
    tags: string[];
    lastContactedAt?: string;
    status: 'active' | 'inactive' | 'lead';
    createdAt: string;
    updatedAt: string;
    assignedTo?: string;
    notes?: string;
  }
// 会社関連
  export interface Company { 
    id: string;
    name: string;
    domain?: string;
    address?: string;
    description?: string;
    industry?: string;
    size?: string;
    website?: string;
    logo?: string;
    createdAt: string;
    updatedAt: string;
  }
// 取引関連
// export type DealStage = 'new' | 'negotiation' | 'contract' | 'lost'; // automation.ts に移した場合
  export interface Deal {
    id: string;
    title: string;
    stage: DealStage; // automation.ts からインポートされる DealStage を使用
    amount: number;
    currency: string;
    probability: number;
    companyId: string;
    company?: Company;
    contactIds: string[];
    contacts?: Contact[];
    assignedTo?: string;
    closingDate?: string;
    createdAt: string;
    updatedAt: string;
    notes?: string;
    order?: number;
  }