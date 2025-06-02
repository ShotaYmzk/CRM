import React from 'react';
import { Button, Card, CardBody, CardHeader, Divider, Progress, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import AIAssistantPanel from '../components/ai/AIAssistantPanel';
import { addToast } from '@heroui/react';

const AIAssistantPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysisResults, setAnalysisResults] = React.useState<any[]>([]);
  
  const handleRunAnalysis = async () => {
    setIsLoading(true);
    
    // 分析結果をリセット
    setAnalysisResults([
      {
        type: 'summary',
        title: 'データ要約',
        description: 'メールと連絡先データから重要な情報を抽出しています',
        status: 'pending',
        progress: 0
      },
      {
        type: 'actions',
        title: '次のアクション提案',
        description: '優先度の高いタスクと次のアクションを提案しています',
        status: 'pending',
        progress: 0
      },
      {
        type: 'duplicates',
        title: '重複検知',
        description: '連絡先と会社データの重複を検出しています',
        status: 'pending',
        progress: 0
      }
    ]);
    
    // 進捗のシミュレーション
    const updateProgress = (index: number, progress: number) => {
      setAnalysisResults(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], progress };
        return updated;
      });
    };
    
    const completeTask = (index: number) => {
      setAnalysisResults(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: 'completed', progress: 100 };
        return updated;
      });
    };
    
    // タスク1: データ要約
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateProgress(0, i);
    }
    completeTask(0);
    
    // タスク2: 次のアクション提案
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      updateProgress(1, i);
    }
    completeTask(1);
    
    // タスク3: 重複検知 (エラーをシミュレート)
    for (let i = 0; i <= 60; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 150));
      updateProgress(2, i);
    }
    
    setAnalysisResults(prev => {
      const updated = [...prev];
      updated[2] = { ...updated[2], status: 'error', progress: 60 };
      return updated;
    });
    
    addToast({
      title: 'エラー',
      description: '重複検知の処理中にエラーが発生しました',
      color: 'danger'
    });
    
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="AIアシスタント"
        description="AIを活用してデータ分析と自動化を行います"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIAssistantPanel
            isLoading={isLoading}
            onRunAnalysis={handleRunAnalysis}
            analysisResults={analysisResults}
          />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">AI機能</h2>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:sparkles" className="w-5 h-5 text-primary-500" />
                  <h3 className="font-medium">データ要約</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  メール、連絡先、ディールデータから重要な情報を抽出し、要約します。
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:check-circle" className="w-5 h-5 text-primary-500" />
                  <h3 className="font-medium">次のアクション提案</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  優先度の高いタスクと次に取るべきアクションを提案します。
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:copy" className="w-5 h-5 text-primary-500" />
                  <h3 className="font-medium">重複検知</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  連絡先と会社データの重複を検出し、マージを提案します。
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-lg font-medium">使用状況</h2>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground-500">API使用量</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} color="primary" size="sm" aria-label="API使用量" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground-500">ストレージ</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <Progress value={42} color="success" size="sm" aria-label="ストレージ使用量" />
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="flat" 
                  color="primary"
                  className="w-full"
                  endContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
                >
                  使用状況の詳細を表示
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
