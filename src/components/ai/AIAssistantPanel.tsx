import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider, Progress, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface AIAssistantPanelProps {
  isLoading?: boolean;
  onRunAnalysis?: () => void;
  analysisResults?: {
    type: string;
    title: string;
    description: string;
    status: 'completed' | 'pending' | 'error';
    progress?: number;
  }[];
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
  isLoading = false,
  onRunAnalysis,
  analysisResults = []
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon icon="lucide:sparkles" className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-semibold">AIアシスタント</h2>
        </div>
        <Button 
          color="primary" 
          isLoading={isLoading}
          onPress={onRunAnalysis}
          isDisabled={isLoading}
          startContent={!isLoading && <Icon icon="lucide:play" className="w-4 h-4" />}
        >
          分析実行
        </Button>
      </CardHeader>
      <Divider />
      <CardBody>
        {analysisResults.length > 0 ? (
          <div className="space-y-6">
            {analysisResults.map((result, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground">{result.title}</h3>
                  <Chip 
                    size="sm" 
                    color={
                      result.status === 'completed' ? 'success' : 
                      result.status === 'error' ? 'danger' : 
                      'warning'
                    }
                    variant="flat"
                  >
                    {result.status === 'completed' ? '完了' : 
                     result.status === 'error' ? 'エラー' : 
                     '処理中'}
                  </Chip>
                </div>
                <p className="text-sm text-foreground-500">{result.description}</p>
                {result.status === 'pending' && result.progress !== undefined && (
                  <Progress 
                    value={result.progress} 
                    color="primary" 
                    size="sm" 
                    className="mt-2"
                    aria-label={`${result.title}の進捗`}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-primary-50 rounded-full p-4 mb-4">
              <Icon icon="lucide:sparkles" className="w-10 h-10 text-primary-500" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">AIアシスタントを活用</h3>
            <p className="text-foreground-500 max-w-md mb-6">
              データの分析、要約、次のアクションの提案などをAIが自動的に行います。「分析実行」ボタンをクリックして開始してください。
            </p>
            <Button 
              color="primary" 
              onPress={onRunAnalysis}
              startContent={<Icon icon="lucide:play" className="w-4 h-4" />}
            >
              分析実行
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default AIAssistantPanel;
