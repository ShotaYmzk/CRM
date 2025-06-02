import React from 'react';
import { Button, Input, Textarea, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    position: '',
    bio: ''
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('プロフィール更新:', formData);
    // API呼び出し
  };
  
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">プロフィール設定</h2>
      
      <div className="flex items-center gap-4 mb-8">
        <Avatar
          src={user?.avatar}
          name={user?.name}
          size="lg"
          className="w-20 h-20"
        />
        <div>
          <Button 
            variant="flat" 
            color="primary"
            startContent={<Icon icon="lucide:upload" className="w-4 h-4" />}
          >
            画像をアップロード
          </Button>
          <p className="text-xs text-foreground-500 mt-2">
            JPG, PNG, GIF形式。最大2MB。
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="名前"
            placeholder="名前を入力"
            value={formData.name}
            onValueChange={(value) => handleChange('name', value)}
            isRequired
          />
          
          <Input
            label="メールアドレス"
            placeholder="メールアドレスを入力"
            type="email"
            value={formData.email}
            onValueChange={(value) => handleChange('email', value)}
            isRequired
          />
          
          <Input
            label="電話番号"
            placeholder="電話番号を入力"
            type="tel"
            value={formData.phone}
            onValueChange={(value) => handleChange('phone', value)}
          />
          
          <Input
            label="役職"
            placeholder="役職を入力"
            value={formData.position}
            onValueChange={(value) => handleChange('position', value)}
          />
        </div>
        
        <Textarea
          label="自己紹介"
          placeholder="自己紹介を入力"
          value={formData.bio}
          onValueChange={(value) => handleChange('bio', value)}
          minRows={3}
        />
        
        <div className="flex justify-end gap-2">
          <Button variant="flat">
            キャンセル
          </Button>
          <Button color="primary" type="submit">
            保存
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
