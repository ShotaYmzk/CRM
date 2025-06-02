import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import SettingsLayout from '../components/settings/SettingsLayout';
import ProfileSettings from '../components/settings/ProfileSettings';
import TeamSettings from '../components/settings/TeamSettings';
import IntegrationsSettings from '../components/settings/IntegrationsSettings';
import ApiSettings from '../components/settings/ApiSettings';
import ThemeSettings from '../components/settings/ThemeSettings';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="設定"
        description="アカウントと環境設定を管理"
      />
      
      <Routes>
        <Route element={<SettingsLayout />}>
          <Route path="/" element={<Navigate to="/settings/profile" replace />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="team" element={<TeamSettings />} />
          <Route path="integrations" element={<IntegrationsSettings />} />
          <Route path="api" element={<ApiSettings />} />
          <Route path="theme" element={<ThemeSettings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default SettingsPage;
