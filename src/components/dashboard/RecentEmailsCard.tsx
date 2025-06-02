import React from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Email } from '../../types';
import DateDisplay from '../common/DateDisplay';
import { Link } from 'react-router-dom';

interface RecentEmailsCardProps {
  emails: Email[];
  isLoading?: boolean;
}

const RecentEmailsCard: React.FC<RecentEmailsCardProps> = ({ emails, isLoading = false }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">最近のメール</h3>
        <Button variant="light" size="sm" endContent={<Icon icon="lucide:mail" className="w-4 h-4" />}>
          すべて表示
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ul className="divide-y divide-divider">
            {emails.map((email) => (
              <li key={email.id} className="p-4 hover:bg-content2 transition-colors">
                <Link to={`/emails/${email.id}`} className="block">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${email.read ? 'bg-foreground-100' : 'bg-primary-50 text-primary-500'}`}>
                      <Icon icon="lucide:mail" className={`w-4 h-4 ${email.read ? 'text-foreground-400' : 'text-primary-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-medium truncate ${email.read ? 'text-foreground-600' : 'text-foreground'}`}>
                          {email.subject}
                        </h4>
                        <DateDisplay date={email.sentAt} className="text-xs text-foreground-400 whitespace-nowrap ml-2" />
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-foreground-500 truncate">
                          {email.sender.split('@')[0]}
                        </span>
                        <span className="mx-1 text-foreground-300">→</span>
                        <span className="text-sm text-foreground-500 truncate">
                          {email.recipients[0].split('@')[0]}
                          {email.recipients.length > 1 && ` +${email.recipients.length - 1}`}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-500 mt-1 line-clamp-1">
                        {email.body.replace(/<[^>]*>?/gm, '')}
                      </p>
                      {email.attachments && email.attachments.length > 0 && (
                        <div className="mt-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            color="default"
                            startContent={<Icon icon="lucide:paperclip" className="w-3 h-3" />}
                          >
                            {email.attachments.length} 添付ファイル
                          </Chip>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};

export default RecentEmailsCard;
