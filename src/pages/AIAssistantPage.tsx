// src/pages/AIAssistantPage.tsx
import React from 'react';
import { Button, Card, CardBody, CardHeader, Divider, Progress, Chip, Tabs, Tab, Select, SelectItem, Textarea, Tooltip, Badge, Kbd, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import AIAssistantPanel from '../components/ai/AIAssistantPanel'; // メインの分析実行・結果表示
import { addToast } from '@heroui/react';
import { mockContacts, mockDeals, mockEmails } from '../utils/mockData'; // CRMデータ例
import LoadingSpinner from '../components/common/LoadingSpinner';

// AI機能の型定義
type AIFeature = 'data_summary' | 'next_action' | 'duplicate_detection' | 'email_draft' | 'meeting_summary' | 'sentiment_analysis';

interface AIFeatureConfig {
  id: AIFeature;
  title: string;
  description: string;
  icon: string;
  requiresInput?: 'email_content' | 'meeting_transcript' | 'contact_id' | 'deal_id';
  inputLabel?: string;
  status?: 'beta' | 'new';
}

const aiFeatures: AIFeatureConfig[] = [
  { id: 'data_summary', title: 'CRMデータ全体要約', description: 'あなたの担当データ全体の傾向を分析し、重要なポイントを要約します。', icon: 'lucide:clipboard-list' },
  { id: 'next_action', title: '次のアクション提案', description: '優先度の高いタスク、フォローアップが必要な連絡先やディールを提案します。', icon: 'lucide:list-checks' },
  { id: 'duplicate_detection', title: '重複データ検出', description: '連絡先や企業データの重複候補を検出し、整理を支援します。', icon: 'lucide:copy-check', status: 'beta' },
  { id: 'email_draft', title: 'メール作成支援', description: '簡単な指示やキーワードから、プロフェッショナルなメール文面をAIが作成します。', icon: 'lucide:mail-plus', requiresInput: 'contact_id', inputLabel: '送信先の連絡先を選択してください' },
  { id: 'meeting_summary', title: '会議議事録要約', description: '会議の録音やテキストから、主要な決定事項やタスクを抽出・要約します。', icon: 'lucide:file-text', requiresInput: 'meeting_transcript', inputLabel: '会議のテキストまたは音声ファイルをアップロード', status: 'new' },
  { id: 'sentiment_analysis', title: '顧客感情分析', description: '指定したメールの内容から、顧客の感情（ポジティブ/ネガティブなど）を分析します。', icon: 'lucide:smile-plus', requiresInput: 'email_content', inputLabel: '分析したいメールの本文を入力してください' },
];

// 分析結果のサンプル型 (より具体的に)
interface AnalysisResultItem {
  id: string;
  type: AIFeature; // またはより詳細なタイプ
  title: string;
  summary?: string;
  details?: any; // 重複候補のリスト、提案されたタスクなど
  status: 'completed' | 'pending' | 'error' | 'action_required';
  progress?: number;
  actions?: { label: string; onClick: () => void; icon?: string; color?: 'primary' | 'danger' | 'default' }[];
  relatedData?: { type: 'contact' | 'deal' | 'email', id: string, name: string }[];
}


const AIAssistantPage: React.FC = () => {
  const [mainTaskLoading, setMainTaskLoading] = React.useState(false);
  const [analysisResults, setAnalysisResults] = React.useState<AnalysisResultItem[]>([]);
  const [selectedFeature, setSelectedFeature] = React.useState<AIFeature | null>(null);
  const [featureInput, setFeatureInput] = React.useState('');
  const [featureOutput, setFeatureOutput] = React.useState<string | null>(null);
  const [featureLoading, setFeatureLoading] = React.useState(false);
  const [selectedContactId, setSelectedContactId] = React.useState<string | undefined>(undefined);


  const handleRunOverallAnalysis = async () => {
    setMainTaskLoading(true);
    setAnalysisResults([]); // 結果をリセット

    // Simulate API calls for different analyses
    const newResults: AnalysisResultItem[] = [
      { id: 'summary-1', type: 'data_summary', title: '週次パフォーマンス要約', status: 'pending', progress: 0 },
      { id: 'action-1', type: 'next_action', title: '優先対応ディール (3件)', status: 'pending', progress: 0 },
      { id: 'duplicate-1', type: 'duplicate_detection', title: '連絡先の重複候補 (2件)', status: 'pending', progress: 0 },
    ];
    setAnalysisResults(newResults);

    // --- データ要約シミュレーション ---
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnalysisResults(prev => prev.map(r => r.id === 'summary-1' ? { ...r, progress: 30 } : r));
    await new Promise(resolve => setTimeout(resolve, 800));
    setAnalysisResults(prev => prev.map(r => r.id === 'summary-1' ? {
      ...r, progress: 100, status: 'completed',
      summary: `今週は新規リード獲得数が前週比15%増加しました。主要ディール「プロジェクトX」の進捗は70%です。山田様へのフォローアップが推奨されます。`,
      actions: [{ label: "詳細レポート表示", onClick: () => console.log("Show detailed report for summary-1") }]
    } : r));

    // --- 次のアクション提案シミュレーション ---
    await new Promise(resolve => setTimeout(resolve, 600));
    setAnalysisResults(prev => prev.map(r => r.id === 'action-1' ? { ...r, progress: 50 } : r));
    await new Promise(resolve => setTimeout(resolve, 900));
    const highPriorityDeals = mockDeals.filter(d => d.probability > 60).slice(0, 3);
    setAnalysisResults(prev => prev.map(r => r.id === 'action-1' ? {
      ...r, progress: 100, status: 'action_required',
      summary: `以下のディールは確度が高く、早急な対応が推奨されます。`,
      details: highPriorityDeals.map(deal => ({ id: deal.id, name: deal.title, probability: deal.probability, amount: deal.amount, company: deal.company?.name })),
      relatedData: highPriorityDeals.map(deal => ({type: 'deal', id: deal.id, name: deal.title})),
      actions: [
        ...highPriorityDeals.map(deal => ({
          label: `${deal.title} のタスク作成`,
          icon: "lucide:plus-circle",
          onClick: () => addToast({ title: "機能デモ", description: `${deal.title} のタスク作成画面へ遷移します。`})
        })),
      ]
    } : r));

    // --- 重複データ検出シミュレーション ---
    await new Promise(resolve => setTimeout(resolve, 700));
    setAnalysisResults(prev => prev.map(r => r.id === 'duplicate-1' ? { ...r, progress: 60 } : r));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const duplicateContacts = [mockContacts[0], { ...mockContacts[1], email: mockContacts[0].email, id:"dup-c2" }]; // サンプル重複
    setAnalysisResults(prev => prev.map(r => r.id === 'duplicate-1' ? {
      ...r, progress: 100, status: 'action_required',
      summary: `${duplicateContacts.length}件の連絡先に重複の可能性があります。`,
      details: duplicateContacts.map(c => ({ id: c.id, name: c.fullName, email: c.email, company: c.company?.name })),
      relatedData: duplicateContacts.map(c=> ({type: 'contact', id:c.id, name: c.fullName})),
      actions: [
        { label: "重複候補を確認・マージ", icon: "lucide:git-merge", onClick: () => addToast({ title: "機能デモ", description: "重複解決画面へ遷移します。"}), color: "primary" },
      ]
    } : r));

    addToast({ title: 'AI分析完了', description: 'CRM全体の分析が完了しました。', color: 'success' });
    setMainTaskLoading(false);
  };

  const handleRunFeature = async () => {
    if (!selectedFeature) return;
    const featureConfig = aiFeatures.find(f => f.id === selectedFeature);
    if (!featureConfig) return;

    setFeatureLoading(true);
    setFeatureOutput(null);
    // Simulate API call for the selected feature
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    let outputText = `「${featureConfig.title}」の実行結果:\n`;
    switch (selectedFeature) {
      case 'email_draft':
        const contact = mockContacts.find(c => c.id === selectedContactId);
        outputText += `宛先: ${contact ? contact.fullName : '未選択の連絡先'}\n件名: 【AI提案】〇〇に関するご確認のお願い\n\n${contact ? contact.lastName : ''}様\n\nいつもお世話になっております。\n[ここに本文の提案]...\n\n入力内容: ${featureInput || '(特記事項なし)'}`;
        break;
      case 'meeting_summary':
        outputText += `会議の主要な決定事項:\n1. プロジェクトAの予算承認\n2. 新機能Bの開発開始\n\nアクションアイテム:\n- 山田さん: C資料作成 (期日: 来週月曜)\n\n入力テキストの冒頭: ${featureInput.substring(0,50)}...`;
        break;
      case 'sentiment_analysis':
        const sentiment = Math.random() > 0.5 ? "ポジティブ" : (Math.random() > 0.5 ? "ニュートラル" : "ネガティブ");
        outputText += `分析対象メール:\n${featureInput.substring(0,100)}...\n\n感情分析結果: ${sentiment} (信頼度: ${Math.floor(Math.random()*30+70)}%)`;
        break;
      default:
        outputText += `「${featureConfig.title}」は現在開発中です。入力: ${featureInput}`;
    }
    setFeatureOutput(outputText);
    setFeatureLoading(false);
    addToast({ title: `${featureConfig.title} 完了`, color: 'success' });
  };


  const renderFeatureInput = () => {
    const config = aiFeatures.find(f => f.id === selectedFeature);
    if (!config || !config.requiresInput) return null;

    switch (config.requiresInput) {
        case 'email_content':
        case 'meeting_transcript':
            return <Textarea label={config.inputLabel || "入力してください"} value={featureInput} onValueChange={setFeatureInput} minRows={5} placeholder="ここにテキストを入力またはペーストしてください..." />;
        case 'contact_id':
            return <Select label={config.inputLabel || "対象を選択"} placeholder="連絡先を選択" selectedKeys={selectedContactId ? [selectedContactId] : []} onSelectionChange={(keys) => setSelectedContactId(Array.from(keys)[0] as string)}>
                {mockContacts.map(contact => (
                  <SelectItem key={contact.id}>{contact.fullName}</SelectItem>
                ))}
            </Select>;
        // deal_id の場合なども追加可能
        default:
            return <Input label={config.inputLabel || "入力"} value={featureInput} onValueChange={setFeatureInput} />;
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AIアシスタント"
        description="CRMデータをAIが分析し、業務効率化を支援します。"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側: メインの分析実行と結果表示 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                <Icon icon="lucide:brain" className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-semibold">総合分析 & インサイト</h2>
                </div>
                <Tooltip content="CRMデータ全体を分析し、傾向やアクションを提案します。">
                    <Button
                    color="primary"
                    isLoading={mainTaskLoading}
                    onPress={handleRunOverallAnalysis}
                    isDisabled={mainTaskLoading}
                    startContent={!mainTaskLoading && <Icon icon="lucide:play" className="w-4 h-4" />}
                    >
                    総合分析を実行
                    </Button>
                </Tooltip>
            </CardHeader>
            <Divider />
            <CardBody>
              {mainTaskLoading && analysisResults.length === 0 && <LoadingSpinner message="AIが分析中です..." />}
              {!mainTaskLoading && analysisResults.length === 0 && (
                <div className="text-center py-12 text-foreground-500">
                  <Icon icon="lucide:search-check" className="w-12 h-12 mx-auto mb-3 text-foreground-300" />
                  <p className="mb-4">「総合分析を実行」ボタンをクリックして、<br />あなたのCRMデータからインサイトを得ましょう。</p>
                  <p className="text-xs">分析には数秒かかる場合があります。</p>
                </div>
              )}
              <div className="space-y-6">
                {analysisResults.map(result => (
                  <Card key={result.id} className={`${result.status === 'action_required' ? 'bg-primary-50 border-primary-200' : 'bg-content2'}`}>
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <Icon icon={
                            result.type === 'data_summary' ? 'lucide:bar-chart-3' :
                            result.type === 'next_action' ? 'lucide:list-todo' :
                            result.type === 'duplicate_detection' ? 'lucide:copyleft' : 'lucide:zap'
                          } className="w-5 h-5 text-primary-600" />
                          <h3 className="font-semibold text-md">{result.title}</h3>
                        </div>
                        <Chip
                          size="sm"
                          color={result.status === 'completed' ? 'success' : result.status === 'error' ? 'danger' : result.status === 'action_required' ? 'primary' : 'warning'}
                          variant="flat"
                        >
                          {result.status === 'completed' ? '完了' : result.status === 'error' ? 'エラー' : result.status === 'action_required' ? '対応推奨' : '処理中'}
                        </Chip>
                      </div>
                    </CardHeader>
                    {result.progress !== undefined && result.status === 'pending' && (
                        <Progress value={result.progress} color="primary" size="sm" aria-label={`${result.title}の進捗`} className="absolute bottom-0 left-0 right-0 rounded-none" />
                    )}
                    <Divider/>
                    <CardBody className="py-3 px-4">
                      {result.summary && <p className="text-sm text-foreground-600 mb-2">{result.summary}</p>}
                      {result.details && result.type === 'next_action' && Array.isArray(result.details) && (
                        <ul className="space-y-1 text-sm mb-2">
                          {result.details.map((item: any) => <li key={item.id} className="hover:bg-content1 p-1 rounded-md"><strong>{item.name}</strong> ({item.company || 'N/A'}) - 確度: {item.probability}%</li>)}
                        </ul>
                      )}
                      {result.details && result.type === 'duplicate_detection' && Array.isArray(result.details) && (
                        <ul className="space-y-1 text-sm mb-2">
                          {result.details.map((item: any) => <li key={item.id} className="hover:bg-content1 p-1 rounded-md">{item.name} ({item.email}) - {item.company || 'N/A'}</li>)}
                        </ul>
                      )}
                       {result.actions && result.actions.length > 0 && (
                        <div className="flex gap-2 mt-3 pt-3 border-t border-divider">
                          {result.actions.map((action, idx) => (
                            <Button key={idx} size="sm" variant="flat" color={action.color || "default"} onPress={action.onClick} startContent={action.icon && <Icon icon={action.icon} />}>
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* 右側: 個別AI機能の実行 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sparkles" className="w-6 h-6 text-secondary-500" />
                <h2 className="text-xl font-semibold">個別AIツール</h2>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Tabs
                aria-label="AI機能選択"
                items={aiFeatures}
                selectedKey={selectedFeature}
                onSelectionChange={(key) => {setSelectedFeature(key as AIFeature); setFeatureInput(''); setFeatureOutput(null); setSelectedContactId(undefined);}}
                variant="underlined"
                color="primary"
              >
                {(item) => (
                  <Tab key={item.id} title={
                    <div className="flex items-center gap-1.5">
                        <Icon icon={item.icon} />
                        {item.title}
                        {item.status === 'beta' && <Chip size="sm" color="warning" variant="flat">Beta</Chip>}
                        {item.status === 'new' && <Chip size="sm" color="success" variant="flat">New</Chip>}
                    </div>
                  }>
                    <div className="py-4 space-y-4">
                      <p className="text-sm text-foreground-500">{item.description}</p>
                      {item.requiresInput && renderFeatureInput()}
                      {item.requiresInput && (
                        <div className="mt-1 text-xs text-foreground-400">
                            {item.id === 'email_draft' && "ヒント: 送信先を選択後、作成したいメールの概要やキーワード（例:「新機能の案内」「アポイントのお礼」など）を入力してください。"}
                        </div>
                      )}
                      <Button
                        color="secondary"
                        onPress={handleRunFeature}
                        isLoading={featureLoading}
                        isDisabled={featureLoading || (item.requiresInput && !featureInput && !selectedContactId)} // 入力が必要な場合、入力がないと無効
                        startContent={!featureLoading && <Icon icon="lucide:play-circle" />}
                        className="w-full"
                      >
                        {item.title}を実行
                      </Button>
                      {featureLoading && <LoadingSpinner message="AIが処理中です..." />}
                      {featureOutput && (
                        <Card className="bg-content1 mt-4">
                          <CardHeader><h4 className="font-medium">AIからの出力:</h4></CardHeader>
                          <Divider/>
                          <CardBody>
                            <pre className="whitespace-pre-wrap text-sm p-2 bg-content2 rounded-md overflow-x-auto">{featureOutput}</pre>
                          </CardBody>
                        </Card>
                      )}
                    </div>
                  </Tab>
                )}
              </Tabs>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Icon icon="lucide:history" className="w-5 h-5 text-foreground-500" />
                    <h2 className="text-lg font-medium">AI利用履歴 (簡易版)</h2>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="text-sm text-foreground-500">
                <p>・総合分析 (2分前)</p>
                <p>・メール作成支援: 山田様向け (5分前)</p>
                <p className="mt-2"><Button size="sm" variant="light">全履歴を表示...</Button></p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;