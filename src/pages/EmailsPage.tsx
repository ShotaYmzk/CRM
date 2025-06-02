import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import EmailList from '../components/emails/EmailList';
import { mockEmails } from '../utils/mockData';

const EmailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState({});
  
  const pageSize = 10;
  const totalCount = mockEmails.length;
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [page, searchQuery, filters]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };
  
  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="メール"
        description="すべてのメールを管理"
        actions={
          <Button 
            color="primary" 
            endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
          >
            メール作成
          </Button>
        }
      />
      
      <EmailList
        emails={mockEmails}
        isLoading={isLoading}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default EmailsPage;
