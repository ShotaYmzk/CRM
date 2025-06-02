import React from 'react';
import { Card, CardBody, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Deal } from '../../types';
import DateDisplay from '../common/DateDisplay';
import FormattedCurrency from '../common/FormattedCurrency';
import CompanyLogo from '../common/CompanyLogo';

interface KanbanCardProps {
  deal: Deal;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ deal }) => {
  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'success';
    if (probability >= 40) return 'warning';
    return 'danger';
  };
  
  return (
    <Card className="kanban-card">
      <CardBody className="p-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-foreground">{deal.title}</h4>
          <Chip 
            size="sm" 
            color={getProbabilityColor(deal.probability)} 
            variant="flat"
          >
            {deal.probability}%
          </Chip>
        </div>
        
        {deal.company && (
          <div className="flex items-center gap-2 mt-2">
            <CompanyLogo company={deal.company} size="sm" />
            <span className="text-sm text-foreground-600 truncate">{deal.company.name}</span>
          </div>
        )}
        
        <div className="mt-3 flex justify-between items-center">
          <div className="text-foreground-600 font-medium">
            <FormattedCurrency amount={deal.amount} currency={deal.currency} />
          </div>
          
          {deal.closingDate && (
            <div className="flex items-center text-xs text-foreground-500">
              <Icon icon="lucide:calendar" className="w-3 h-3 mr-1" />
              <DateDisplay date={deal.closingDate} format="date" />
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-divider flex justify-between items-center">
          <div className="flex items-center text-xs text-foreground-500">
            <Icon icon="lucide:clock" className="w-3 h-3 mr-1" />
            <DateDisplay date={deal.updatedAt} />
          </div>
          
          {deal.assignedTo && (
            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-600">
              {deal.assignedTo.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default KanbanCard;
