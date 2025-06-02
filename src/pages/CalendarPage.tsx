// src/pages/CalendarPage.tsx
import React from 'react';
import { Button, Drawer, DrawerContent, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Checkbox, DatePicker, Select, SelectItem, addToast } from '@heroui/react'; // Modal関連とフォーム要素をインポート
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import CalendarView from '../components/calendar/CalendarView';
import EventDetailPanel from '../components/calendar/EventDetailPanel';
import { mockEvents, mockUsers } from '../utils/mockData'; // mockUsersもインポート
import { Event } from '../types';
import { format, parseISO } from 'date-fns'; // parseISOを追加
import { CalendarDate } from '@internationalized/date';

// 新規作成: EventForm コンポーネント (CalendarPage内に定義するか別ファイル)
interface EventFormProps {
  event?: Event | null; // 編集対象イベント、または新規作成のための日付情報
  defaultDate?: Date;
  users: { id: string, name: string }[]; // 参加者選択用
  onSave: (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, defaultDate, users, onSave, onClose }) => {
  const [title, setTitle] = React.useState(event?.title || '');
  const [startDate, setStartDate] = React.useState<Date | null>(event ? parseISO(event.start) : (defaultDate || new Date()));
  const [startTime, setStartTime] = React.useState(event && !event.allDay ? format(parseISO(event.start), 'HH:mm') : '09:00');
  const [endDate, setEndDate] = React.useState<Date | null>(event ? parseISO(event.end) : (defaultDate || new Date()));
  const [endTime, setEndTime] = React.useState(event && !event.allDay ? format(parseISO(event.end), 'HH:mm') : '10:00');
  const [allDay, setAllDay] = React.useState(event?.allDay || false);
  const [location, setLocation] = React.useState(event?.location || '');
  const [description, setDescription] = React.useState(event?.description || '');
  const [attendees, setAttendees] = React.useState<Set<string>>(new Set(event?.attendees || []));
  const [color, setColor] = React.useState(event?.color || '#2563eb');

  const handleSubmit = () => {
    if (!title.trim()) {
      addToast({ title: "エラー", description: "タイトルを入力してください。", color: "danger" });
      return;
    }
    if (!startDate || !endDate) {
        addToast({ title: "エラー", description: "開始日と終了日を入力してください。", color: "danger" });
        return;
    }

    let finalStart = new Date(startDate);
    let finalEnd = new Date(endDate);

    if (!allDay) {
        const [startH, startM] = startTime.split(':').map(Number);
        finalStart.setHours(startH, startM, 0, 0);

        const [endH, endM] = endTime.split(':').map(Number);
        finalEnd.setHours(endH, endM, 0, 0);
    } else {
        finalStart.setHours(0,0,0,0);
        finalEnd.setHours(23,59,59,999);
    }

    if (finalEnd <= finalStart) {
        addToast({ title: "エラー", description: "終了日時は開始日時より後に設定してください。", color: "danger" });
        return;
    }

    const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> & { id?: string } = {
      id: event?.id,
      title,
      start: finalStart.toISOString(),
      end: finalEnd.toISOString(),
      allDay,
      location,
      description,
      attendees: Array.from(attendees),
      contactIds: [], // 必要に応じてcontactIdsも管理
      color,
    };
    onSave(eventData);
  };

  const eventColors = [
    { label: 'デフォルト (青)', value: '#2563eb' },
    { label: '成功 (緑)', value: '#14b8a6' },
    { label: '警告 (オレンジ)', value: '#f97316' },
    { label: '危険 (赤)', value: '#ef4444' },
    { label: '重要 (紫)', value: '#8b5cf6' },
  ];

  return (
    <>
      <ModalHeader>
        <h3 className="text-lg font-medium">{event?.id ? '予定の編集' : '予定の追加'}</h3>
      </ModalHeader>
      <ModalBody className="space-y-4">
        <Input label="タイトル" value={title} onValueChange={setTitle} placeholder="会議名など" isRequired />
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="開始日"
            value={startDate ? new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) : null}
            onChange={cd => setStartDate(cd ? new Date(cd.year, cd.month - 1, cd.day) : null)}
          />
          <Input label="開始時刻" type="time" value={startTime} onValueChange={setStartTime} isDisabled={allDay} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="終了日"
            value={endDate ? new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()) : null}
            onChange={cd => setEndDate(cd ? new Date(cd.year, cd.month - 1, cd.day) : null)}
          />
          <Input label="終了時刻" type="time" value={endTime} onValueChange={setEndTime} isDisabled={allDay} />
        </div>
        <Checkbox isSelected={allDay} onValueChange={setAllDay}>終日</Checkbox>
        <Input label="場所" value={location} onValueChange={setLocation} placeholder="会議室名やURL" />
        <Textarea label="説明" value={description} onValueChange={setDescription} placeholder="予定の詳細" minRows={3} />
        <Select
          label="参加者"
          selectionMode="multiple"
          selectedKeys={attendees}
          onSelectionChange={setAttendees as any}
          placeholder="参加者を選択"
          items={mockUsers.map(u => ({ key: u.email, label: u.name, value: u.email }))} // 実際のユーザーリストを使用
        >
          {(item: any) => <SelectItem key={item.key} textValue={item.label}>{item.label}</SelectItem>}
        </Select>
        <Select
            label="イベントカラー"
            selectedKeys={color ? [color] : []}
            onSelectionChange={(keys) => setColor(Array.from(keys)[0] as string)}
        >
            {eventColors.map(c => <SelectItem key={c.value} textValue={c.label}>{c.label}</SelectItem>)}
        </Select>
      </ModalBody>
      <ModalFooter>
        <Button variant="flat" onPress={onClose}>キャンセル</Button>
        <Button color="primary" onPress={handleSubmit}>保存</Button>
      </ModalFooter>
    </>
  );
};


