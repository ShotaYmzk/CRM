import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-foreground-100 rounded-full p-6 mb-6">
        <Icon icon="lucide:file-question" className="w-16 h-16 text-foreground-400" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">ページが見つかりません</h1>
      <p className="text-foreground-500 max-w-md mb-8">
        お探しのページは存在しないか、移動された可能性があります。URLを確認するか、以下のボタンからナビゲートしてください。
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          color="primary" 
          onPress={handleGoHome}
          startContent={<Icon icon="lucide:home" className="w-4 h-4" />}
        >
          ホームに戻る
        </Button>
        <Button 
          variant="flat" 
          onPress={handleGoBack}
          startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}
        >
          前のページに戻る
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
