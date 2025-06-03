// src/components/automations/WorkflowBuilder.tsx
import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
  NodeTypes,
  EdgeTypes, // EdgeTypes をインポート
  Panel, // Panel をインポート (今回は未使用)
  MarkerType,
  Position,
  ReactFlowInstance, // ReactFlowInstance をインポート
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Input, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';
import {
  Workflow,
  RFNode,
  RFEdge,
  WorkflowNodeData,
  NodeType, // NodeType をインポート
  // availableTriggers, // WorkflowBuilder内では直接使用しない
  // availableActions,  // WorkflowBuilder内では直接使用しない
} from '../../types'; // 型定義
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge'; // カスタムエッジを使用する場合
// import NodePalette from './NodePalette'; // NodePaletteのimportを削除
import WorkflowForm from './WorkflowForm'; // 設定フォーム

interface WorkflowBuilderProps {
  workflow: Workflow;
  onSave: (workflow: Workflow) => void;
  isCreatingNew: boolean;
  onSimulateRun: () => void;
}

const nodeTypes: NodeTypes = {
  triggerNode: CustomNode,
  actionNode: CustomNode,
  switchNode: CustomNode,
  // conditionNode: CustomNode, // 必要に応じて
};

const edgeTypes: EdgeTypes = { // カスタムエッジを使う場合は登録
  custom: CustomEdge,
};

const initialNodes: Node<WorkflowNodeData>[] = [];
const initialEdges: Edge[] = [];

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ workflow, onSave, isCreatingNew, onSimulateRun }) => {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useState<Node<WorkflowNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [selectedNodeForForm, setSelectedNodeForForm] = useState<RFNode | null>(null);

  useEffect(() => {
    // workflowオブジェクトが変更されたら、内部の状態をリセット/更新
    setNodes(workflow.nodes || initialNodes);
    setEdges(workflow.edges || initialEdges);
    setWorkflowName(workflow.name);
    setWorkflowDescription(workflow.description || '');
    setSelectedNodeForForm(null); // ワークフローが切り替わったら選択を解除
    if (rfInstance) {
      // setTimeout(() => rfInstance.fitView(), 0); // 少し遅延させてfitViewを呼ぶと安定することがある
    }
  }, [workflow, rfInstance]); // rfInstanceも依存配列に追加

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      // ノード選択の変更をハンドル
      const selectChange = changes.find(c => c.type === 'select');
      if (selectChange && selectChange.type === 'select') {
        if (selectChange.selected) {
          const node = nodes.find(n => n.id === selectChange.id);
          setSelectedNodeForForm(node || null);
        } else {
          // 選択解除されたノードが現在のselectedNodeForFormと同じならクリア
          if (selectedNodeForForm && selectedNodeForForm.id === selectChange.id) {
            setSelectedNodeForForm(null);
          }
        }
      }
      // ノード削除時にも選択を解除
      const removeChange = changes.find(c => c.type === 'remove');
      if (removeChange && removeChange.type === 'remove') {
          if (selectedNodeForForm && selectedNodeForForm.id === removeChange.id) {
              setSelectedNodeForForm(null);
          }
      }
    },
    [setNodes, nodes, selectedNodeForForm] // nodes と selectedNodeForForm を依存配列に追加
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(
        {
          ...connection,
          type: 'custom', // カスタムエッジタイプ
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' }, // Hero UIのsuccessカラーに合わせるなど
          style: { stroke: '#10B981', strokeWidth: 2 },
        }, eds
      ));
    },
    [setEdges]
  );

  const handleSave = () => {
    onSave({
      ...workflow,
      name: workflowName,
      description: workflowDescription,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    });
  };

  const getId = () => `dndnode_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation(); // 親要素へのイベント伝播を止める

      const type = event.dataTransfer.getData('application/reactflow-nodetype') as NodeType | string;
      const label = event.dataTransfer.getData('application/reactflow-label') || type;
      const icon = event.dataTransfer.getData('application/reactflow-icon') || undefined; // undefined許容
      const description = event.dataTransfer.getData('application/reactflow-description') || undefined; // undefined許容

      if (typeof type === 'undefined' || !type || !rfInstance) {
        console.warn("Drop event missing type or ReactFlow instance.");
        return;
      }

      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeData: WorkflowNodeData = {
        label,
        type: type as NodeType, // 型アサーション
        icon,
        description,
      };

      const newNode: Node<WorkflowNodeData> = {
        id: getId(),
        type: `${type}Node`, // CustomNodeで定義したタイプ名 (例: triggerNode)
        position,
        data: newNodeData,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance, setNodes] // rfInstance と setNodes を依存配列に追加
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleNodeConfigChange = (nodeId: string, newConfig: Partial<WorkflowNodeData>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = { ...node, data: { ...node.data, ...newConfig } };
          // フォームで選択されているノードも更新
          if (selectedNodeForForm && selectedNodeForForm.id === nodeId) {
            setSelectedNodeForForm(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  };

  return (
    <div className="h-full flex flex-col bg-content2"> {/* 全体の背景色 */}
      <header className="p-3 border-b border-divider flex justify-between items-center bg-content1 sticky top-0 z-10">
        <div className="flex-1 mr-4">
            <Input
                value={workflowName}
                onValueChange={setWorkflowName}
                placeholder="ワークフロー名"
                className="text-base font-semibold" // 少しフォントサイズ調整
                variant="flat"
                size="md"
            />
            <Textarea
                value={workflowDescription}
                onValueChange={setWorkflowDescription}
                placeholder="ワークフローの説明 (任意)"
                minRows={1}
                size="sm"
                className="mt-1 text-xs"
                variant="flat"
            />
        </div>
        <div className="flex gap-2 items-center"> {/* items-center を追加 */}
            <Button variant="flat" onPress={onSimulateRun} startContent={<Icon icon="lucide:play-circle" className="w-4 h-4"/>} size="sm">
                テスト実行
            </Button>
          <Button color="primary" onPress={handleSave} startContent={<Icon icon="lucide:save" className="w-4 h-4"/>} size="sm">
            {isCreatingNew ? '作成' : '保存'}
          </Button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {/* <NodePalette /> NodePaletteの呼び出しを削除 */}
        <div className="flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onInit={setRfInstance}
                fitView={nodes.length > 0} // ノードがある場合のみfitView
                fitViewOptions={{ padding: 0.2, minZoom: 0.5, maxZoom: 2 }}
                className="bg-dots"
                defaultEdgeOptions={{ // 新規エッジのデフォルト
                    type: 'custom',
                    animated: true,
                    markerEnd: {type: MarkerType.ArrowClosed, color: '#10B981'},
                    style: {stroke: '#10B981', strokeWidth: 2},
                }}
                onNodeClick={(_event, node) => setSelectedNodeForForm(node)}
                onPaneClick={() => setSelectedNodeForForm(null)} // キャンバスのクリックで選択解除
                deleteKeyCode={['Backspace', 'Delete']} // 削除キー
                selectionMode={'partial' as any} // 'partial' | 'full' | 'none' (型エラーが出る場合anyで回避)
            >
                <Controls />
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background gap={16} color="#D1D5DB" variant={'dots' as any} /> {/* ドットの色を調整 */}
            </ReactFlow>
        </div>
        {/* 設定フォームを右側に表示 */}
        {selectedNodeForForm && (
            <div className="w-80 border-l border-divider bg-content1 h-full overflow-y-auto">
                 <WorkflowForm
                    selectedNode={selectedNodeForForm}
                    onNodeConfigChange={handleNodeConfigChange}
                    onClose={() => setSelectedNodeForForm(null)}
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;