// src/components/deals/KanbanColumn.tsx
import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Deal, DealStage } from '../../types'; // DealStage をインポート
import KanbanCard from './KanbanCard';
import { Droppable, Draggable } from 'react-beautiful-dnd'; // インポート
import FormattedCurrency from '../common/FormattedCurrency'; // 金額表示用にインポート

interface KanbanColumnProps {
  title: string;
  deals: Deal[];
  columnId: DealStage; // string から DealStage へ
  color: 'primary' | 'warning' | 'success' | 'danger';
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, deals, columnId, color }) => {
  const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0);

  return (
    <div className="kanban-column flex-shrink-0">
      <Card className="h-full flex flex-col"> {/* Card全体で高さを確保 */}
        <CardHeader className="flex flex-col gap-2">
          {/* ... CardHeaderの内容は変更なし ... */}
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
            合計: <FormattedCurrency amount={totalAmount} />
          </div>
        </CardHeader>
        {/* DroppableエリアはCardBodyの外側に配置するか、CardBody自体をDroppableにしない */}
        <Droppable droppableId={columnId} type="DEAL">
          {(provided, snapshot) => (
            <div // ここにプレーンなdivを追加
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-2 overflow-y-auto flex-grow ${snapshot.isDraggingOver ? 'bg-content3' : 'bg-content2'
                }`} // スタイルをこのdivに適用
              style={{ minHeight: '100px' }} // ドロップエリアの最小高さを確保
            >
              {/* CardBody をこの div の子要素にするか、CardBody を使わずに直接リストをレンダリング */}
              {/* もしCardBodyのスタイルが必要なら、このdivの子としてCardBodyを配置し、
                  CardBodyにはrefやdroppablePropsを渡さない */}
              {deals.map((deal, index) => (
                <Draggable key={deal.id} draggableId={deal.id.toString()} index={index}>
                  {(providedDraggable, snapshotDraggable) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      style={{
                        ...providedDraggable.draggableProps.style,
                      }}
                      className="mb-2" // カード間のマージン
                    >
                      <KanbanCard deal={deal} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {deals.length === 0 && !snapshot.isDraggingOver && (
                <div className="text-center py-8 text-foreground-400 text-sm">
                  ディールがありません
                </div>
              )}
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  );
};

export default KanbanColumn;
