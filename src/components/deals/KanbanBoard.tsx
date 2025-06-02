import React from 'react';
import { Card, CardBody, CardHeader, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Deal } from '../../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  deals: Deal[];
  isLoading?: boolean;
  onDragEnd?: (result: any) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  deals,
  isLoading = false,
  onDragEnd,
  onSearch,
  onFilter
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  // ディールをステージごとにグループ化
  const newDeals = deals.filter(deal => deal.stage === 'new');
  const negotiationDeals = deals.filter(deal => deal.stage === 'negotiation');
  const contractDeals = deals.filter(deal => deal.stage === 'contract');
  const lostDeals = deals.filter(deal => deal.stage === 'lost');
  
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
          <KanbanColumn 
            title="新規" 
            deals={newDeals} 
            columnId="new"
            color="primary"
          />
          <KanbanColumn 
            title="交渉中" 
            deals={negotiationDeals} 
            columnId="negotiation"
            color="warning"
          />
          <KanbanColumn 
            title="契約" 
            deals={contractDeals} 
            columnId="contract"
            color="success"
          />
          <KanbanColumn 
            title="失注" 
            deals={lostDeals} 
            columnId="lost"
            color="danger"
          />
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
