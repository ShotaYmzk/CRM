import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Email } from '../../types';
import DateDisplay from '../common/DateDisplay';

interface EmailDetailProps {
  email: Email;
  isLoading?: boolean;
  aiSummary?: string;
  onAiSummarize?: () => void;
  isAiLoading?: boolean;
}

const EmailDetail: React.FC<EmailDetailProps> = ({
  email,
  isLoading = false,
  aiSummary,
  onAiSummarize,
  isAiLoading = false
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-semibold text-foreground">{email.subject}</h1>
              <div className="flex gap-2">
                <Button variant="flat" size="sm" startContent={<Icon icon="lucide:reply" className="w-4 h-4" />}>
                  返信
                </Button>
                <Button variant="flat" size="sm" startContent={<Icon icon="lucide:forward" className="w-4 h-4" />}>
                  転送
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-lg font-medium text-primary-600">
                  {email.sender.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{email.sender.split('@')[0]}</span>
                    <span className="text-sm text-foreground-500">&lt;{email.sender}&gt;</span>
                  </div>
                  <div className="text-xs text-foreground-500">
                    To: {email.recipients.join(', ')}
                  </div>
                </div>
              </div>
              <div className="text-sm text-foreground-500">
                <DateDisplay date={email.sentAt} format="full" />
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: email.body }}
                />
                
                {email.attachments && email.attachments.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-medium mb-2">添付ファイル ({email.attachments.length})</h3>
                    <div className="flex flex-wrap gap-3">
                      {email.attachments.map((attachment) => (
                        <div 
                          key={attachment.id}
                          className="flex items-center p-2 border border-divider rounded-md bg-content2"
                        >
                          <Icon 
                            icon={
                              attachment.type.includes('pdf') ? 'lucide:file-text' :
                              attachment.type.includes('image') ? 'lucide:image' :
                              attachment.type.includes('word') ? 'lucide:file-text' :
                              attachment.type.includes('excel') || attachment.type.includes('spreadsheet') ? 'lucide:file-spreadsheet' :
                              attachment.type.includes('presentation') ? 'lucide:file-presentation' :
                              'lucide:file'
                            } 
                            className="w-5 h-5 mr-2 text-foreground-500" 
                          />
                          <div>
                            <p className="text-sm font-medium">{attachment.name}</p>
                            <p className="text-xs text-foreground-500">
                              {(attachment.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">AI要約</h2>
              <Button 
                size="sm" 
                variant="flat" 
                color="primary"
                startContent={<Icon icon="lucide:sparkles" className="w-4 h-4" />}
                isLoading={isAiLoading}
                onPress={onAiSummarize}
                isDisabled={isAiLoading}
              >
                要約生成
              </Button>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {isAiLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : aiSummary ? (
              <div className="prose prose-sm max-w-none">
                <p>{aiSummary}</p>
              </div>
            ) : (
              <div className="text-center py-8 text-foreground-500">
                <Icon icon="lucide:sparkles" className="w-8 h-8 mx-auto mb-2 text-foreground-300" />
                <p>AIによる要約を生成するには「要約生成」ボタンをクリックしてください</p>
              </div>
            )}
          </CardBody>
        </Card>
        
        <Card className="mt-4">
          <CardHeader>
            <h2 className="text-lg font-medium">関連情報</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">関連連絡先</h3>
                {email.contactIds.length > 0 ? (
                  <div className="space-y-2">
                    {email.contactIds.map((contactId) => (
                      <div 
                        key={contactId}
                        className="flex items-center p-2 border border-divider rounded-md bg-content2"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-medium text-primary-600 mr-2">
                          {contactId.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">連絡先 {contactId}</p>
                          <p className="text-xs text-foreground-500">関連連絡先</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-foreground-500">関連連絡先はありません</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">次のアクション</h3>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  startContent={<Icon icon="lucide:sparkles" className="w-4 h-4" />}
                  className="w-full"
                >
                  AIにアクションを提案してもらう
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EmailDetail;
