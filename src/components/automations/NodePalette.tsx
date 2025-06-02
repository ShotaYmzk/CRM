// src/components/automations/NodePalette.tsx
import React from 'react';
import { Icon } from '@iconify/react';
import { availableTriggers, availableActions, NodeType, WorkflowNodeData } from '../../types'; // 型定義

const NodePalette: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType, label: string, icon?: string, description?: string) => {
    event.dataTransfer.setData('application/reactflow-nodetype', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    if (icon) event.dataTransfer.setData('application/reactflow-icon', icon);
    if (description) event.dataTransfer.setData('application/reactflow-description', description);
    event.dataTransfer.effectAllowed = 'move';
  };

  const paletteItems: { group: string, items: (WorkflowNodeData & { idPrefix: string })[] }[] = [ // 配列型に変更
    {
        group: 'Triggers',
        items: availableTriggers.map(t => ({ label: t.name, type: 'trigger' as NodeType, icon: 'lucide:zap', description: t.description, idPrefix: t.type }))
    },
    {
        group: 'Actions',
        items: availableActions.map(a => ({ label: a.name, type: 'action' as NodeType, icon: 'lucide:play-circle', description: a.description, idPrefix: a.type }))
    },
    {
        group: 'Logic',
        items: [
            { label: '条件分岐 (Switch)', type: 'switch' as NodeType, icon: 'lucide:git-fork', description: '条件に基づいてフローを分岐します。', idPrefix: 'switch' },
        ]
    }
];

return (
    <aside className="w-64 p-4 border-r border-divider bg-content1 overflow-y-auto">
      <h3 className="text-sm font-semibold mb-3 text-foreground-600">コンポーネント</h3>
      {paletteItems.map(({ group, items }) => ( // 分割代入で取得
          <div key={group} className="mb-4">
              <p className="text-xs font-medium text-foreground-500 mb-2">{group}</p>
              {items.map((item) => ( // itemの型が推論されるはず
                <div
                    key={`${item.idPrefix}-${item.label}`} // よりユニークなキー
                    className="p-2 mb-2 border border-divider rounded-md cursor-grab hover:bg-content2 active:cursor-grabbing flex items-center gap-2 bg-background"
                    onDragStart={(event) => onDragStart(event, item.type, item.label, item.icon, item.description)}
                    draggable
                >
                    {item.icon && <Icon icon={item.icon} className="w-4 h-4 text-primary" />}
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                </div>
                ))}
          </div>
      ))}
    </aside>
  );
};

export default NodePalette;