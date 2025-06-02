import React from 'react';
import { Card, CardBody, Button, Switch } from '@heroui/react';
import { Icon } from '@iconify/react';

const IntegrationsSettings: React.FC = () => {
  const [googleConnected, setGoogleConnected] = React.useState(false);
  const [autoSync, setAutoSync] = React.useState(true);
  
  const handleGoogleConnect = () => {
    // OAuth フローを開始
    window.location.href = '/api/auth/google';
  };
  
  const handleGoogleDisconnect = () => {
    setGoogleConnected(false);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">連携設定</h2>
      
      <div className="space-y-6">
        <Card>
          <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center shadow-sm">
                <Icon icon="logos:google-icon" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">Google連携</h3>
                <p className="text-sm text-foreground-500">
                  Gmail、Googleカレンダーと連携して、メールや予定を同期します。
                </p>
              </div>
            </div>
            {googleConnected ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-success-600 flex items-center">
                  <Icon icon="lucide:check-circle" className="w-4 h-4 mr-1" />
                  接続済み
                </span>
                <Button 
                  variant="flat" 
                  color="danger"
                  onPress={handleGoogleDisconnect}
                >
                  切断
                </Button>
              </div>
            ) : (
              <Button 
                color="primary" 
                startContent={<Icon icon="lucide:link" className="w-4 h-4" />}
                onPress={handleGoogleConnect}
              >
                接続
              </Button>
            )}
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">自動同期</h3>
              <p className="text-sm text-foreground-500">
                5分ごとに新着メールと予定を自動的に同期します。
              </p>
            </div>
            <Switch 
              isSelected={autoSync}
              onValueChange={setAutoSync}
              color="primary"
            />
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center shadow-sm">
                <Icon icon="logos:slack-icon" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">Slack連携</h3>
                <p className="text-sm text-foreground-500">
                  Slackと連携して、通知やメッセージを送信します。
                </p>
              </div>
            </div>
            <Button 
              color="primary" 
              startContent={<Icon icon="lucide:link" className="w-4 h-4" />}
            >
              接続
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default IntegrationsSettings;
