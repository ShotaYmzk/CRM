import React from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Company, Contact, Deal } from '../../types';
import CompanyLogo from '../common/CompanyLogo';
import DateDisplay from '../common/DateDisplay';
import ContactAvatar from '../common/ContactAvatar';
import StatusBadge from '../common/StatusBadge';
import FormattedCurrency from '../common/FormattedCurrency';
import { Link } from 'react-router-dom';

interface CompanyDetailProps {
  company: Company;
  relatedContacts: Contact[];
  relatedDeals: Deal[];
  isLoading?: boolean;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({
  company,
  relatedContacts,
  relatedDeals,
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
                <CompanyLogo company={company} size="lg" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h1 className="text-2xl font-semibold text-foreground">{company.name}</h1>
                  <div className="flex gap-2">
                    <Button variant="flat" startContent={<Icon icon="lucide:users" className="w-4 h-4" />}>
                      連絡先追加
                    </Button>
                    <Button variant="flat" startContent={<Icon icon="lucide:briefcase" className="w-4 h-4" />}>
                      ディール追加
                    </Button>
                    <Button color="primary" startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}>
                      編集
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                  {company.industry && (
                    <div>
                      <p className="text-sm text-foreground-500">業種</p>
                      <p className="text-foreground">{company.industry}</p>
                    </div>
                  )}
                  
                  {company.size && (
                    <div>
                      <p className="text-sm text-foreground-500">規模</p>
                      <p className="text-foreground">{company.size}</p>
                    </div>
                  )}
                  
                  {company.website && (
                    <div>
                      <p className="text-sm text-foreground-500">ウェブサイト</p>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline"
                      >
                        {company.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                  
                  {company.domain && (
                    <div>
                      <p className="text-sm text-foreground-500">ドメイン</p>
                      <p className="text-foreground">{company.domain}</p>
                    </div>
                  )}
                  
                  {company.address && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-foreground-500">所在地</p>
                      <p className="text-foreground">{company.address}</p>
                    </div>
                  )}
                </div>
                
                {company.description && (
                  <div className="mt-6">
                    <p className="text-sm text-foreground-500">概要</p>
                    <p className="text-foreground mt-1 p-3 bg-content2 rounded-md">{company.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <Tabs aria-label="会社の詳細情報">
            <Tab key="contacts" title="連絡先">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">関連連絡先</h3>
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="primary"
                    startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                  >
                    連絡先追加
                  </Button>
                </div>
                
                {relatedContacts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedContacts.map((contact) => (
                      <Link 
                        key={contact.id} 
                        to={`/contacts/${contact.id}`}
                        className="block"
                      >
                        <Card className="hover:bg-content2 transition-colors">
                          <CardBody>
                            <div className="flex items-center gap-3">
                              <ContactAvatar contact={contact} size="md" />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-foreground">{contact.fullName}</h4>
                                    <p className="text-sm text-foreground-500">{contact.position || '役職なし'}</p>
                                  </div>
                                  <StatusBadge status={contact.status} />
                                </div>
                                <div className="mt-2">
                                  <p className="text-sm text-foreground-500 flex items-center">
                                    <Icon icon="lucide:mail" className="w-3 h-3 mr-1" />
                                    {contact.email}
                                  </p>
                                  {contact.phone && (
                                    <p className="text-sm text-foreground-500 flex items-center mt-1">
                                      <Icon icon="lucide:phone" className="w-3 h-3 mr-1" />
                                      {contact.phone}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground-500">
                    関連する連絡先がありません
                  </div>
                )}
              </div>
            </Tab>
            <Tab key="deals" title="ディール">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">関連ディール</h3>
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="primary"
                    startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                  >
                    ディール追加
                  </Button>
                </div>
                
                {relatedDeals.length > 0 ? (
                  <div className="space-y-4">
                    {relatedDeals.map((deal) => (
                      <Card key={deal.id} className="hover:bg-content2 transition-colors">
                        <CardBody>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <h4 className="font-medium text-foreground">{deal.title}</h4>
                                <StatusBadge status={deal.stage} />
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                                <p className="text-foreground-500 flex items-center">
                                  <Icon icon="lucide:dollar-sign" className="w-3 h-3 mr-1" />
                                  <FormattedCurrency amount={deal.amount} currency={deal.currency} />
                                </p>
                                <p className="text-foreground-500 flex items-center">
                                  <Icon icon="lucide:percent" className="w-3 h-3 mr-1" />
                                  確度: {deal.probability}%
                                </p>
                                {deal.closingDate && (
                                  <p className="text-foreground-500 flex items-center">
                                    <Icon icon="lucide:calendar" className="w-3 h-3 mr-1" />
                                    期限: <DateDisplay date={deal.closingDate} format="date" className="ml-1" />
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="light"
                              endContent={<Icon icon="lucide:chevron-right" className="w-4 h-4" />}
                            >
                              詳細
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground-500">
                    関連するディールがありません
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

export default CompanyDetail;
