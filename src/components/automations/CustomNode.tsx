// src/components/automations/CustomNode.tsx
import React, { memo } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { WorkflowNodeData } from '../../types';

const CustomNode: React.FC<NodeProps<WorkflowNodeData>> = ({ data, selected, type }) => {
  const nodeTypeDisplay = type === 'triggerNode' ? 'Trigger' : type === 'actionNode' ? 'Action' : type === 'switchNode' ? 'Switch' : 'Node';
  const nodeColor = type === 'triggerNode' ? 'primary' : type === 'actionNode' ? 'success' : type === 'switchNode' ? 'warning' : 'default';

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={80} isVisible={selected} handleClassName="!w-3 !h-3 !bg-primary rounded-full" /> */}
      <Card className={`w-56 shadow-md ${selected ? 'ring-2 ring-primary' : 'ring-1 ring-divider'}`}>
        <CardHeader className={`p-2 border-b border-divider flex items-center justify-between bg-${nodeColor}-50`}>
          <div className="flex items-center gap-1.5">
            {data.icon && <Icon icon={data.icon} className={`w-4 h-4 text-${nodeColor}-600`} />}
            <span className={`text-xs font-semibold text-${nodeColor}-700`}>{data.label}</span>
          </div>
          <Chip size="sm" variant="flat" color={nodeColor as any} className="capitalize">
            {data.type}
          </Chip>
        </CardHeader>
        <CardBody className="p-2.5 text-xs text-foreground-600">
          {data.description || `${nodeTypeDisplay}の説明がありません`}
          {data.status && (
            <div className="mt-2">
                <Chip size="sm" variant="flat" 
                    color={data.status === 'completed' ? "success" : data.status === "running" ? "warning" : data.status === "triggered" ? "primary" : "default"}>
                    Status: {data.status}
                </Chip>
            </div>
          )}
        </CardBody>
      </Card>
      {/* 入力ポート (ターゲットハンドル) */}
      {type !== 'triggerNode' && ( // トリガーノード以外は入力ポートを持つ
        <Handle
            type="target"
            position={Position.Top}
            id="target"
            className="!w-3 !h-3 !bg-foreground-300"
            style={{ background: '#9CA3AF' }}
        />
      )}
      {/* 出力ポート (ソースハンドル) */}
      {type === 'switchNode' ? (
          <>
            <Handle type="source" position={Position.Bottom} id="condition1" style={{ left: '25%', background: '#9CA3AF' }} className="!w-3 !h-3" />
            <Handle type="source" position={Position.Bottom} id="condition2" style={{ left: '50%', background: '#9CA3AF' }} className="!w-3 !h-3" />
            <Handle type="source" position={Position.Bottom} id="condition3" style={{ left: '75%', background: '#9CA3AF' }} className="!w-3 !h-3" />
          </>
      ) : (
        <Handle
            type="source"
            position={Position.Bottom}
            id="source"
            className="!w-3 !h-3 !bg-foreground-300"
            style={{ background: '#9CA3AF' }}
        />
      )}
    </>
  );
};

export default memo(CustomNode);