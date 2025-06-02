import React from 'react';
import { Card, CardBody, CardHeader, Divider, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Event } from '../../types';
import DateDisplay from '../common/DateDisplay';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface UpcomingEventsCardProps {
  events: Event[];
  isLoading?: boolean;
}

const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({ events, isLoading = false }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">今後の予定</h3>
        <Button variant="light" size="sm" endContent={<Icon icon="lucide:calendar" className="w-4 h-4" />}>
          カレンダーを表示
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
            {events.map((event) => (
              <li key={event.id} className="p-4 hover:bg-content2 transition-colors">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center min-w-[48px] h-12 bg-content2 rounded-md">
                    <span className="text-xs font-medium text-foreground-500">
                      {format(new Date(event.start), 'E', { locale: ja })}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {format(new Date(event.start), 'd', { locale: ja })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{event.title}</h4>
                    <div className="flex items-center mt-1 text-xs text-foreground-500">
                      <Icon icon="lucide:clock" className="w-3 h-3 mr-1" />
                      <span>
                        {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                      </span>
                      {event.location && (
                        <>
                          <span className="mx-2">•</span>
                          <Icon icon="lucide:map-pin" className="w-3 h-3 mr-1" />
                          <span className="truncate">{event.location}</span>
                        </>
                      )}
                    </div>
                    {event.attendees.length > 0 && (
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          {event.attendees.slice(0, 3).map((attendee, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full bg-primary-100 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-600"
                            >
                              {attendee.charAt(0).toUpperCase()}
                            </div>
                          ))}
                        </div>
                        {event.attendees.length > 3 && (
                          <span className="text-xs text-foreground-500 ml-2">
                            +{event.attendees.length - 3}
                          </span>
                        )}
                      </div>
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

export default UpcomingEventsCard;
