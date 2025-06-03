import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import EmailDetail from '../components/emails/EmailDetail';
import { mockEmails } from '../utils/mockData';
import { Email } from '../types';
import { aiSummarize } from '../utils/api';

const EmailDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState<Email | null>(null);
  const [aiSummaryText, setAiSummaryText] = React.useState<string>('');
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      // メールデータを取得
      const foundEmail = mockEmails.find(e => e.id === id);
      
      if (foundEmail) {
        setEmail(foundEmail);
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleBack = () => {
    navigate('/emails');
  };
  
  const handleAiSummarize = async () => {
    if (!email) return;
    
    setIsAiLoading(true);
    
    try {
      // 実際のAPIの代わりにモックデータを使用
      // const summary = await aiSummarize(email.body);
      
      // モックのAI要約を生成
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockSummary = `このメールでは、${email.subject}について説明されています。送信者は提案書を作成し、添付ファイルとして送付しています。受信者に確認と質問を求めています。重要なポイントとして、提案内容の詳細確認と今後のミーティングについて言及されています。`;
      
      setAiSummaryText(mockSummary);
    } catch (error) {
      console.error('AI要約エラー:', error);
      addToast({
        title: 'エラー',
        description: 'AIサービスが応答しませんでした',
        color: 'danger'
      });
    } finally {
      setIsAiLoading(false);
    }
  };
  
  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // メールが見つからない場合の表示
  if (!email) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">メールが見つかりません</h2>
        <p className="text-foreground-500 mb-6">
          指定されたIDのメールは存在しないか、削除された可能性があります。
        </p>
        <Button color="primary" onPress={handleBack} startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}>
          メール一覧に戻る
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={email?.subject || 'メール詳細'}
        actions={
          <Button 
            variant="flat" 
            onPress={handleBack}
            startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}
          >
            戻る
          </Button>
        }
      />
      
      <EmailDetail
        email={email}
        isLoading={isLoading}
        aiSummary={aiSummaryText}
        onAiSummarize={handleAiSummarize}
        isAiLoading={isAiLoading}
      />
    </div>
  );
};

export default EmailDetailPage;
