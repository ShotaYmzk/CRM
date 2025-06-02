import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Event } from '../../types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface EventDetailPanelProps {
  event: Event;
  onClose: () => void;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

const EventDetailPanel: React.FC<EventDetailPanelProps> = ({
  event,
  onClose,
  onEdit,
  onDelete
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(event);
    }
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(event.id);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">予定の詳細</h2>
        <Button isIconOnly variant="light" onPress={onClose}>
          <Icon icon="lucide:x" className="w-5 h-5" />
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-6">
        <div>
          <h3 className="text-xl font-medium text-foreground">{event.title}</h3>
          <div className="flex items-center mt-2 text-foreground-500">
            <Icon icon="lucide:calendar" className="w-4 h-4 mr-2" />
            <span>
              {format(new Date(event.start), 'yyyy年MM月dd日 (E)', { locale: ja })}
            </span>
          </div>
          <div className="flex items-center mt-1 text-foreground-500">
            <Icon icon="lucide:clock" className="w-4 h-4 mr-2" />
            <span>
              {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center mt-1 text-foreground-500">
              <Icon icon="lucide:map-pin" className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        
        {event.description && (
          <div>
            <h4 className="text-sm font-medium text-foreground-600 mb-2">説明</h4>
            <p className="text-foreground-500 p-3 bg-content2 rounded-md">{event.description}</p>
          </div>
        )}
        
        {event.attendees.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground-600 mb-2">参加者</h4>
            <div className="space-y-2">
              {event.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-medium text-primary-600">
                    {attendee.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-foreground-500">{attendee}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 pt-4">
          <Button 
            variant="flat" 
            color="danger" 
            className="flex-1"
            startContent={<Icon icon="lucide:trash-2" className="w-4 h-4" />}
            onPress={handleDelete}
          >
            削除
          </Button>
          <Button 
            color="primary" 
            className="flex-1"
            startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
            onPress={handleEdit}
          >
            編集
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventDetailPanel;
