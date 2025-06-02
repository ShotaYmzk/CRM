// src/components/calendar/CalendarView.tsx
import React from 'react';
import { Card, CardBody, CardHeader, Button, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Event } from '../../types';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, endOfWeek, getDate, isSameMonth, isToday as dateIsToday, addMonths, subMonths, subDays } from 'date-fns'; // date-fnsのインポート追加
import { ja } from 'date-fns/locale';

interface CalendarViewProps {
  events: Event[];
  isLoading?: boolean;
  currentDate: Date; // 親から受け取るように変更
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>; // 親から受け取るように変更
  onEventClick?: (event: Event) => void;
  onDateClick?: (date: Date) => void; // 新規イベント作成用
  onViewChange?: (view: 'month' | 'week' | 'list') => void;
  view: 'month' | 'week' | 'list'; // 親から受け取るように変更
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  isLoading = false,
  currentDate,
  setCurrentDate,
  onEventClick,
  onDateClick,
  onViewChange,
  view
}) => {

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(prev => subMonths(prev, 1));
    } else { // week view
      setCurrentDate(prev => subDays(prev, 7));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(prev => addMonths(prev, 1));
    } else { // week view
      setCurrentDate(prev => addDays(prev, 7));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView: 'month' | 'week' | 'list') => {
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  // 週の日付を生成
  const weekDays = React.useMemo(() => {
    if (view !== 'week') return [];
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // 月曜始まり
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  }, [currentDate, view]);

  // 月表示用のグリッド生成
  const monthGrid = React.useMemo(() => {
    if (view !== 'month') return [];
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    // カレンダーは常に6週間表示を基本とする
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(addDays(startDate, 6 * 7 -1), { weekStartsOn: 1}); // 6週間表示

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const grid: Date[][] = [];
    let currentWeek: Date[] = [];
    days.forEach((day, i) => {
      currentWeek.push(day);
      if ((i + 1) % 7 === 0) {
        grid.push(currentWeek);
        currentWeek = [];
      }
    });
    return grid;
  }, [currentDate, view]);

  // 日付ごとのイベントをグループ化
  const eventsByDate = React.useMemo(() => {
    const grouped: { [key: string]: Event[] } = {};
    const daysToRender = view === 'month' ? monthGrid.flat() : (view === 'week' ? weekDays : []);

    if (view === 'list') { // リスト表示の場合は全イベントを日付順にソート
        return { 'all': [...events].sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime()) };
    }

    daysToRender.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      grouped[dateStr] = events.filter(event => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, day);
      }).sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    });
    return grouped;
  }, [events, weekDays, monthGrid, view]);

  const getEventColor = (color?: string) => {
    // (既存のロジック)
    switch (color) {
      case '#2563eb': return 'bg-primary-100 text-primary-600 border-l-4 border-primary-500';
      case '#14b8a6': return 'bg-success-100 text-success-600 border-l-4 border-success-500';
      case '#f97316': return 'bg-warning-100 text-warning-600 border-l-4 border-warning-500';
      case '#ef4444': return 'bg-danger-100 text-danger-600 border-l-4 border-danger-500';
      default: return 'bg-foreground-100 text-foreground-600 border-l-4 border-foreground-500';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="light" isIconOnly onPress={handlePrev} aria-label="前へ">
              <Icon icon="lucide:chevron-left" className="w-5 h-5" />
            </Button>
            <Button variant="light" onPress={handleToday}>
              今日
            </Button>
            <Button variant="light" isIconOnly onPress={handleNext} aria-label="次へ">
              <Icon icon="lucide:chevron-right" className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">
              {view === 'month' && format(currentDate, 'yyyy年MM月', { locale: ja })}
              {view === 'week' && `${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy年MM月dd日')} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'MM月dd日')}`}
              {view === 'list' && format(currentDate, 'yyyy年MM月', { locale: ja }) /* リスト表示のヘッダーは適宜調整 */}
            </h2>
          </div>

          <div className="flex gap-2">
            <Tabs
              selectedKey={view}
              onSelectionChange={(key) => handleViewChange(key as 'month' | 'week' | 'list')}
              aria-label="カレンダービュー"
              size="sm"
            >
              <Tab key="month" title="月" />
              <Tab key="week" title="週" />
              <Tab key="list" title="リスト" />
            </Tabs>
            {/* 予定追加ボタンはPageHeaderに移動した想定 */}
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0 flex-1 overflow-hidden"> {/* flex-1 と overflow-hidden を追加 */}
        {isLoading ? (
          // (既存のローディング表示)
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto"> {/* スクロール可能なコンテナ */}
            {view === 'month' && (
              <div className="grid grid-cols-7 border-t border-divider h-full"> {/* h-full を追加 */}
                {['月', '火', '水', '木', '金', '土', '日'].map((dayLabel, index) => (
                  <div key={index} className="p-1 text-center border-r border-b border-divider text-xs font-medium text-foreground-500">
                    {dayLabel}
                  </div>
                ))}
                {monthGrid.flat().map((day, dayIndex) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const dayEvents = eventsByDate[dateStr] || [];
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isCurrentToday = dateIsToday(day);

                  return (
                    <div
                      key={dateStr}
                      className={`calendar-month-day-cell relative p-1 border-r border-b border-divider min-h-[100px] flex flex-col ${ // min-h と flex を追加
                        !isCurrentMonth ? 'bg-content2 text-foreground-400' : 'bg-background hover:bg-content2/50'
                      } ${isCurrentToday ? 'bg-primary-50 ring-1 ring-primary-200' : ''}`}
                      onClick={() => onDateClick && onDateClick(day)}
                    >
                      <div className={`text-xs text-right mb-0.5 ${isCurrentToday ? 'text-primary-600 font-bold' : (isCurrentMonth ? 'text-foreground-700' : 'text-foreground-400')}`}>
                        {getDate(day)}
                      </div>
                      <div className="space-y-0.5 overflow-y-auto flex-1"> {/* イベントリスト部分をスクロール可能に */}
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`calendar-event ${getEventColor(event.color)} cursor-pointer truncate text-xs px-1 py-0.5 rounded`}
                            onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                            title={event.title}
                          >
                            {event.allDay ? event.title : `${format(new Date(event.start), 'H:mm')} ${event.title}`}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-primary-500 cursor-pointer mt-0.5" onClick={(e) => { e.stopPropagation(); /* TODO: Show all events for this day or switch to list view */ }}>
                            他 {dayEvents.length - 2} 件
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {view === 'week' && (
              // (既存の週表示ロジック)
              <div className="grid grid-cols-7 border-t border-divider h-full"> {/* h-full を追加 */}
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 text-center border-r border-b border-divider ${
                      dateIsToday(day) ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="text-xs text-foreground-500">
                      {format(day, 'E', { locale: ja })}
                    </div>
                    <div className={`text-lg font-medium ${
                      dateIsToday(day) ? 'text-primary-600' : 'text-foreground'
                    }`}>
                      {format(day, 'd', { locale: ja })}
                    </div>
                  </div>
                ))}
                {weekDays.map((day, index) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const dayEvents = eventsByDate[dateStr] || [];
                  return (
                    <div
                      key={`cell-${index}`}
                      className={`calendar-day-cell border-r border-b border-divider p-1 min-h-[100px] ${ // min-h を追加
                        dateIsToday(day) ? 'bg-primary-50/30' : 'hover:bg-content2/50'
                      }`}
                      onClick={() => onDateClick && onDateClick(day)}
                    >
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`calendar-event ${getEventColor(event.color)} cursor-pointer truncate text-xs px-1 py-0.5 rounded`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                          title={event.title}
                        >
                          {event.allDay ? event.title : `${format(new Date(event.start), 'HH:mm')} ${event.title}`}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
            {view === 'list' && (
              // (既存のリスト表示ロジック)
               <div className="divide-y divide-divider">
                {eventsByDate['all']?.length > 0 ? (
                  eventsByDate['all'].map((event) => (
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
                          <span className="text-xs text-foreground-500">
                            {format(new Date(event.start), 'MM月', { locale: ja })}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{event.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-foreground-500">
                            <Icon icon="lucide:clock" className="w-3 h-3 mr-1" />
                            <span>
                              {event.allDay ? '終日' : `${format(new Date(event.start), 'HH:mm')} - ${format(new Date(event.end), 'HH:mm')}`}
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
                                {event.attendees.slice(0, 3).map((attendee, idx) => (
                                  <div
                                    key={idx}
                                    className="w-6 h-6 rounded-full bg-primary-100 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-600"
                                    title={attendee}
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
                        <div className={`w-2 h-full rounded-l-md ${getEventColor(event.color).split(' ')[0].replace('bg-', 'border-').replace('-100', '-500')}`}></div>
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
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CalendarView;