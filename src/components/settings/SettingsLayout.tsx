import React from 'react';
import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentTab = location.pathname.split('/').pop() || 'profile';
  
  const handleTabChange = (key: React.Key) => {
    navigate(`/settings/${key}`);
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <Tabs 
          selectedKey={currentTab}
          onSelectionChange={handleTabChange}
          aria-label="設定"
          variant="underlined"
        >
          <Tab key="profile" title="プロフィール" />
          <Tab key="team" title="チーム" />
          <Tab key="integrations" title="連携" />
          <Tab key="api" title="API" />
          <Tab key="theme" title="テーマ" />
        </Tabs>
      </CardHeader>
      <CardBody>
        <Outlet />
      </CardBody>
    </Card>
  );
};

export default SettingsLayout;
