import React from 'react';
import { Card, CardBody, CardHeader, Input, Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login, startGoogleAuth } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message || 'ログインに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Re:CRM</h1>
          <p className="text-foreground-500 mt-2">日本市場向けCRMアプリケーション</p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-col gap-1 items-center">
            <h2 className="text-xl font-semibold">ログイン</h2>
            <p className="text-sm text-foreground-500">アカウントにログインしてください</p>
            <p className="text-sm text-foreground-500">mail = demo@example.com</p>
            <p className="text-sm text-foreground-500">pass = password</p>
          </CardHeader>
          <CardBody>
            {error && (
              <div className="bg-danger-50 text-danger-600 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="メールアドレス"
                placeholder="メールアドレスを入力"
                type="email"
                value={email}
                onValueChange={setEmail}
                isRequired
              />
              
              <Input
                label="パスワード"
                placeholder="パスワードを入力"
                type="password"
                value={password}
                onValueChange={setPassword}
                isRequired
              />
              
              <div className="text-right">
                <Button variant="light" size="sm">
                  パスワードをお忘れですか？
                </Button>
              </div>
              
              <Button 
                type="submit" 
                color="primary" 
                className="w-full"
                isLoading={isLoading}
              >
                ログイン
              </Button>
            </form>
            
            <div className="flex items-center my-4">
              <Divider className="flex-1" />
              <span className="px-4 text-sm text-foreground-500">または</span>
              <Divider className="flex-1" />
            </div>
            
            <Button 
              className="w-full"
              variant="flat"
              startContent={<Icon icon="logos:google-icon" className="w-5 h-5" />}
              onPress={startGoogleAuth}
            >
              Googleでログイン
            </Button>
            
            <p className="text-center text-sm text-foreground-500 mt-4">
              アカウントをお持ちでない場合は、
              <Button variant="light" size="sm" className="p-0">
                登録
              </Button>
              してください
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;