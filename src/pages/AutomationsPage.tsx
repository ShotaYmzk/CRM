// src/pages/AutomationsPage.tsx
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import { Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import WorkflowList from '../components/automations/WorkflowList';
import WorkflowBuilder from '../components/automations/WorkflowBuilder';
import RunHistoryPanel from '../components/automations/RunHistoryPanel';
import { Workflow, WorkflowRun } from '../types'; // 必要に応じて automation.ts から
import { mockWorkflows, mockWorkflowRuns } from '../utils/mockAutomations'; // モックデータ
import { addToast } from '@heroui/react'; // 通知用
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'; // インポート
import NodePalette from '../components/automations/NodePalette';

const AutomationsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows.length > 0 ? workflows[0] : null);
  const [runHistory, setRunHistory] = useState<WorkflowRun[]>(mockWorkflowRuns);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSelectWorkflow = (workflowId: string) => {
    const wf = workflows.find(w => w.id === workflowId);
    setSelectedWorkflow(wf || null);
    setIsCreatingNew(false);
  };

  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows(prevWorkflows =>
      prevWorkflows.map(wf =>
        wf.id === workflowId ? { ...wf, isEnabled: !wf.isEnabled } : wf
      )
    );
    const wf = workflows.find(w => w.id === workflowId);
    if (wf) {
        addToast({
            title: `ワークフロー "${wf.name}" が${!wf.isEnabled ? "有効" : "無効"}になりました。`,
            color: "success"
        })
    }
  };

  const handleSaveWorkflow = useCallback((updatedWorkflow: Workflow) => {
    setWorkflows(prev => {
      const index = prev.findIndex(wf => wf.id === updatedWorkflow.id);
      if (index > -1) {
        const newWorkflows = [...prev];
        newWorkflows[index] = updatedWorkflow;
        return newWorkflows;
      }
      return [...prev, updatedWorkflow]; // 新規作成の場合
    });
    setSelectedWorkflow(updatedWorkflow);
    setIsCreatingNew(false);
    addToast({ title: "ワークフローが保存されました", color: "success" });
  }, []);

  const handleCreateNewWorkflow = () => {
    const newWorkflowId = `wf-${Date.now().toString()}`;
    const newWorkflow: Workflow = {
      id: newWorkflowId,
      name: '新しいワークフロー',
      isEnabled: false,
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedWorkflow(newWorkflow);
    setIsCreatingNew(true); // 新規作成モード
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.filter(wf => wf.id !== workflowId));
    if (selectedWorkflow?.id === workflowId) {
      setSelectedWorkflow(workflows.length > 1 ? workflows.find(w => w.id !== workflowId) || null : null);
    }
    addToast({title: "ワークフローが削除されました", color: "danger"});
  }

  // ダミーのワークフロー実行シミュレーション
  const simulateWorkflowRun = (workflow: Workflow) => {
    if (!workflow.isEnabled) return;

    addToast({
      title: "自動化実行中...",
      description: `ワークフロー "${workflow.name}" を実行しています。`,
      color: "primary"
    });

    // 実行履歴を更新
    const newRun: WorkflowRun = {
      id: `run-${Date.now()}`,
      workflowId: workflow.id,
      workflowName: workflow.name,
      status: 'executing',
      startedAt: new Date().toISOString(),
      creditsConsumed: Math.floor(Math.random() * 10) + 5,
    };
    setRunHistory(prev => [newRun, ...prev.slice(0, 19)]); // 最新20件を保持

    // ダミーの遅延と結果
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80%の確率で成功
      setRunHistory(prev => prev.map(r => r.id === newRun.id ? {
        ...r,
        status: success ? 'completed' : 'failed',
        completedAt: new Date().toISOString()
      } : r));

      addToast({
        title: success ? "自動化完了" : "自動化失敗",
        description: `ワークフロー "${workflow.name}" の実行が${success ? "完了しました" : "失敗しました"}。`,
        color: success ? "success" : "danger"
      });
    }, 2000 + Math.random() * 3000);
  };


  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* TopBarの高さを引く、flex-colに変更 */}
      {/* PageHeader は PanelGroup の外に配置しても良い */}
      {/* <PageHeader title="オートメーション" description="ワークフローを管理します" /> */}

      <PanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Panel 1: Workflow List */}
        <Panel defaultSize={20} minSize={15} collapsible={true} className="flex flex-col !overflow-y-auto">
          <div className="p-4 border-r border-divider h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-lg font-semibold">オートメーション</h2>
              <Button
                color="primary"
                size="sm"
                startContent={<Icon icon="lucide:plus" />}
                onPress={handleCreateNewWorkflow}
              >
                新規作成
              </Button>
            </div>
            <WorkflowList
              workflows={workflows}
              selectedWorkflowId={selectedWorkflow?.id}
              onSelectWorkflow={handleSelectWorkflow}
              onToggleWorkflow={handleToggleWorkflow}
              onDeleteWorkflow={handleDeleteWorkflow}
            />
          </div>
        </Panel>
        <PanelResizeHandle className="w-1 bg-divider hover:bg-primary transition-colors data-[resize-handle-active]:bg-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none" />

        {/* Panel 2: Main Area (NodePalette, WorkflowBuilder, RunHistoryPanel) */}
        <Panel defaultSize={80} minSize={30}>
          <PanelGroup direction="horizontal" className="h-full">
            {/* NodePalette はここに1つだけ配置する */}
            <Panel defaultSize={25} minSize={20} collapsible={true} className="!overflow-y-auto">
              <NodePalette />
            </Panel>
            <PanelResizeHandle className="w-1 bg-divider hover:bg-primary transition-colors data-[resize-handle-active]:bg-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none" />

            {/* Panel 2.2: Workflow Builder */}
            <Panel defaultSize={selectedWorkflow ? 50 : 100} minSize={30}>
              {selectedWorkflow ? (
                 <div className="h-full overflow-hidden"> {/* WorkflowBuilderが内部で高さを管理する場合 */}
                  <WorkflowBuilder key={selectedWorkflow.id} workflow={selectedWorkflow} onSave={handleSaveWorkflow} isCreatingNew={isCreatingNew} onSimulateRun={() => simulateWorkflowRun(selectedWorkflow)} />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-foreground-500 h-full">
                  ワークフローを選択するか、新規作成してください。
                </div>
              )}
            </Panel>
            {selectedWorkflow && ( // 実行履歴はワークフロー選択時のみ表示
              <>
                <PanelResizeHandle className="w-1 bg-divider hover:bg-primary transition-colors data-[resize-handle-active]:bg-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none" />
                {/* Panel 2.3: Run History Panel */}
                <Panel defaultSize={25} minSize={20} collapsible={true} className="!overflow-y-auto">
                  <RunHistoryPanel workflowId={selectedWorkflow.id} runs={runHistory.filter(r => r.workflowId === selectedWorkflow.id)} />
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default AutomationsPage;