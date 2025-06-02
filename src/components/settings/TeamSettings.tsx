import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { mockUsers } from '../../utils/mockData';

const TeamSettings: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">チーム設定</h2>
        <Button 
          color="primary" 
          startContent={<Icon icon="lucide:user-plus" className="w-4 h-4" />}
        >
          メンバー招待
        </Button>
      </div>
      
      <div className="border border-divider rounded-lg overflow-hidden">
        <Table 
          aria-label="チームメンバー一覧"
          removeWrapper
          isStriped
        >
          <TableHeader>
            <TableColumn>名前</TableColumn>
            <TableColumn>メールアドレス</TableColumn>
            <TableColumn>役割</TableColumn>
            <TableColumn>ステータス</TableColumn>
            <TableColumn>アクション</TableColumn>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.avatar}
                      name={user.name}
                      size="sm"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === 'admin' ? '管理者' : 'メンバー'}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-600">
                    アクティブ
                  </span>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                      >
                        <Icon icon="lucide:more-horizontal" className="w-4 h-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="ユーザーアクション">
                      <DropdownItem key="edit">編集</DropdownItem>
                      <DropdownItem key="permissions">権限設定</DropdownItem>
                      <DropdownItem key="remove" color="danger">削除</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamSettings;
