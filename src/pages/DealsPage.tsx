import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import KanbanBoard from '../components/deals/KanbanBoard';
import { mockDeals as initialMockDeals } from '../utils/mockData';
import { Deal, DealStage } from '../types'; // DealStage をインポート
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// DealStage型が ../types から正しくエクスポートされていることを前提とします
const STAGES: DealStage[] = ['new', 'negotiation', 'contract', 'lost'];

interface DealsByStage {
  new: Deal[];
  negotiation: Deal[];
  contract: Deal[];
  lost: Deal[];
}

const DealsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState({});

  const [dealsByStage, setDealsByStage] = useState<DealsByStage>({
    new: [],
    negotiation: [],
    contract: [],
    lost: [],
  });

  useEffect(() => {
    setIsLoading(true);
    const categorizedDeals: DealsByStage = { new: [], negotiation: [], contract: [], lost: [] };
    initialMockDeals.forEach(deal => {
      // deal.stage が DealStage 型であることを TypeScript が認識できるようにする
      const stageKey = deal.stage as DealStage;
      if (categorizedDeals[stageKey]) {
        categorizedDeals[stageKey].push(deal);
      } else {
        // もし deal.stage が予期せぬ値だった場合のフォールバック (例: 'new' に入れるなど)
        // console.warn(`Unknown stage: ${deal.stage} for deal: ${deal.title}`);
        // categorizedDeals.new.push(deal); // 必要に応じて
      }
    });
    setDealsByStage(categorizedDeals);
    setIsLoading(false);
  }, []);


  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceDroppableId = source.droppableId as DealStage;
    const destinationDroppableId = destination.droppableId as DealStage;

    // 同じカラム内で順序変更
    if (sourceDroppableId === destinationDroppableId) {
      const columnDeals = Array.from(dealsByStage[sourceDroppableId]);
      const [removed] = columnDeals.splice(source.index, 1);
      columnDeals.splice(destination.index, 0, removed);

      setDealsByStage(prev => ({
        ...prev,
        [sourceDroppableId]: columnDeals,
      }));
    } else {
      // 異なるカラムへの移動
      const sourceColumnDeals = Array.from(dealsByStage[sourceDroppableId]);
      const destinationColumnDeals = Array.from(dealsByStage[destinationDroppableId]);
      
      const [draggedDeal] = sourceColumnDeals.splice(source.index, 1);
      
      if (!draggedDeal) return;

      // ディールのステージを更新
      const updatedDraggedDeal = { ...draggedDeal, stage: destinationDroppableId };
      
      destinationColumnDeals.splice(destination.index, 0, updatedDraggedDeal);

      setDealsByStage(prev => ({
        ...prev,
        [sourceDroppableId]: sourceColumnDeals,
        [destinationDroppableId]: destinationColumnDeals,
      }));
      
      console.log(`Deal '${updatedDraggedDeal.title}' moved from ${sourceDroppableId} to ${destinationDroppableId}`);
      // API呼び出しでバックエンドのデータを更新する
      // updateDealStageInApi(updatedDraggedDeal.id, destinationDroppableId);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: 検索ロジック (クライアントサイド or API)
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    // TODO: フィルターロジック (クライアントサイド or API)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="ディール"
        description="すべてのディールを管理"
        actions={
          <Button
            color="primary"
            endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
          >
            ディール追加
          </Button>
        }
      />
      <DragDropContext 
      onDragStart={() => console.log('Drag started')}
      onDragUpdate={(update) => console.log('Drag update:', update)}
      onDragEnd={onDragEnd}
      >
        <KanbanBoard
          dealsByStage={dealsByStage}
          isLoading={isLoading}
          onSearch={handleSearch}
          onFilter={handleFilter}
          stages={STAGES}
        />
      </DragDropContext>
    </div>
  );
};

export default DealsPage;