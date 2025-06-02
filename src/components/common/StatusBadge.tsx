import React from 'react';
import { Chip } from '@heroui/react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const getStatusProps = () => {
    switch (status.toLowerCase()) {
      case 'active':
        return { color: 'success', text: 'アクティブ' };
      case 'inactive':
        return { color: 'default', text: '非アクティブ' };
      case 'lead':
        return { color: 'primary', text: 'リード' };
      case 'new':
        return { color: 'primary', text: '新規' };
      case 'negotiation':
        return { color: 'warning', text: '交渉中' };
      case 'contract':
        return { color: 'success', text: '契約' };
      case 'lost':
        return { color: 'danger', text: '失注' };
      case 'pending':
        return { color: 'warning', text: '保留中' };
      case 'completed':
        return { color: 'success', text: '完了' };
      case 'overdue':
        return { color: 'danger', text: '期限超過' };
      default:
        return { color: 'default', text: status };
    }
  };

  const { color, text } = getStatusProps();

  return (
    <Chip 
      color={color as any} 
      size={size}
      variant="flat"
    >
      {text}
    </Chip>
  );
};

export default StatusBadge;

