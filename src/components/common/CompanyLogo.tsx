import React from 'react';
import { Avatar } from '@heroui/react';
import { Company } from '../../types';

interface CompanyLogoProps {
  company: Company;
  size?: 'sm' | 'md' | 'lg';
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, size = 'md' }) => {
  // 会社名から一貫したユニークIDを生成
  const uniqueId = `company${company.id}`;
  
  return (
    <Avatar
      name={company.name}
      src={company.logo || `https://img.heroui.chat/image/ai?w=200&h=200&u=${uniqueId}`}
      size={size}
      radius="sm"
      className="bg-primary-100"
    />
  );
};

export default CompanyLogo;
