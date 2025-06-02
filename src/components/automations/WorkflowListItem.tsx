// src/components/automations/WorkflowListItem.tsx
import React from 'react';
import { Workflow } from '../../types'; // または '../../types/automation'
import { Switch, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import DateDisplay from '../common/DateDisplay';

interface WorkflowListItemProps {
  workflow: Workflow;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const WorkflowListItem: React.FC<WorkflowListItemProps> = ({
  workflow,
  isSelected,
  onSelect,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer hover:bg-content2 transition-colors ${ // transition-colorsを追加
        isSelected ? 'bg-primary-50 ring-2 ring-primary-500' : 'hover:bg-content3' // hover時の背景色を調整
      }`}
      onClick={() => onSelect(workflow.id)}
      role="button" // クリック可能であることを示す
      tabIndex={0} // キーボードフォーカス可能にする
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(workflow.id); }} // Enter/Spaceでも選択
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-foreground truncate flex-1 mr-2">{workflow.name}</h3> {/* flex-1とmr-2を追加 */}
        <Switch
          size="sm"
          isSelected={workflow.isEnabled}
          onValueChange={() => onToggle(workflow.id)}
          onClick={(e) => e.stopPropagation()} // Switchのクリックで親のonSelectが発火しないように
          aria-label={`${workflow.name}を${workflow.isEnabled ? '無効化' : '有効化'}`}
        />
      </div>
      <p className="text-xs text-foreground-500 mt-1 truncate h-8 leading-4"> {/* 高さを固定して複数行に対応 */}
        {workflow.description || '説明がありません'}
      </p>
      <div className="text-xs text-foreground-400 mt-2 flex justify-between items-center">
        <span>
          更新日: <DateDisplay date={workflow.updatedAt} format="datetime" />
        </span>
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={(e) => e.stopPropagation()} // Dropdownボタンのクリックで親のonSelectが発火しないように
                  aria-label="ワークフローオプション"
                >
                    <Icon icon="lucide:more-horizontal" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="ワークフローアクション"
              onAction={(key) => {
                if (key === 'delete') onDelete(workflow.id);
              }}
            >
                <DropdownItem key="delete" color="danger" startContent={<Icon icon="lucide:trash-2" />}>
                    削除
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default WorkflowListItem;