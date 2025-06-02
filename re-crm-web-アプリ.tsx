import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './src/contexts/AuthContext.tsx';
import Layout from './src/components/layout/Layout.tsx';
import LoginPage from './src/pages/LoginPage.tsx';
import DashboardPage from './src/pages/DashboardPage.tsx';
import ContactsPage from './src/pages/ContactsPage.tsx';
import ContactDetailPage from './src/pages/ContactDetailPage.tsx';
import CompaniesPage from './src/pages/CompaniesPage.tsx';
import CompanyDetailPage from './src/pages/CompanyDetailPage.tsx';
import DealsPage from './src/pages/DealsPage.tsx';
import EmailsPage from './src/pages/EmailsPage.tsx';
import EmailDetailPage from './src/pages/EmailDetailPage.tsx';
import CalendarPage from './src/pages/CalendarPage.tsx';
import AIAssistantPage from './src/pages/AIAssistantPage.tsx';
import SettingsPage from './src/pages/SettingsPage.tsx';
import NotFoundPage from './src/pages/NotFoundPage.tsx';

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
      
      <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetailPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/emails" element={<EmailsPage />} />
        <Route path="/emails/:id" element={<EmailDetailPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
