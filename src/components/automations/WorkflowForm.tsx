import React, { useState, useEffect } from 'react';
import { RFNode, WorkflowNodeData, availableTriggers, availableActions, WorkflowTrigger, WorkflowAction } from '../../types'; // 型をインポート
import { Input, Textarea, Select, SelectItem, Button, Divider, Card, CardBody, CardHeader } from '@heroui/react';
import { Icon } from '@iconify/react';

interface WorkflowFormProps {
  selectedNode: RFNode | null;
  onNodeConfigChange: (nodeId: string, newConfig: Partial<WorkflowNodeData>) => void;
  onClose?: () => void; // パネルを閉じるためのコールバック
}

const WorkflowForm: React.FC<WorkflowFormProps> = ({ selectedNode, onNodeConfigChange, onClose }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [nodeSpecificConfig, setNodeSpecificConfig] = useState<any>({}); // ノード固有の設定

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setDescription(selectedNode.data.description || '');
      setNodeSpecificConfig(selectedNode.data.config || {});
    } else {
      setLabel('');
      setDescription('');
      setNodeSpecificConfig({});
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="p-4 text-sm text-foreground-500">
        ノードを選択して設定を編集します。
      </div>
    );
  }

  const handleLabelChange = (value: string) => {
    setLabel(value);
    onNodeConfigChange(selectedNode.id, { label: value });
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    onNodeConfigChange(selectedNode.id, { description: value });
  };

  const handleSpecificConfigChange = (field: string, value: any) => {
    const newConfig = { ...nodeSpecificConfig, [field]: value };
    setNodeSpecificConfig(newConfig);
    onNodeConfigChange(selectedNode.id, { config: newConfig });
  };

  const renderNodeSpecificFields = () => {
    const nodeType = selectedNode.data.type;
    let optionsSource: WorkflowTrigger[] | WorkflowAction[] = [];
    let currentItem: WorkflowTrigger | WorkflowAction | undefined;

    if (nodeType === 'trigger') {
        optionsSource = availableTriggers;
        currentItem = availableTriggers.find(t => t.name === selectedNode.data.label); // ラベルで仮マッチ
    } else if (nodeType === 'action') {
        optionsSource = availableActions;
        currentItem = availableActions.find(a => a.name === selectedNode.data.label); // ラベルで仮マッチ
    }

    // ここではダミーの設定項目を表示します
    switch (nodeType) {
      case 'trigger':
        const trigger = currentItem as WorkflowTrigger | undefined;
        return (
          <>
            <Select
              label="トリガータイプ"
              selectedKeys={trigger ? [trigger.id] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                const selectedTrigger = availableTriggers.find(t => t.id === selectedKey);
                if (selectedTrigger) {
                  onNodeConfigChange(selectedNode.id, {
                    label: selectedTrigger.name,
                    description: selectedTrigger.description,
                    // config: {}, // 必要なら初期化
                  });
                }
              }}
            >
              {availableTriggers.map((t) => (
                <SelectItem key={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </Select>
            {/* トリガー固有の設定項目をここに追加 */}
            {trigger?.id === 't2' && ( // 例: Deal Stage Changed
                <Select label="対象ステージ" placeholder="ステージを選択" className="mt-4">
                    <SelectItem key="new">新規</SelectItem>
                    <SelectItem key="negotiation">交渉中</SelectItem>
                    <SelectItem key="contract">契約</SelectItem>
                    <SelectItem key="lost">失注</SelectItem>
                </Select>
            )}
          </>
        );
      case 'action':
        const action = currentItem as WorkflowAction | undefined;
        return (
          <>
            <Select
              label="アクションタイプ"
              selectedKeys={action ? [action.id] : []}
               onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                const selectedAction = availableActions.find(a => a.id === selectedKey);
                if (selectedAction) {
                  onNodeConfigChange(selectedNode.id, {
                    label: selectedAction.name,
                    description: selectedAction.description,
                    // config: {}, // 必要なら初期化
                  });
                }
              }}
            >
              {availableActions.map((a) => (
                <SelectItem key={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </Select>
            {/* アクション固有の設定項目をここに追加 */}
            {action?.id === 'a1' && ( // 例: Create Task
                <Input label="タスク内容" placeholder="タスクの説明" className="mt-4"
                    value={nodeSpecificConfig.taskContent || ''}
                    onValueChange={(v) => handleSpecificConfigChange('taskContent', v)}
                />
            )}
            {action?.id === 'a2' && ( // 例: Send Slack Notification
                <Input label="Slackチャンネル" placeholder="#general" className="mt-4"
                    value={nodeSpecificConfig.slackChannel || ''}
                    onValueChange={(v) => handleSpecificConfigChange('slackChannel', v)}
                />
            )}
          </>
        );
      case 'switch':
        return (
          <p className="text-sm text-foreground-500">
            このスイッチノードは、複数の条件に基づいてフローを分岐させます。
            各条件の接続先のアクションを設定してください。
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full shadow-none border-none rounded-none"> {/* パネルとしてのスタイル */}
      <CardHeader className="p-4 flex justify-between items-center">
        <h3 className="text-md font-semibold">ノード設定</h3>
        {onClose && (
            <Button isIconOnly variant="light" onPress={onClose} aria-label="閉じる">
                <Icon icon="lucide:x" />
            </Button>
        )}
      </CardHeader>
      <Divider/>
      <CardBody className="p-4 space-y-4 overflow-y-auto">
        <Input
          label="ラベル"
          value={label}
          onValueChange={handleLabelChange}
          placeholder="ノードの表示名"
        />
        <Textarea
          label="説明"
          value={description}
          onValueChange={handleDescriptionChange}
          placeholder="ノードの説明（任意）"
          minRows={2}
        />
        <Divider className="my-4"/>
        {renderNodeSpecificFields()}
      </CardBody>
    </Card>
  );
};

export default WorkflowForm;