import React from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Tabs, Tab, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Contact, Email, Event, TimelineItem } from '../../types';
import ContactAvatar from '../common/ContactAvatar';
import StatusBadge from '../common/StatusBadge';
import DateDisplay from '../common/DateDisplay';
import CompanyLogo from '../common/CompanyLogo';

interface ContactDetailProps {
  contact: Contact;
  relatedEmails: Email[];
  relatedEvents: Event[];
  relatedTimeline: TimelineItem[];
  isLoading?: boolean;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  contact,
  relatedEmails,
  relatedEvents,
  relatedTimeline,
  isLoading = false
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <ContactAvatar contact={contact} size="lg" />
                <StatusBadge status={contact.status} size="md" className="mt-2" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h1 className="text-2xl font-semibold text-foreground">{contact.fullName}</h1>
                  <div className="flex gap-2">
                    <Button variant="flat" startContent={<Icon icon="lucide:mail" className="w-4 h-4" />}>
                      メール送信
                    </Button>
                    <Button variant="flat" startContent={<Icon icon="lucide:calendar" className="w-4 h-4" />}>
                      予定追加
                    </Button>
                    <Button color="primary" startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}>
                      編集
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                  {contact.position && (
                    <div>
                      <p className="text-sm text-foreground-500">役職</p>
                      <p className="text-foreground">{contact.position}</p>
                    </div>
                  )}
                  
                  {contact.company && (
                    <div>
                      <p className="text-sm text-foreground-500">会社</p>
                      <div className="flex items-center gap-2 mt-1">
                        <CompanyLogo company={contact.company} size="sm" />
                        <span className="text-foreground">{contact.company.name}</span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-foreground-500">メール</p>
                    <p className="text-foreground">{contact.email}</p>
                  </div>
                  
                  {contact.phone && (
                    <div>
                      <p className="text-sm text-foreground-500">電話番号</p>
                      <p className="text-foreground">{contact.phone}</p>
                    </div>
                  )}
                  
                  {contact.lastContactedAt && (
                    <div>
                      <p className="text-sm text-foreground-500">最終やり取り</p>
                      <p className="text-foreground">
                        <DateDisplay date={contact.lastContactedAt} format="full" />
                      </p>
                    </div>
                  )}
                  
                  {contact.tags.length > 0 && (
                    <div>
                      <p className="text-sm text-foreground-500">タグ</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contact.tags.map((tag, index) => (
                          <Chip key={index} size="sm" variant="flat">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {contact.notes && (
                  <div className="mt-6">
                    <p className="text-sm text-foreground-500">メモ</p>
                    <p className="text-foreground mt-1 p-3 bg-content2 rounded-md">{contact.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <Tabs aria-label="連絡先の詳細情報">
            <Tab key="timeline" title="タイムライン">
              <div className="p-4">
                {relatedTimeline.length > 0 ? (
                  <ul className="space-y-4">
                    {relatedTimeline.map((item) => (
                      <li key={item.id} className="border-b border-divider pb-4 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className="rounded-full p-2 bg-primary-50 text-primary-500">
                            <Icon icon={
                              item.type === 'email' ? 'lucide:mail' :
                              item.type === 'event' ? 'lucide:calendar' :
                              item.type === 'note' ? 'lucide:file-text' :
                              'lucide:check-square'
                            } className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-foreground">{item.title}</h4>
                              <DateDisplay date={item.date} className="text-sm text-foreground-400" />
                            </div>
                            {item.description && (
                              <p className="text-sm text-foreground-500 mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-foreground-500">
                    タイムラインの項目がありません
                  </div>
                )}
              </div>
            </Tab>
            <Tab key="emails" title="メール">
              <div className="p-4">
                {relatedEmails.length > 0 ? (
                  <ul className="space-y-4">
                    {relatedEmails.map((email) => (
                      <li key={email.id} className="border-b border-divider pb-4 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className={`rounded-full p-2 ${email.read ? 'bg-foreground-100' : 'bg-primary-50 text-primary-500'}`}>
                            <Icon icon="lucide:mail" className={`w-4 h-4 ${email.read ? 'text-foreground-400' : 'text-primary-500'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-foreground">{email.subject}</h4>
                              <DateDisplay date={email.sentAt} className="text-sm text-foreground-400" />
                            </div>
                            <div className="flex items-center mt-1 text-sm text-foreground-500">
                              <span>{email.sender.split('@')[0]}</span>
                              <span className="mx-1">→</span>
                              <span>
                                {email.recipients[0].split('@')[0]}
                                {email.recipients.length > 1 && ` +${email.recipients.length - 1}`}
                              </span>
                            </div>
                            <p className="text-sm text-foreground-500 mt-1 line-clamp-2">
                              {email.body.replace(/<[^>]*>?/gm, '')}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-foreground-500">
                    メールのやり取りがありません
                  </div>
                )}
              </div>
            </Tab>
            <Tab key="events" title="予定">
              <div className="p-4">
                {relatedEvents.length > 0 ? (
                  <ul className="space-y-4">
                    {relatedEvents.map((event) => (
                      <li key={event.id} className="border-b border-divider pb-4 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className="rounded-full p-2 bg-warning-50 text-warning-500">
                            <Icon icon="lucide:calendar" className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-foreground">{event.title}</h4>
                              <DateDisplay date={event.start} className="text-sm text-foreground-400" />
                            </div>
                            <div className="flex items-center mt-1 text-sm text-foreground-500">
                              <Icon icon="lucide:clock" className="w-3 h-3 mr-1" />
                              <span>
                                {new Date(event.start).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} - 
                                {new Date(event.end).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {event.location && (
                                <>
                                  <span className="mx-2">•</span>
                                  <Icon icon="lucide:map-pin" className="w-3 h-3 mr-1" />
                                  <span>{event.location}</span>
                                </>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-sm text-foreground-500 mt-1">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-foreground-500">
                    予定がありません
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ContactDetail;
