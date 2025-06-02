import React from 'react';
import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';
import { ja } from 'date-fns/locale';

interface DateDisplayProps {
  date: string;
  format?: 'relative' | 'full' | 'date' | 'time' | 'datetime';
  className?: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date, format: displayFormat = 'relative', className = '' }) => {
  const dateObj = new Date(date);
  
  const formatDate = () => {
    if (displayFormat === 'full') {
      return format(dateObj, 'yyyy年MM月dd日 HH:mm', { locale: ja });
    }
    
    if (displayFormat === 'date') {
      return format(dateObj, 'yyyy年MM月dd日', { locale: ja });
    }
    
    if (displayFormat === 'time') {
      return format(dateObj, 'HH:mm', { locale: ja });
    }
    
    if (displayFormat === 'datetime') {
      return format(dateObj, 'MM月dd日 HH:mm', { locale: ja });
    }
    
    // relative format
    if (isToday(dateObj)) {
      return `今日 ${format(dateObj, 'HH:mm')}`;
    }
    
    if (isYesterday(dateObj)) {
      return `昨日 ${format(dateObj, 'HH:mm')}`;
    }
    
    if (isThisWeek(dateObj)) {
      return format(dateObj, 'EEEE HH:mm', { locale: ja });
    }
    
    if (isThisYear(dateObj)) {
      return format(dateObj, 'MM月dd日', { locale: ja });
    }
    
    return format(dateObj, 'yyyy年MM月dd日', { locale: ja });
  };
  
  return <span className={className}>{formatDate()}</span>;
};

export default DateDisplay;
