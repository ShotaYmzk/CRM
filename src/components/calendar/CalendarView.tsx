import React from 'react';
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Event } from '../../types';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';

interface CalendarViewProps {
  events: Event[];
  isLoading?: boolean;
  onEventClick?: (event: Event) => void;
  onDateClick?: (date: Date) => void;
  onViewChange?: (view: 'week' | 'list') => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  isLoading = false,
  onEventClick,
  onDateClick,
  onViewChange
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState<'week' | 'list'>('week');
  
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleViewChange = (newView: 'week' | 'list') => {
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };
  
  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  const handleDateClick = (date: Date) => {
    if (onDateClick) {
      onDateClick(date);
    }
  };
  
  // 週の日付を生成
  const weekDays = React.useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // 月曜始まり
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  }, [currentDate]);
  
  // 日付ごとのイベントをグループ化
  const eventsByDay = React.useMemo(() => {
    const grouped: { [key: string]: Event[] } = {};
    
    weekDays.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      grouped[dateStr] = events.filter(event => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, day);
      });
    });
    
    return grouped;
  }, [events, weekDays]);
  
  const getEventColor = (color?: string) => {
    switch (color) {
      case '#2563eb':
        return 'bg-primary-100 text-primary-600';
      case '#14b8a6':
        return 'bg-success-100 text-success-600';
      case '#f97316':
        return 'bg-warning-100 text-warning-600';
      case '#ef4444':
        return 'bg-danger-100 text-danger-600';
      default:
        return 'bg-foreground-100 text-foreground-600';
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="light" isIconOnly onPress={handlePrevWeek}>
              <Icon icon="lucide:chevron-left" className="w-5 h-5" />
            </Button>
            <Button variant="light" onPress={handleToday}>
              今日
            </Button>
            <Button variant="light" isIconOnly onPress={handleNextWeek}>
              <Icon icon="lucide:chevron-right" className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">
              {format(weekDays[0], 'yyyy年MM月', { locale: ja })}
            </h2>
          </div>
          
          <div className="flex gap-2">
            <Tabs 
              selectedKey={view} 
              onSelectionChange={(key) => handleViewChange(key as 'week' | 'list')}
              aria-label="カレンダービュー"
              size="sm"
              classNames={{
                base: "w-auto",
                tabList: "gap-2"
              }}
            >
              <Tab key="week" title="週" />
              <Tab key="list" title="リスト" />
            </Tabs>
            
            <Button color="primary" endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}>
              予定追加
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : view === 'week' ? (
          <div className="grid grid-cols-7 border-t border-divider">
            {/* 曜日ヘッダー */}
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className={`p-2 text-center border-r border-divider ${
                  isSameDay(day, new Date()) ? 'bg-primary-50' : ''
                }`}
              >
                <div className="text-xs text-foreground-500">
                  {format(day, 'E', { locale: ja })}
                </div>
                <div className={`text-lg font-medium ${
                  isSameDay(day, new Date()) ? 'text-primary-600' : 'text-foreground'
                }`}>
                  {format(day, 'd', { locale: ja })}
                </div>
              </div>
            ))}
            
            {/* カレンダーセル */}
            {weekDays.map((day, index) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const dayEvents = eventsByDay[dateStr] || [];
              
              return (
                <div 
                  key={`cell-${index}`} 
                  className={`calendar-day-cell border-r border-b border-divider p-1 ${
                    isSameDay(day, new Date()) ? 'bg-primary-50/30' : ''
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  {dayEvents.map((event) => (
                    <div 
                      key={event.id}
                      className={`calendar-event ${getEventColor(event.color)} cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                    >
                      {format(new Date(event.start), 'HH:mm')} {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-divider">
            {events.length > 0 ? (
              events.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 hover:bg-content2 transition-colors cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center min-w-[48px]">
                      <span className="text-xs font-medium text-foreground-500">
                        {format(new Date(event.start), 'E', { locale: ja })}
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        {format(new Date(event.start), 'd', { locale: ja })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{event.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-foreground-500">
                        <Icon icon="lucide:clock" className="w-3 h-3 mr-1" />
                        <span>
                          {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                        </span>
                        {event.location && (
                          <>
                            <span className="mx-2">•</span>
                            <Icon icon="lucide:map-pin" className="w-3 h-3 mr-1" />
                            <span>{event.location}</span>
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
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-foreground-500">
                予定がありません
              </div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CalendarView;
