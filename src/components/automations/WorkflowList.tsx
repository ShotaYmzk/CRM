import React from 'react';
import { Workflow } from '../../types';
import WorkflowListItem from './WorkflowListItem';

interface WorkflowListProps {
  workflows: Workflow[];
  selectedWorkflowId?: string | null;
  onSelectWorkflow: (id: string) => void;
  onToggleWorkflow: (id: string) => void;
  onDeleteWorkflow: (id: string) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  selectedWorkflowId,
  onSelectWorkflow,
  onToggleWorkflow,
  onDeleteWorkflow,
}) => {
  if (workflows.length === 0) {
    return <div className="text-center text-foreground-500 py-8">ワークフローがありません。</div>;
  }

  return (
    <div className="space-y-2 overflow-y-auto flex-1">
      {workflows.map(workflow => (
        <WorkflowListItem
          key={workflow.id}
          workflow={workflow}
          isSelected={selectedWorkflowId === workflow.id}
          onSelect={onSelectWorkflow}
          onToggle={onToggleWorkflow}
          onDelete={onDeleteWorkflow}
        />
      ))}
    </div>
  );
};

export default WorkflowList;