// src/components/automations/NodePalette.tsx
import React from 'react';
import { Accordion, AccordionItem, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { availableTriggers, availableActions, NodeType, WorkflowNodeData } from '../../types'; // 型定義

const NodePalette: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

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

  const filteredPaletteItems = paletteItems.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <aside className="w-72 p-3 border-r border-divider bg-content1 flex flex-col">
      <h3 className="text-base font-semibold mb-3 text-foreground-700 px-1">コンポーネント</h3>
      <Input
        placeholder="ノードを検索..."
        value={searchTerm}
        onValueChange={setSearchTerm}
        startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
        className="mb-3"
        size="sm"
        isClearable
      />
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        <Accordion selectionMode="multiple" defaultExpandedKeys={['Triggers', 'Actions', 'Logic']}>
          {filteredPaletteItems.map(({ group, items }) => (
            <AccordionItem key={group} title={<span className="font-medium text-sm">{group}</span>} classNames={{ title: "text-sm" }}>
              <div className="space-y-1.5 py-1">
                {items.map((item) => (
                  <div
                    key={`${item.idPrefix}-${item.label}`}
                    className="p-2.5 border border-divider rounded-lg cursor-grab hover:bg-primary-50 hover:border-primary-300 active:cursor-grabbing flex items-start gap-2.5 bg-background transition-all duration-150 ease-in-out shadow-sm hover:shadow-md"
                    onDragStart={(event) => onDragStart(event, item.type, item.label, item.icon, item.description)}
                    draggable
                  >
                    {item.icon && <Icon icon={item.icon} className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground-800 block">{item.label}</span>
                      {item.description && <p className="text-xs text-foreground-500 mt-0.5">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
};

export default NodePalette;