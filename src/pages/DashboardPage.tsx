import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import TimelineCard from '../components/dashboard/TimelineCard';
import TasksCard from '../components/dashboard/TasksCard';
import UpcomingEventsCard from '../components/dashboard/UpcomingEventsCard';
import RecentEmailsCard from '../components/dashboard/RecentEmailsCard';
import { mockTimelineItems, mockTasks, mockEvents, mockEmails } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTaskComplete = (taskId: string) => {
    console.log('タスク完了:', taskId);
    // API呼び出し
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={`こんにちは、${user?.name || 'ゲスト'}さん`}
        description="今日のアクティビティとタスクの概要です"
        actions={
          <Button 
            color="primary" 
            endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
          >
            タスク追加
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimelineCard 
          items={mockTimelineItems} 
          isLoading={isLoading} 
        />
        
        <TasksCard 
          tasks={mockTasks} 
          isLoading={isLoading}
          onTaskComplete={handleTaskComplete}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingEventsCard 
          events={mockEvents} 
          isLoading={isLoading} 
        />
        
        <RecentEmailsCard 
          emails={mockEmails} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default DashboardPage;
