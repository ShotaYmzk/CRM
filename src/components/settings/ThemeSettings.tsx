import React from 'react';
import { Card, CardBody, RadioGroup, Radio } from '@heroui/react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">テーマ設定</h2>
      
      <Card>
        <CardBody className="space-y-4">
          <div>
            <h3 className="font-medium">カラーテーマ</h3>
            <p className="text-sm text-foreground-500">
              アプリケーションの表示カラーを選択します。
            </p>
          </div>
          
          <RadioGroup
            value={theme}
            onValueChange={setTheme as any}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={`cursor-pointer border-2 ${theme === 'light' ? 'border-primary' : 'border-transparent'}`}>
                <CardBody className="p-4">
                  <Radio value="light">
                    <div className="ml-2">
                      <h4 className="font-medium">カラーモード</h4>
                      <p className="text-sm text-foreground-500">
                        標準のカラー表示
                      </p>
                      <div className="flex gap-1 mt-2">
                        <div className="w-6 h-6 rounded-full bg-primary-500"></div>
                        <div className="w-6 h-6 rounded-full bg-success-500"></div>
                        <div className="w-6 h-6 rounded-full bg-warning-500"></div>
                        <div className="w-6 h-6 rounded-full bg-danger-500"></div>
                      </div>
                    </div>
                  </Radio>
                </CardBody>
              </Card>
              
              <Card className={`cursor-pointer border-2 ${theme === 'grayscale' ? 'border-primary' : 'border-transparent'}`}>
                <CardBody className="p-4">
                  <Radio value="grayscale">
                    <div className="ml-2">
                      <h4 className="font-medium">グレースケールモード</h4>
                      <p className="text-sm text-foreground-500">
                        モノクロ表示
                      </p>
                      <div className="flex gap-1 mt-2">
                        <div className="w-6 h-6 rounded-full bg-foreground-300"></div>
                        <div className="w-6 h-6 rounded-full bg-foreground-400"></div>
                        <div className="w-6 h-6 rounded-full bg-foreground-500"></div>
                        <div className="w-6 h-6 rounded-full bg-foreground-600"></div>
                      </div>
                    </div>
                  </Radio>
                </CardBody>
              </Card>
            </div>
          </RadioGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThemeSettings;
