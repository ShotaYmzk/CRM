import React from 'react';
import { Avatar } from '@heroui/react';
import { Contact } from '../../types';

interface ContactAvatarProps {
  contact: Contact;
  size?: 'sm' | 'md' | 'lg';
}

const ContactAvatar: React.FC<ContactAvatarProps> = ({ contact, size = 'md' }) => {
  // 連絡先の名前から一貫したユニークIDを生成
  const uniqueId = `contact${contact.id}`;
  
  return (
    <Avatar
      name={contact.fullName}
      src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${uniqueId}`}
      size={size}
      className="bg-primary-100"
    />
  );
};

export default ContactAvatar;
