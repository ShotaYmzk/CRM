import React from 'react';
import { Card, CardBody, Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

const ApiSettings: React.FC = () => {
  const [apiKey, setApiKey] = React.useState('sk_test_1a2b3c4d5e6f7g8h9i0j');
  const [showApiKey, setShowApiKey] = React.useState(false);
  
  const handleGenerateNewKey = () => {
    // 新しいAPIキーを生成
    const newKey = 'sk_test_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // コピー成功通知を表示
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">API設定</h2>
      
      <div className="space-y-6">
        <Card>
          <CardBody className="space-y-4">
            <div>
              <h3 className="font-medium">APIキー</h3>
              <p className="text-sm text-foreground-500">
                このキーを使用して、Re:CRM APIにアクセスできます。キーは安全に保管してください。
              </p>
            </div>
            
            <div className="flex gap-2">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className="font-mono"
                endContent={
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    onPress={() => setShowApiKey(!showApiKey)}
                  >
                    <Icon icon={showApiKey ? "lucide:eye-off" : "lucide:eye"} className="w-4 h-4" />
                  </Button>
                }
              />
              <Button 
                variant="flat"
                onPress={handleCopyApiKey}
                startContent={<Icon icon="lucide:copy" className="w-4 h-4" />}
              >
                コピー
              </Button>
            </div>
            
            <div>
              <Button 
                color="primary" 
                variant="flat"
                onPress={handleGenerateNewKey}
                startContent={<Icon icon="lucide:refresh-cw" className="w-4 h-4" />}
              >
                新しいキーを生成
              </Button>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="space-y-4">
            <div>
              <h3 className="font-medium">Webhook設定</h3>
              <p className="text-sm text-foreground-500">
                イベント発生時に通知を受け取るためのWebhook URLを設定します。
              </p>
            </div>
            
            <Input
              label="Webhook URL"
              placeholder="https://example.com/webhook"
            />
            
            <div className="flex gap-2">
              <Button variant="flat">
                キャンセル
              </Button>
              <Button color="primary">
                保存
              </Button>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <div>
              <h3 className="font-medium">APIドキュメント</h3>
              <p className="text-sm text-foreground-500 mt-1">
                APIの使用方法について詳しく知るには、ドキュメントを参照してください。
              </p>
              <Button 
                variant="flat" 
                color="primary"
                className="mt-4"
                endContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
              >
                APIドキュメントを開く
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ApiSettings;
