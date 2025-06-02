import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../components/common/PageHeader';
import CompanyDetail from '../components/companies/CompanyDetail';
import { mockCompanies, mockContacts, mockDeals } from '../utils/mockData';
import { Company, Contact, Deal } from '../types';

const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [company, setCompany] = React.useState<Company | null>(null);
  const [relatedContacts, setRelatedContacts] = React.useState<Contact[]>([]);
  const [relatedDeals, setRelatedDeals] = React.useState<Deal[]>([]);
  
  React.useEffect(() => {
    // データ取得のシミュレーション
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      // 会社データを取得
      const foundCompany = mockCompanies.find(c => c.id === id);
      
      if (foundCompany) {
        setCompany(foundCompany);
        
        // 関連連絡先を取得
        const companyContacts = mockContacts.filter(contact => 
          contact.companyId === foundCompany.id
        );
        setRelatedContacts(companyContacts);
        
        // 関連ディールを取得
        const companyDeals = mockDeals.filter(deal => 
          deal.companyId === foundCompany.id
        );
        setRelatedDeals(companyDeals);
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleBack = () => {
    navigate('/companies');
  };
  
  if (!company && !isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">会社が見つかりません</h2>
        <p className="text-foreground-500 mb-6">
          指定されたIDの会社は存在しないか、削除された可能性があります。
        </p>
        <Button 
          color="primary" 
          onPress={handleBack}
          startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}
        >
          会社一覧に戻る
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
      
      <CompanyDetail
        company={company!}
        relatedContacts={relatedContacts}
        relatedDeals={relatedDeals}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CompanyDetailPage;
