import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Company } from '../../types';
import CompanyLogo from '../common/CompanyLogo';
import DateDisplay from '../common/DateDisplay';
import { useNavigate } from 'react-router-dom';

interface CompanyListProps {
  companies: Company[];
  isLoading?: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  isLoading = false,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onSearch,
  onFilter
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleRowClick = (companyId: string) => {
    navigate(`/companies/${companyId}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md">
          <Input
            placeholder="会社を検索..."
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
              <DropdownItem key="tech">テクノロジー</DropdownItem>
              <DropdownItem key="finance">金融</DropdownItem>
              <DropdownItem key="healthcare">医療</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Button color="primary" endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}>
            会社追加
          </Button>
        </div>
      </div>
      
      <div className="border border-divider rounded-lg overflow-hidden">
        <Table 
          aria-label="会社一覧"
          removeWrapper
          selectionMode="single"
          onRowAction={handleRowClick}
          isStriped
        >
          <TableHeader>
            <TableColumn>会社名</TableColumn>
            <TableColumn>業種</TableColumn>
            <TableColumn>所在地</TableColumn>
            <TableColumn>ウェブサイト</TableColumn>
            <TableColumn>更新日</TableColumn>
          </TableHeader>
          <TableBody 
            isLoading={isLoading}
            loadingContent={<div className="py-8">読み込み中...</div>}
            emptyContent={<div className="py-8 text-center">会社がありません</div>}
          >
            {companies.map((company) => (
              <TableRow key={company.id} className="cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <CompanyLogo company={company} size="sm" />
                    <div>
                      <p className="font-medium text-foreground">{company.name}</p>
                      {company.domain && (
                        <p className="text-xs text-foreground-500">{company.domain}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{company.industry || '-'}</TableCell>
                <TableCell>{company.address || '-'}</TableCell>
                <TableCell>
                  {company.website ? (
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {company.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <DateDisplay date={company.updatedAt} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-center">
        <Pagination
          total={Math.ceil(totalCount / pageSize)}
          initialPage={page}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default CompanyList;
