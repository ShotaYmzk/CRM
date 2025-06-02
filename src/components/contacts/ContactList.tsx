import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Contact } from '../../types';
import ContactAvatar from '../common/ContactAvatar';
import StatusBadge from '../common/StatusBadge';
import DateDisplay from '../common/DateDisplay';
import { useNavigate } from 'react-router-dom';

interface ContactListProps {
  contacts: Contact[];
  isLoading?: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
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
  
  const handleRowClick = (contactId: string) => {
    navigate(`/contacts/${contactId}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md">
          <Input
            placeholder="連絡先を検索..."
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
              <DropdownItem key="active">アクティブ</DropdownItem>
              <DropdownItem key="inactive">非アクティブ</DropdownItem>
              <DropdownItem key="lead">リード</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Button color="primary" endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}>
            連絡先追加
          </Button>
        </div>
      </div>
      
      <div className="border border-divider rounded-lg overflow-hidden">
        <Table 
          aria-label="連絡先一覧"
          removeWrapper
          selectionMode="single"
          onRowAction={handleRowClick}
          isStriped
        >
          <TableHeader>
            <TableColumn>名前</TableColumn>
            <TableColumn>会社</TableColumn>
            <TableColumn>役職</TableColumn>
            <TableColumn>最終やり取り</TableColumn>
            <TableColumn>ステータス</TableColumn>
            <TableColumn>タグ</TableColumn>
          </TableHeader>
          <TableBody 
            isLoading={isLoading}
            loadingContent={<div className="py-8">読み込み中...</div>}
            emptyContent={<div className="py-8 text-center">連絡先がありません</div>}
          >
            {contacts.map((contact) => (
              <TableRow key={contact.id} className="cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ContactAvatar contact={contact} size="sm" />
                    <div>
                      <p className="font-medium text-foreground">{contact.fullName}</p>
                      <p className="text-xs text-foreground-500">{contact.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{contact.company?.name || '-'}</TableCell>
                <TableCell>{contact.position || '-'}</TableCell>
                <TableCell>
                  {contact.lastContactedAt ? (
                    <DateDisplay date={contact.lastContactedAt} />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={contact.status} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag, index) => (
                      <Chip key={index} size="sm" variant="flat">
                        {tag}
                      </Chip>
                    ))}
                  </div>
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

export default ContactList;
