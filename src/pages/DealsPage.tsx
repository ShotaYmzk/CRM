import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import KanbanBoard from '../components/deals/KanbanBoard';
import { mockDeals } from '../utils/mockData';

const DealsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState({});
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, filters]);
  
  const handleDragEnd = (result: any) => {
    // ドラッグ&ドロップ処理
    console.log('ドラッグ結果:', result);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
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
      
      <KanbanBoard
        deals={mockDeals}
        isLoading={isLoading}
        onDragEnd={handleDragEnd}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default DealsPage;
