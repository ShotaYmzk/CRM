import React from 'react';
import { Button, Drawer, DrawerContent } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import CalendarView from '../components/calendar/CalendarView';
import EventDetailPanel from '../components/calendar/EventDetailPanel';
import { mockEvents } from '../utils/mockData';
import { Event } from '../types';

const CalendarPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [view, setView] = React.useState<'week' | 'list'>('week');
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleViewChange = (newView: 'week' | 'list') => {
    setView(newView);
  };
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };
  
  const handleDateClick = (date: Date) => {
    console.log('日付クリック:', date);
    // 予定作成モーダルを表示など
  };
  
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  
  const handleEditEvent = (event: Event) => {
    console.log('予定編集:', event);
    // 予定編集モーダルを表示など
  };
  
  const handleDeleteEvent = (eventId: string) => {
    console.log('予定削除:', eventId);
    // 予定削除確認モーダルを表示など
    setIsDrawerOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="カレンダー"
        description="予定と会議を管理"
        actions={
          <Button 
            color="primary" 
            endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
          >
            予定追加
          </Button>
        }
      />
      
      <CalendarView
        events={mockEvents}
        isLoading={isLoading}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        onViewChange={handleViewChange}
      />
      
      <Drawer 
        isOpen={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        placement="right"
        size="sm"
      >
        <DrawerContent>
          {selectedEvent && (
            <EventDetailPanel
              event={selectedEvent}
              onClose={handleCloseDrawer}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CalendarPage;
