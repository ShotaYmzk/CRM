// src/components/automations/RunHistoryPanel.tsx
import React from 'react';
import { WorkflowRun } from '../../types';
import { Card, CardHeader, CardBody, Divider, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import DateDisplay from '../common/DateDisplay';
import FormattedCurrency from '../common/FormattedCurrency'; // もしクレジットが金額なら

interface RunHistoryPanelProps {
  workflowId: string;
  runs: WorkflowRun[];
}

const RunHistoryPanel: React.FC<RunHistoryPanelProps> = ({ workflowId, runs }) => {
  return (
    <Card className="w-80 border-l border-divider bg-content1 flex flex-col h-full shadow-none rounded-none">
      <CardHeader className="p-4 flex justify-between items-center flex-shrink-0">
        <h3 className="text-md font-semibold">実行履歴</h3>
        <Button size="sm" variant="light" isIconOnly>
            <Icon icon="lucide:refresh-cw" className="w-4 h-4"/>
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="p-0 overflow-y-auto flex-1">
        {runs.length === 0 ? (
          <div className="p-4 text-center text-sm text-foreground-500">
            実行履歴はありません。
          </div>
        ) : (
          <ul className="divide-y divide-divider">
            {runs.map(run => (
              <li key={run.id} className="p-3 hover:bg-content2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={
                        run.status === 'completed' ? 'lucide:check-circle' :
                        run.status === 'failed' ? 'lucide:x-circle' :
                        'lucide:loader-circle' // executing
                      }
                      className={`w-4 h-4 ${
                        run.status === 'completed' ? 'text-success-500' :
                        run.status === 'failed' ? 'text-danger-500' :
                        'text-warning-500 animate-spin'
                      }`}
                    />
                    <span className="text-xs font-medium text-foreground">Run #{run.id.slice(-4)}</span>
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      run.status === 'completed' ? 'success' :
                      run.status === 'failed' ? 'danger' :
                      'warning'
                    }
                  >
                    {run.status === 'completed' ? '完了' : run.status === 'failed' ? '失敗' : '実行中'}
                  </Chip>
                </div>
                <div className="text-xs text-foreground-500">
                  <DateDisplay date={run.startedAt} format="datetime" />
                  {run.creditsConsumed !== undefined && (
                    <span className="ml-2">
                      ({run.creditsConsumed} credits)
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};

export default RunHistoryPanel;