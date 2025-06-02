import React from 'react';
import { Card, CardBody, CardHeader, Checkbox, Divider, Button, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Task } from '../../types';
import DateDisplay from '../common/DateDisplay';

interface TasksCardProps {
  tasks: Task[];
  isLoading?: boolean;
  onTaskComplete?: (taskId: string) => void;
}

const TasksCard: React.FC<TasksCardProps> = ({ tasks, isLoading = false, onTaskComplete }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Icon icon="lucide:flag" className="text-danger-500 w-4 h-4" />;
      case 'medium':
        return <Icon icon="lucide:flag" className="text-warning-500 w-4 h-4" />;
      case 'low':
        return <Icon icon="lucide:flag" className="text-success-500 w-4 h-4" />;
      default:
        return null;
    }
  };
  
  const handleTaskComplete = (taskId: string) => {
    if (onTaskComplete) {
      onTaskComplete(taskId);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">タスク</h3>
          <Badge color="danger" variant="flat" size="sm">
            {tasks.filter(task => task.status === 'overdue').length}
          </Badge>
        </div>
        <Button variant="light" size="sm" endContent={<Icon icon="lucide:plus" className="w-4 h-4" />}>
          タスク追加
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
            {tasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-content2 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox
                    isSelected={task.status === 'completed'}
                    onValueChange={() => handleTaskComplete(task.id)}
                    size="sm"
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium ${task.status === 'completed' ? 'text-foreground-400 line-through' : 'text-foreground'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 ml-2">
                        {getPriorityIcon(task.priority)}
                        {task.status === 'overdue' && (
                          <Badge color="danger" size="sm" variant="flat">期限超過</Badge>
                        )}
                      </div>
                    </div>
                    {task.description && (
                      <p className="text-sm text-foreground-500 mt-1 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center mt-2 text-xs text-foreground-400">
                      <Icon icon="lucide:clock" className="w-3 h-3 mr-1" />
                      <DateDisplay date={task.dueDate || task.createdAt} format="datetime" />
                    </div>
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

export default TasksCard;
