// src/types/automation.ts
import { Node, Edge, MarkerType as RFMarkerType } from 'reactflow'; // MarkerTypeをインポート

// 基本的な型 (もしCompany, Contactなどが他で定義されていればそちらをインポート)
export interface Company { id: string; name: string; }
export interface Contact { id: string; fullName: string; }
// DealStage はここで定義するか、グローバルな型として index.ts で定義・エクスポート
export type DealStage = 'new' | 'negotiation' | 'contract' | 'lost';
export interface Deal { id: string; title: string; stage: DealStage }


export type NodeType = 'trigger' | 'action' | 'condition' | 'switch';

export interface WorkflowNodeData {
  label: string;
  type: NodeType;
  icon?: string;
  description?: string;
  config?: any;
  status?: 'completed' | 'running' | 'triggered' | 'failed' | 'pending';
}

export type RFNode = Node<WorkflowNodeData>;
export type RFEdge = Edge; // Edge型を直接使うか、必要なら拡張

// MarkerTypeを再エクスポート (もし他の場所でこのファイルからインポートしたい場合)
// ただし、通常は各ファイルで 'reactflow' から直接インポートする方が明確
export { RFMarkerType as MarkerType };


export interface WorkflowTrigger {
  id: string;
  type: string;
  name: string;
  description: string;
  configOptions?: any[];
}

export interface WorkflowAction {
  id: string;
  type: string;
  name: string;
  description: string;
  configOptions?: any[];
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  isEnabled: boolean;
  nodes: RFNode[];
  edges: RFEdge[];
  triggerNodeId?: string;
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
  runCount?: number;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowName: string;
  status: 'executing' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  creditsConsumed?: number;
  nodeStatuses?: { nodeId: string; status: WorkflowNodeData['status']; completedAt?: string }[];
}

export const availableTriggers: WorkflowTrigger[] = [
  { id: 't1', type: 'new_company', name: '新しい会社が追加された時', description: '企業がCRMに新規登録された際に発火します。'},
  { id: 't2', type: 'deal_stage_changed', name: 'ディールのステージが変更された時', description: 'ディールの進捗ステージが変わった際に発火します。'},
  { id: 't3', type: 'new_lead', name: '新しいリードが追加された時', description: '新しいリード（連絡先）が登録された際に発火します。'},
];

export const availableActions: WorkflowAction[] = [
  { id: 'a1', type: 'create_task', name: 'タスクを作成', description: '指定した担当者にタスクを割り当てます。'},
  { id: 'a2', type: 'send_slack_notification', name: 'Slackに通知', description: '指定チャンネルにメッセージを送信します。'},
  { id: 'a3', type: 'add_tag', name: 'タグを追加', description: '対象のレコードにタグを付与します。'},
  { id: 'a4', type: 'send_email', name: 'メールを送信', description: '定義済みテンプレートまたはカスタムメールを送信します。'},
  { id: 'a5', type: 'add_record_to_list', name: 'リストにレコードを追加', description: '指定されたリストにレコードを追加します。'},
];