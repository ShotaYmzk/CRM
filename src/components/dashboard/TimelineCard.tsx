import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { TimelineItem } from '../../types';
import DateDisplay from '../common/DateDisplay';
import { Link } from 'react-router-dom';

interface TimelineCardProps {
  items: TimelineItem[];
  isLoading?: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ items, isLoading = false }) => {
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'email':
        return 'lucide:mail';
      case 'event':
        return 'lucide:calendar';
      case 'note':
        return 'lucide:file-text';
      case 'task':
        return 'lucide:check-square';
      default:
        return 'lucide:activity';
    }
  };
  
  const getItemColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'text-primary-500 bg-primary-50';
      case 'event':
        return 'text-warning-500 bg-warning-50';
      case 'note':
        return 'text-success-500 bg-success-50';
      case 'task':
        return 'text-secondary-500 bg-secondary-50';
      default:
        return 'text-foreground-500 bg-foreground-50';
    }
  };
  
  const getRelatedLink = (item: TimelineItem) => {
    if (!item.relatedTo) return null;
    
    const { type, id } = item.relatedTo;
    
    switch (type) {
      case 'contact':
        return `/contacts/${id}`;
      case 'company':
        return `/companies/${id}`;
      case 'deal':
        return `/deals?id=${id}`;
      default:
        return null;
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">タイムライン</h3>
        <Button variant="light" size="sm" endContent={<Icon icon="lucide:chevron-right" className="w-4 h-4" />}>
          すべて表示
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ul className="divide-y divide-divider">
            {items.map((item) => (
              <li key={item.id} className="p-4 hover:bg-content2 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${getItemColor(item.type)}`}>
                    <Icon icon={getItemIcon(item.type)} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-foreground truncate">{item.title}</h4>
                      <DateDisplay date={item.date} className="text-xs text-foreground-400 whitespace-nowrap ml-2" />
                    </div>
                    {item.description && (
                      <p className="text-sm text-foreground-500 mt-1 line-clamp-2">{item.description}</p>
                    )}
                    {item.relatedTo && (
                      <Link 
                        to={getRelatedLink(item) || '#'} 
                        className="inline-flex items-center text-xs text-primary-500 mt-2 hover:underline"
                      >
                        <Icon icon={
                          item.relatedTo.type === 'contact' ? 'lucide:user' : 
                          item.relatedTo.type === 'company' ? 'lucide:building' : 
                          'lucide:briefcase'
                        } className="w-3 h-3 mr-1" />
                        {item.relatedTo.name}
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};

export default TimelineCard;
