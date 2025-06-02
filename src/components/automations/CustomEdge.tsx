import React from 'react';
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  useReactFlow,
} from 'reactflow';
import { Button } from '@heroui/react'; // Hero UIのButtonを使用
import { Icon } from '@iconify/react';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label, // エッジラベルを受け取る
}) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onDelete = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ stroke: '#10B981', strokeWidth: 2, ...style }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan" // React Flowのパンやズーム操作をこの要素では無効にする
        >
          {label && ( // ラベルが存在する場合に表示
            <div className="bg-content1 px-1.5 py-0.5 rounded text-xs text-foreground-600 border border-divider shadow-sm">
              {label}
            </div>
          )}
          {/* 削除ボタン (ラベルの近くや中央に配置) */}
          {/* この例ではラベルがない場合でも中央に表示 */}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity !p-1 !min-w-0 !h-auto" // スタイル調整
            onPress={onDelete} // Hero UIのButtonはonPress
            aria-label="エッジを削除"
          >
            <Icon icon="lucide:x-circle" className="w-3.5 h-3.5" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;