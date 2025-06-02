import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '@heroui/react';

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center px-3 py-2 rounded-md transition-colors ${
          isActive 
            ? 'bg-primary-100 text-primary-600' 
            : 'text-foreground-600 hover:bg-content2 hover:text-foreground-900'
        }`
      }
    >
      <Icon icon={icon} className="w-6 h-6 mr-3" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'grayscale' : 'light');
  };

  return (
    <aside className="w-56 border-r border-divider bg-content1 flex flex-col h-full">
      <div className="p-4 border-b border-divider">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold mr-2">
            R
          </div>
          <h1 className="text-xl font-bold text-foreground">Re:CRM</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        <NavItem to="/" icon="lucide:home" label="ダッシュボード" />
        <NavItem to="/contacts" icon="lucide:users" label="連絡先" />
        <NavItem to="/companies" icon="lucide:building" label="会社" />
        <NavItem to="/deals" icon="lucide:briefcase" label="ディール" />
        <NavItem to="/emails" icon="lucide:mail" label="メール" />
        <NavItem to="/calendar" icon="lucide:calendar" label="カレンダー" />
        <NavItem to="/automations" icon="lucide:play-circle" label="オートメーション" />
        <NavItem to="/ai-assistant" icon="lucide:sparkles" label="AIアシスタント" />
      </nav>
      
      <div className="p-4 border-t border-divider">
        <Button 
          variant="flat" 
          color="default" 
          className="w-full justify-start"
          onPress={toggleTheme}
          startContent={<Icon icon={theme === 'light' ? 'lucide:palette' : 'lucide:sun'} className="w-5 h-5" />}
        >
          {theme === 'light' ? 'グレースケール' : 'カラーモード'}
        </Button>
        <NavItem to="/settings" icon="lucide:settings" label="設定" />
      </div>
    </aside>
  );
};

export default Sidebar;
