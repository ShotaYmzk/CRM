import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import ContactDetail from '../components/contacts/ContactDetail';
import { mockContacts, mockEmails, mockEvents, mockTimelineItems } from '../utils/mockData';
import { Contact, Email, Event, TimelineItem } from '../types';

const ContactDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [contact, setContact] = React.useState<Contact | null>(null);
  const [relatedEmails, setRelatedEmails] = React.useState<Email[]>([]);
  const [relatedEvents, setRelatedEvents] = React.useState<Event[]>([]);
  const [relatedTimeline, setRelatedTimeline] = React.useState<TimelineItem[]>([]);
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      // 連絡先データを取得
      const foundContact = mockContacts.find(c => c.id === id);
      
      if (foundContact) {
        setContact(foundContact);
        
        // 関連メールを取得
        const contactEmails = mockEmails.filter(email => 
          email.contactIds.includes(foundContact.id)
        );
        setRelatedEmails(contactEmails);
        
        // 関連予定を取得
        const contactEvents = mockEvents.filter(event => 
          event.contactIds.includes(foundContact.id)
        );
        setRelatedEvents(contactEvents);
        
        // 関連タイムラインを取得
        const contactTimeline = mockTimelineItems.filter(item => 
          item.relatedTo?.id === foundContact.id
        );
        setRelatedTimeline(contactTimeline);
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleBack = () => {
    navigate('/contacts');
  };
  
  if (!contact && !isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">連絡先が見つかりません</h2>
        <p className="text-foreground-500 mb-6">
          指定されたIDの連絡先は存在しないか、削除された可能性があります。
        </p>
        <Button 
          color="primary" 
          onPress={handleBack}
          startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}
        >
          連絡先一覧に戻る
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title=""
        actions={
          <Button 
            variant="flat" 
            onPress={handleBack}
            startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}
          >
            戻る
          </Button>
        }
      />
      
      <ContactDetail
        contact={contact!}
        relatedEmails={relatedEmails}
        relatedEvents={relatedEvents}
        relatedTimeline={relatedTimeline}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ContactDetailPage;
