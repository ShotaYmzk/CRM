import React from 'react';
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/AuthContext';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('検索:', searchQuery);
  };
  
  return (
    <header className="h-16 border-b border-divider bg-content1 px-4 flex items-center justify-between">
      <div className="w-1/3">
        <form onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="検索..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
            className="max-w-xs"
          />
        </form>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button isIconOnly variant="light" aria-label="通知">
          <Badge content="3" color="danger">
            <Icon icon="lucide:bell" className="w-5 h-5 text-foreground-600" />
          </Badge>
        </Button>
        
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              variant="light"
              className="flex items-center gap-2 p-0"
            >
              <Avatar
                src={user?.avatar}
                name={user?.name}
                size="sm"
                className="transition-transform"
              />
              <span className="font-medium text-sm hidden md:block">{user?.name}</span>
              <Icon icon="lucide:chevron-down" className="w-4 h-4 text-foreground-400" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="ユーザーアクション">
            <DropdownItem key="profile" startContent={<Icon icon="lucide:user" className="w-4 h-4" />}>
              プロフィール
            </DropdownItem>
            <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" className="w-4 h-4" />}>
              設定
            </DropdownItem>
            <DropdownItem key="help" startContent={<Icon icon="lucide:help-circle" className="w-4 h-4" />}>
              ヘルプ
            </DropdownItem>
            <DropdownItem 
              key="logout" 
              color="danger" 
              startContent={<Icon icon="lucide:log-out" className="w-4 h-4" />}
              onPress={logout}
            >
              ログアウト
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};

export default TopBar;
