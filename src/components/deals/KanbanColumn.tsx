import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Deal } from '../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  deals: Deal[];
  columnId: string;
  color: 'primary' | 'warning' | 'success' | 'danger';
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, deals, columnId, color }) => {
  // 各ステージの合計金額を計算
  const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0);
  
  return (
    <div className="kanban-column flex-shrink-0">
      <Card className="h-full">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
              <h3 className="font-medium">{title}</h3>
              <span className="text-sm text-foreground-500">{deals.length}</span>
            </div>
            <Button isIconOnly size="sm" variant="light">
              <Icon icon="lucide:plus" className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-sm text-foreground-500">
            合計: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(totalAmount)}
          </div>
        </CardHeader>
        <CardBody className="p-2 overflow-y-auto">
          <div className="space-y-2">
            {deals.map((deal) => (
              <KanbanCard key={deal.id} deal={deal} />
            ))}
            {deals.length === 0 && (
              <div className="text-center py-8 text-foreground-400 text-sm">
                ディールがありません
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default KanbanColumn;
