import React from 'react';

interface FormattedCurrencyProps {
  amount: number;
  currency?: string;
  locale?: string;
}

const FormattedCurrency: React.FC<FormattedCurrencyProps> = ({ 
  amount, 
  currency = 'JPY', 
  locale = 'ja-JP' 
}) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });
  
  return <span>{formatter.format(amount)}</span>;
};

export default FormattedCurrency;
