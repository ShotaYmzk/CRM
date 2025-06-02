// src/components/deals/KanbanBoard.tsx
import React from 'react';
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'; // Card, CardBody, CardHeader は不要になるかも
import { Icon } from '@iconify/react';
import { Deal, DealStage } from '../../types'; // DealStage をインポート
import KanbanColumn from './KanbanColumn';
import { Droppable } from 'react-beautiful-dnd'; // インポート

interface DealsByStage { // DealsPageから型をインポートするか、ここで再定義
  new: Deal[];
  negotiation: Deal[];
  contract: Deal[];
  lost: Deal[];
}
interface KanbanBoardProps {
  dealsByStage: DealsByStage; // 変更: Deal[] から DealsByStage へ
  isLoading?: boolean;
  // onDragEnd は上位の DragDropContext で処理
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  stages: DealStage[]; // ステージの順番を管理
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  dealsByStage,
  isLoading = false,
  onSearch,
  onFilter,
  stages
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const stageTitles: Record<DealStage, string> = {
    new: "新規",
    negotiation: "交渉中",
    contract: "契約",
    lost: "失注",
  };

  const stageColors: Record<DealStage, 'primary' | 'warning' | 'success' | 'danger'> = {
    new: "primary",
    negotiation: "warning",
    contract: "success",
    lost: "danger",
  };


  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md">
          <Input
            placeholder="ディールを検索..."
            value={searchQuery}
            onValueChange={handleSearchChange}
            startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
            endContent={
              <Button type="submit" size="sm" isIconOnly variant="light">
                <Icon icon="lucide:arrow-right" className="text-foreground-400" />
              </Button>
            }
          />
        </form>

        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
              >
                フィルター
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="フィルターオプション">
              <DropdownItem key="all">すべて</DropdownItem>
              <DropdownItem key="my">自分のディール</DropdownItem>
              <DropdownItem key="high">確度高</DropdownItem>
              <DropdownItem key="low">確度低</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button color="primary" endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}>
            ディール追加
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stageId) => (
            <KanbanColumn
              key={stageId}
              title={stageTitles[stageId]}
              deals={dealsByStage[stageId]}
              columnId={stageId}
              color={stageColors[stageId]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;