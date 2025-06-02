import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-content2 rounded-full p-4 mb-4">
        <Icon icon={icon} className="w-10 h-10 text-foreground-400" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-foreground-500 max-w-md mb-6">{description}</p>
      {action && (
        <Button color="primary" onPress={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
