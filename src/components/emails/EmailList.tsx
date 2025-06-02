import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Email } from '../../types';
import DateDisplay from '../common/DateDisplay';
import { useNavigate } from 'react-router-dom';

interface EmailListProps {
  emails: Email[];
  isLoading?: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
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
  
  const handleRowClick = (emailId: string) => {
    navigate(`/emails/${emailId}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md">
          <Input
            placeholder="メールを検索..."
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
              <DropdownItem key="unread">未読</DropdownItem>
              <DropdownItem key="with-attachments">添付ファイルあり</DropdownItem>
              <DropdownItem key="today">今日</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Button color="primary" endContent={<Icon icon="lucide:mail" className="w-4 h-4" />}>
            メール作成
          </Button>
        </div>
      </div>
      
      <div className="border border-divider rounded-lg overflow-hidden">
        <Table 
          aria-label="メール一覧"
          removeWrapper
          selectionMode="single"
          onRowAction={handleRowClick}
          isStriped
        >
          <TableHeader>
            <TableColumn>件名</TableColumn>
            <TableColumn>送信者</TableColumn>
            <TableColumn>受信者</TableColumn>
            <TableColumn>日時</TableColumn>
            <TableColumn>添付</TableColumn>
          </TableHeader>
          <TableBody 
            isLoading={isLoading}
            loadingContent={<div className="py-8">読み込み中...</div>}
            emptyContent={<div className="py-8 text-center">メールがありません</div>}
          >
            {emails.map((email) => (
              <TableRow key={email.id} className="cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${email.read ? 'bg-foreground-100' : 'bg-primary-50 text-primary-500'}`}>
                      <Icon icon="lucide:mail" className={`w-4 h-4 ${email.read ? 'text-foreground-400' : 'text-primary-500'}`} />
                    </div>
                    <div>
                      <p className={`${email.read ? 'text-foreground-600' : 'font-medium text-foreground'}`}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-foreground-500 line-clamp-1">
                        {email.body.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{email.sender.split('@')[0]}</TableCell>
                <TableCell>
                  {email.recipients[0].split('@')[0]}
                  {email.recipients.length > 1 && ` +${email.recipients.length - 1}`}
                </TableCell>
                <TableCell>
                  <DateDisplay date={email.sentAt} />
                </TableCell>
                <TableCell>
                  {email.attachments && email.attachments.length > 0 && (
                    <Chip
                      size="sm"
                      variant="flat"
                      color="default"
                      startContent={<Icon icon="lucide:paperclip" className="w-3 h-3" />}
                    >
                      {email.attachments.length}
                    </Chip>
                  )}
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

export default EmailList;