const CalendarPage: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>(mockEvents); // イベントリストの状態管理
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState<'month' | 'week' | 'list'>('month');
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);

  const [isEventFormOpen, setIsEventFormOpen] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<Event | null>(null); // 編集中のイベント
  const [formDefaultDate, setFormDefaultDate] = React.useState<Date | undefined>(undefined); // 新規作成時のデフォルト日付

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // setEvents(mockEvents); // 初期データセットは初回のみで良いかも
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (newView: 'month' | 'week' | 'list') => {
    setView(newView);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailDrawerOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setEditingEvent(null); // 新規作成モード
    setFormDefaultDate(date);
    setIsEventFormOpen(true);
  };

  const handleCloseDetailDrawer = () => {
    setIsDetailDrawerOpen(false);
  };

  const handleOpenEditForm = (eventToEdit: Event) => {
    setSelectedEvent(null); // 詳細パネルは閉じる
    setIsDetailDrawerOpen(false);
    setEditingEvent(eventToEdit);
    setFormDefaultDate(undefined);
    setIsEventFormOpen(true);
  };

  const handleCloseEventForm = () => {
    setIsEventFormOpen(false);
    setEditingEvent(null);
    setFormDefaultDate(undefined);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (eventData.id) { // 編集
        setEvents(prevEvents =>
          prevEvents.map(e =>
            e.id === eventData.id ? { ...e, ...eventData, updatedAt: new Date().toISOString() } : e
          )
        );
        addToast({ title: "成功", description: "予定が更新されました。", color: "success" });
      } else { // 新規作成
        const newEvent: Event = {
          ...eventData,
          id: `evt-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setEvents(prevEvents => [...prevEvents, newEvent]);
        addToast({ title: "成功", description: "予定が追加されました。", color: "success" });
      }
      setIsLoading(false);
      handleCloseEventForm();
    }, 500);
  };

  const handleDeleteEvent = (eventId: string) => {
    setIsLoading(true);
    setTimeout(() => {
        setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
        addToast({ title: "成功", description: "予定が削除されました。", color: "default" });
        setIsLoading(false);
        setIsDetailDrawerOpen(false);
        setSelectedEvent(null);
    }, 500);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col"> {/* 高さを調整 */}
      <PageHeader
        title="カレンダー"
        description="予定と会議を管理"
        actions={
          <Button
            color="primary"
            endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
            onPress={() => {
                setEditingEvent(null);
                setFormDefaultDate(new Date()); // 今日の日付でフォームを開く
                setIsEventFormOpen(true);
            }}
          >
            予定追加
          </Button>
        }
      />

      <div className="flex-1 overflow-hidden"> {/* CalendarViewを囲むdivにflex-1とoverflow-hidden */}
        <CalendarView
          events={events}
          isLoading={isLoading}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
          onViewChange={handleViewChange}
        />
      </div>

      <Drawer
        isOpen={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
        placement="right"
        size="sm"
      >
        <DrawerContent>
          {selectedEvent && (
            <EventDetailPanel
              event={selectedEvent}
              onClose={handleCloseDetailDrawer}
              onEdit={() => handleOpenEditForm(selectedEvent)} // 編集フォームを開く
              onDelete={handleDeleteEvent}
            />
          )}
        </DrawerContent>
      </Drawer>

      <Modal isOpen={isEventFormOpen} onOpenChange={setIsEventFormOpen} size="2xl">
        <ModalContent>
          <EventForm
            event={editingEvent}
            defaultDate={formDefaultDate}
            users={mockUsers} // 実際のユーザーリストを渡す
            onSave={handleSaveEvent}
            onClose={handleCloseEventForm}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarPage;