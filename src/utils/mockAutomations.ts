import { Workflow, WorkflowRun, RFNode, RFEdge, DealStage } from '../types'; // 型を正しくインポート
import { MarkerType } from 'reactflow'; // React Flow から MarkerType を直接インポート

// nodeDefaults は不要なので削除します
// const nodeDefaults = {
//     sourcePosition: 'bottom' as const,
//     targetPosition: 'top' as const,
// };

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: '新規リードへの自動タスク割り当て',
    description: '新しいリードが追加されたら、自動で初回連絡タスクを作成し、営業担当Aにアサインします。',
    isEnabled: true,
    triggerNodeId: 'trigger-1',
    nodes: [
      {
        id: 'trigger-1',
        type: 'triggerNode',
        position: { x: 50, y: 50 },
        data: { type: 'trigger', label: '新しいリード追加', icon: 'lucide:user-plus', description: 'リードが作成された時' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'action-1',
        type: 'actionNode',
        position: { x: 50, y: 200 },
        data: { type: 'action', label: '初回連絡タスク作成', icon: 'lucide:check-square', description: '担当: 営業A' },
        // ...nodeDefaults, // ← 削除
      },
    ],
    edges: [
      { id: 'e1-2', source: 'trigger-1', target: 'action-1', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    lastRunAt: new Date().toISOString(),
    runCount: 15,
  },
  {
    id: 'wf-2',
    name: 'ディール成約時のSlack通知',
    description: 'ディールのステージが "契約" になったら、営業チャンネルに通知します。',
    isEnabled: false,
    triggerNodeId: 'trigger-2',
    nodes: [
      {
        id: 'trigger-2',
        type: 'triggerNode',
        position: { x: 50, y: 50 },
        data: { type: 'trigger', label: 'ディールステージ変更', icon: 'lucide:briefcase', description: 'ステージが"契約"になった時' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'action-2',
        type: 'actionNode',
        position: { x: 50, y: 200 },
        data: { type: 'action', label: 'Slack通知', icon: 'lucide:send', description: '#sales チャンネルへ' },
        // ...nodeDefaults, // ← 削除
      },
    ],
    edges: [
      { id: 'e2-1', source: 'trigger-2', target: 'action-2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'wf-attio-like',
    name: 'リード自動評価 (Attio風)',
    description: '企業情報に基づいてリードの資金調達ステージを判断し、リストに追加します。',
    isEnabled: true,
    triggerNodeId: 'attio-trigger',
    nodes: [
      {
        id: 'attio-trigger', type: 'triggerNode', position: { x: 250, y: 25 },
        data: { type: 'trigger', label: 'Record command', icon: 'lucide:play', description: 'Trigger on a Company', status: 'triggered' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'attio-research', type: 'actionNode', position: { x: 250, y: 175 },
        data: { type: 'action', label: 'Research record', icon: 'lucide:search', description: 'Determine funding stage of company', status: 'completed' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'attio-switch', type: 'switchNode', position: { x: 250, y: 325 },
        data: { type: 'switch', label: 'Switch', icon: 'lucide:git-fork', description: 'No description', status: 'completed' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'attio-condition1-action', type: 'actionNode', position: { x: 50, y: 475 },
        data: { type: 'action', label: 'Add record to list', icon: 'lucide:list-plus', description: 'Add record to Seed Leads', status: 'running' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'attio-condition2-action', type: 'actionNode', position: { x: 250, y: 475 },
        data: { type: 'action', label: 'Add record to list', icon: 'lucide:list-plus', description: 'Add record to Series B Leads' },
        // ...nodeDefaults, // ← 削除
      },
      {
        id: 'attio-condition3-action', type: 'actionNode', position: { x: 450, y: 475 },
        data: { type: 'action', label: 'Add record to list', icon: 'lucide:list-plus', description: 'Add record to Series A Leads' },
        // ...nodeDefaults, // ← 削除
      },
    ],
    edges: [
      { id: 'e-attio-1', source: 'attio-trigger', target: 'attio-research', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e-attio-2', source: 'attio-research', target: 'attio-switch', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e-attio-3', source: 'attio-switch', sourceHandle: 'condition1', target: 'attio-condition1-action', label: 'Condition 1', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e-attio-4', source: 'attio-switch', sourceHandle: 'condition2', target: 'attio-condition2-action', label: 'Condition 2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e-attio-5', source: 'attio-switch', sourceHandle: 'condition3', target: 'attio-condition3-action', label: 'Condition 3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    ],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  }
];

export const mockWorkflowRuns: WorkflowRun[] = [
    { id: 'run-70', workflowId: 'wf-attio-like', workflowName: 'リード自動評価 (Attio風)', status: 'executing', startedAt: new Date().toISOString(), creditsConsumed: 0 },
    { id: 'run-69', workflowId: 'wf-attio-like', workflowName: 'リード自動評価 (Attio風)', status: 'completed', startedAt: new Date(Date.now() - 1000 * 30).toISOString(), completedAt: new Date().toISOString(), creditsConsumed: 15 },
    { id: 'run-68', workflowId: 'wf-attio-like', workflowName: 'リード自動評価 (Attio風)', status: 'completed', startedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), completedAt: new Date(Date.now() - 1000 * 60 * 1.5).toISOString(), creditsConsumed: 11 },
];