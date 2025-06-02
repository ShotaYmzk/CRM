import { Contact, Company, Deal, Email, Event, Task, TimelineItem } from '../types';

// モックユーザー
export const mockUsers = [
  { id: '1', name: '山田 太郎', email: 'yamada@example.com', avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user1', role: 'admin' },
  { id: '2', name: '佐藤 花子', email: 'sato@example.com', avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user2', role: 'user' },
  { id: '3', name: '鈴木 一郎', email: 'suzuki@example.com', avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user3', role: 'user' },
];

// モック会社データ
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: '株式会社テックイノベーション',
    domain: 'techinnovation.co.jp',
    address: '東京都渋谷区神宮前5-52-2',
    description: 'AIと機械学習を専門とするテクノロジー企業',
    industry: 'テクノロジー',
    size: '50-100',
    website: 'https://techinnovation.co.jp',
    logo: 'https://img.heroui.chat/image/ai?w=200&h=200&u=company1',
    createdAt: '2023-01-15T09:30:00Z',
    updatedAt: '2023-06-20T14:45:00Z'
  },
  {
    id: '2',
    name: '丸山商事株式会社',
    domain: 'maruyama-corp.co.jp',
    address: '大阪府大阪市北区梅田3-1-3',
    description: '総合商社として国内外で幅広いビジネスを展開',
    industry: '商社',
    size: '1000+',
    website: 'https://maruyama-corp.co.jp',
    logo: 'https://img.heroui.chat/image/ai?w=200&h=200&u=company2',
    createdAt: '2022-11-08T10:15:00Z',
    updatedAt: '2023-07-12T11:20:00Z'
  },
  {
    id: '3',
    name: '緑川製薬株式会社',
    domain: 'midorikawa-pharma.co.jp',
    address: '神奈川県横浜市港北区新横浜2-5-14',
    description: '革新的な医薬品の研究開発と製造',
    industry: '製薬',
    size: '500-1000',
    website: 'https://midorikawa-pharma.co.jp',
    logo: 'https://img.heroui.chat/image/ai?w=200&h=200&u=company3',
    createdAt: '2023-02-22T08:45:00Z',
    updatedAt: '2023-08-05T16:30:00Z'
  },
  {
    id: '4',
    name: '青空デザイン株式会社',
    domain: 'aozora-design.jp',
    address: '東京都目黒区中目黒3-10-13',
    description: 'クリエイティブなデザインソリューションを提供',
    industry: 'デザイン',
    size: '10-50',
    website: 'https://aozora-design.jp',
    logo: 'https://img.heroui.chat/image/ai?w=200&h=200&u=company4',
    createdAt: '2023-03-10T13:20:00Z',
    updatedAt: '2023-07-28T09:15:00Z'
  },
  {
    id: '5',
    name: '山本建設株式会社',
    domain: 'yamamoto-kensetsu.co.jp',
    address: '福岡県福岡市博多区博多駅前4-2-1',
    description: '持続可能な建築と都市開発のリーディングカンパニー',
    industry: '建設',
    size: '100-500',
    website: 'https://yamamoto-kensetsu.co.jp',
    logo: 'https://img.heroui.chat/image/ai?w=200&h=200&u=company5',
    createdAt: '2022-09-05T11:10:00Z',
    updatedAt: '2023-06-15T10:40:00Z'
  }
];

// モック連絡先データ
export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: '田中',
    lastName: '健太',
    fullName: '田中 健太',
    email: 'tanaka@techinnovation.co.jp',
    phone: '090-1234-5678',
    companyId: '1',
    position: 'CTO',
    tags: ['VIP', 'テクノロジー'],
    lastContactedAt: '2023-08-15T10:30:00Z',
    status: 'active',
    createdAt: '2023-01-20T09:45:00Z',
    updatedAt: '2023-08-15T10:30:00Z',
    assignedTo: '1',
    notes: 'AIプロジェクトについて相談したい意向あり'
  },
  {
    id: '2',
    firstName: '佐々木',
    lastName: '美咲',
    fullName: '佐々木 美咲',
    email: 'sasaki@maruyama-corp.co.jp',
    phone: '090-8765-4321',
    companyId: '2',
    position: '営業部長',
    tags: ['決定権者', '商談中'],
    lastContactedAt: '2023-08-10T14:15:00Z',
    status: 'active',
    createdAt: '2022-12-05T11:20:00Z',
    updatedAt: '2023-08-10T14:15:00Z',
    assignedTo: '2',
    notes: '次回商談は9月上旬を予定'
  },
  {
    id: '3',
    firstName: '高橋',
    lastName: '誠',
    fullName: '高橋 誠',
    email: 'takahashi@midorikawa-pharma.co.jp',
    phone: '090-2345-6789',
    companyId: '3',
    position: '研究開発部門責任者',
    tags: ['研究開発', '新規案件'],
    lastContactedAt: '2023-08-05T09:00:00Z',
    status: 'active',
    createdAt: '2023-03-15T10:30:00Z',
    updatedAt: '2023-08-05T09:00:00Z',
    assignedTo: '3',
    notes: '新薬開発プロジェクトの協業可能性について'
  },
  {
    id: '4',
    firstName: '伊藤',
    lastName: '由美',
    fullName: '伊藤 由美',
    email: 'ito@aozora-design.jp',
    phone: '090-3456-7890',
    companyId: '4',
    position: 'クリエイティブディレクター',
    tags: ['デザイン', 'クリエイティブ'],
    lastContactedAt: '2023-07-28T15:45:00Z',
    status: 'active',
    createdAt: '2023-04-10T13:40:00Z',
    updatedAt: '2023-07-28T15:45:00Z',
    assignedTo: '1',
    notes: 'ブランドリニューアルについて相談あり'
  },
  {
    id: '5',
    firstName: '中村',
    lastName: '大輔',
    fullName: '中村 大輔',
    email: 'nakamura@yamamoto-kensetsu.co.jp',
    phone: '090-4567-8901',
    companyId: '5',
    position: '事業開発マネージャー',
    tags: ['建設', '長期プロジェクト'],
    lastContactedAt: '2023-08-01T11:30:00Z',
    status: 'active',
    createdAt: '2022-10-20T09:15:00Z',
    updatedAt: '2023-08-01T11:30:00Z',
    assignedTo: '2',
    notes: '持続可能な建築プロジェクトについて'
  },
  {
    id: '6',
    firstName: '小林',
    lastName: '直子',
    fullName: '小林 直子',
    email: 'kobayashi@techinnovation.co.jp',
    phone: '090-5678-9012',
    companyId: '1',
    position: 'マーケティングディレクター',
    tags: ['マーケティング', 'デジタル'],
    lastContactedAt: '2023-07-25T14:00:00Z',
    status: 'active',
    createdAt: '2023-02-15T10:20:00Z',
    updatedAt: '2023-07-25T14:00:00Z',
    assignedTo: '3',
    notes: 'デジタルマーケティング戦略について相談希望'
  },
  {
    id: '7',
    firstName: '渡辺',
    lastName: '隆',
    fullName: '渡辺 隆',
    email: 'watanabe@maruyama-corp.co.jp',
    phone: '090-6789-0123',
    companyId: '2',
    position: 'CFO',
    tags: ['財務', 'VIP'],
    lastContactedAt: '2023-07-20T10:45:00Z',
    status: 'inactive',
    createdAt: '2023-01-10T09:30:00Z',
    updatedAt: '2023-07-20T10:45:00Z',
    assignedTo: '1',
    notes: '財務戦略について相談あり'
  },
  {
    id: '8',
    firstName: '加藤',
    lastName: '真理',
    fullName: '加藤 真理',
    email: 'kato@midorikawa-pharma.co.jp',
    phone: '090-7890-1234',
    companyId: '3',
    position: 'マーケティングマネージャー',
    tags: ['製薬', 'マーケティング'],
    lastContactedAt: '2023-07-15T13:20:00Z',
    status: 'lead',
    createdAt: '2023-05-05T11:15:00Z',
    updatedAt: '2023-07-15T13:20:00Z',
    assignedTo: '2',
    notes: '新製品のマーケティング戦略について'
  }
];

// モック取引データ
export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'AIソリューション導入プロジェクト',
    stage: 'negotiation',
    amount: 15000000,
    currency: 'JPY',
    probability: 70,
    companyId: '1',
    contactIds: ['1', '6'],
    assignedTo: '1',
    closingDate: '2023-09-30T00:00:00Z',
    createdAt: '2023-07-10T09:30:00Z',
    updatedAt: '2023-08-15T14:45:00Z',
    notes: '顧客のニーズに合わせたAIソリューションの提案。予算調整中。'
  },
  {
    id: '2',
    title: '海外展開支援コンサルティング',
    stage: 'new',
    amount: 8500000,
    currency: 'JPY',
    probability: 40,
    companyId: '2',
    contactIds: ['2', '7'],
    assignedTo: '2',
    closingDate: '2023-10-15T00:00:00Z',
    createdAt: '2023-08-01T10:15:00Z',
    updatedAt: '2023-08-10T11:30:00Z',
    notes: 'アジア市場への展開を検討中。初期提案段階。'
  },
  {
    id: '3',
    title: '研究開発パートナーシップ',
    stage: 'contract',
    amount: 25000000,
    currency: 'JPY',
    probability: 90,
    companyId: '3',
    contactIds: ['3', '8'],
    assignedTo: '3',
    closingDate: '2023-09-15T00:00:00Z',
    createdAt: '2023-06-20T13:45:00Z',
    updatedAt: '2023-08-12T09:20:00Z',
    notes: '共同研究開発契約の最終段階。契約書レビュー中。'
  },
  {
    id: '4',
    title: 'ブランドリニューアルプロジェクト',
    stage: 'negotiation',
    amount: 6000000,
    currency: 'JPY',
    probability: 60,
    companyId: '4',
    contactIds: ['4'],
    assignedTo: '1',
    closingDate: '2023-10-30T00:00:00Z',
    createdAt: '2023-07-25T11:00:00Z',
    updatedAt: '2023-08-08T15:30:00Z',
    notes: 'コーポレートアイデンティティの刷新。予算と範囲について交渉中。'
  },
  {
    id: '5',
    title: '持続可能建築プロジェクト',
    stage: 'new',
    amount: 120000000,
    currency: 'JPY',
    probability: 30,
    companyId: '5',
    contactIds: ['5'],
    assignedTo: '2',
    closingDate: '2023-12-15T00:00:00Z',
    createdAt: '2023-08-05T09:45:00Z',
    updatedAt: '2023-08-14T10:10:00Z',
    notes: '環境に配慮した新オフィスビル建設の初期提案。'
  },
  {
    id: '6',
    title: 'デジタルトランスフォーメーション支援',
    stage: 'lost',
    amount: 18000000,
    currency: 'JPY',
    probability: 0,
    companyId: '1',
    contactIds: ['1'],
    assignedTo: '3',
    closingDate: '2023-07-30T00:00:00Z',
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-07-30T14:20:00Z',
    notes: '競合他社に決定。次回案件に向けて関係維持。'
  }
];

// モックメールデータ
export const mockEmails: Email[] = [
  {
    id: '1',
    subject: '【重要】AIソリューション提案書について',
    body: '<p>田中様</p><p>先日はお時間をいただきありがとうございました。<br>ミーティングでお話しした内容に基づき、AIソリューションの提案書を作成いたしました。<br>添付ファイルをご確認いただき、ご質問やご要望がございましたらお知らせください。</p><p>よろしくお願いいたします。<br>山田</p>',
    sender: 'yamada@example.com',
    recipients: ['tanaka@techinnovation.co.jp'],
    sentAt: '2023-08-15T10:30:00Z',
    read: true,
    threadId: 'thread1',
    contactIds: ['1'],
    attachments: [
      {
        id: 'att1',
        name: 'AI_Solution_Proposal_v1.pdf',
        type: 'application/pdf',
        size: 2500000,
        url: '#'
      }
    ],
    createdAt: '2023-08-15T10:30:00Z'
  },
  {
    id: '2',
    subject: 'Re: 【重要】AIソリューション提案書について',
    body: '<p>山田様</p><p>提案書を拝受いたしました。<br>内容を確認させていただき、来週初めに社内で検討する予定です。<br>その後、詳細についてディスカッションさせていただければと思います。</p><p>引き続きよろしくお願いいたします。<br>田中</p>',
    sender: 'tanaka@techinnovation.co.jp',
    recipients: ['yamada@example.com'],
    sentAt: '2023-08-16T09:15:00Z',
    read: true,
    threadId: 'thread1',
    contactIds: ['1'],
    attachments: [],
    createdAt: '2023-08-16T09:15:00Z'
  },
  {
    id: '3',
    subject: '海外展開支援コンサルティングのご提案',
    body: '<p>佐々木様</p><p>先日は弊社サービスにご関心をお寄せいただき、誠にありがとうございます。<br>丸山商事様のアジア市場展開に関するコンサルティングサービスの概要をまとめました。<br>ご検討いただければ幸いです。</p><p>ご質問等ございましたら、いつでもご連絡ください。<br>佐藤</p>',
    sender: 'sato@example.com',
    recipients: ['sasaki@maruyama-corp.co.jp'],
    sentAt: '2023-08-10T14:15:00Z',
    read: true,
    threadId: 'thread2',
    contactIds: ['2'],
    attachments: [
      {
        id: 'att2',
        name: 'Asia_Market_Expansion_Proposal.pptx',
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        size: 3200000,
        url: '#'
      }
    ],
    createdAt: '2023-08-10T14:15:00Z'
  },
  {
    id: '4',
    subject: '研究開発パートナーシップに関する契約書ドラフト',
    body: '<p>高橋様</p><p>先日の打ち合わせを踏まえ、研究開発パートナーシップに関する契約書のドラフトを作成いたしました。<br>法務部門と確認の上、ご意見をいただければ幸いです。<br>特に第5条と第8条については、貴社のご要望に沿った形で修正しております。</p><p>よろしくお願いいたします。<br>鈴木</p>',
    sender: 'suzuki@example.com',
    recipients: ['takahashi@midorikawa-pharma.co.jp'],
    sentAt: '2023-08-12T09:20:00Z',
    read: false,
    threadId: 'thread3',
    contactIds: ['3'],
    attachments: [
      {
        id: 'att3',
        name: 'RD_Partnership_Agreement_Draft.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 1800000,
        url: '#'
      }
    ],
    createdAt: '2023-08-12T09:20:00Z'
  },
  {
    id: '5',
    subject: 'ブランドリニューアルプロジェクトの見積もり',
    body: '<p>伊藤様</p><p>お世話になっております。<br>先日ご相談いただいたブランドリニューアルプロジェクトについて、詳細な見積もりと提案内容をまとめました。<br>スコープや予算についてご検討いただき、調整が必要な点がございましたらお知らせください。</p><p>よろしくお願いいたします。<br>山田</p>',
    sender: 'yamada@example.com',
    recipients: ['ito@aozora-design.jp'],
    sentAt: '2023-08-08T15:30:00Z',
    read: true,
    threadId: 'thread4',
    contactIds: ['4'],
    attachments: [
      {
        id: 'att4',
        name: 'Brand_Renewal_Proposal_Aozora.pdf',
        type: 'application/pdf',
        size: 4500000,
        url: '#'
      }
    ],
    createdAt: '2023-08-08T15:30:00Z'
  }
];

// モック予定データ
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AIソリューション提案プレゼンテーション',
    start: '2023-08-25T14:00:00Z',
    end: '2023-08-25T15:30:00Z',
    allDay: false,
    location: '株式会社テックイノベーション 会議室A',
    description: '提案書に基づくプレゼンテーションと質疑応答',
    attendees: ['yamada@example.com', 'tanaka@techinnovation.co.jp', 'kobayashi@techinnovation.co.jp'],
    contactIds: ['1', '6'],
    createdAt: '2023-08-16T10:00:00Z',
    updatedAt: '2023-08-16T10:00:00Z',
    color: '#2563eb'
  },
  {
    id: '2',
    title: '丸山商事との初回ミーティング',
    start: '2023-08-22T10:00:00Z',
    end: '2023-08-22T11:00:00Z',
    allDay: false,
    location: 'オンライン (Zoom)',
    description: 'アジア市場展開に関する初回ディスカッション',
    attendees: ['sato@example.com', 'sasaki@maruyama-corp.co.jp'],
    contactIds: ['2'],
    createdAt: '2023-08-10T15:30:00Z',
    updatedAt: '2023-08-10T15:30:00Z',
    color: '#14b8a6'
  },
  {
    id: '3',
    title: '研究開発契約の最終レビュー',
    start: '2023-08-28T13:00:00Z',
    end: '2023-08-28T15:00:00Z',
    allDay: false,
    location: '緑川製薬株式会社 本社',
    description: '契約書の最終確認と署名手続きについて',
    attendees: ['suzuki@example.com', 'takahashi@midorikawa-pharma.co.jp', 'kato@midorikawa-pharma.co.jp'],
    contactIds: ['3', '8'],
    createdAt: '2023-08-14T09:45:00Z',
    updatedAt: '2023-08-14T09:45:00Z',
    color: '#f97316'
  },
  {
    id: '4',
    title: 'ブランドリニューアル企画会議',
    start: '2023-08-24T11:00:00Z',
    end: '2023-08-24T12:30:00Z',
    allDay: false,
    location: '青空デザイン株式会社',
    description: 'ブランドコンセプトとビジュアルアイデンティティの検討',
    attendees: ['yamada@example.com', 'ito@aozora-design.jp'],
    contactIds: ['4'],
    createdAt: '2023-08-09T10:20:00Z',
    updatedAt: '2023-08-09T10:20:00Z',
    color: '#2563eb'
  },
  {
    id: '5',
    title: '持続可能建築プロジェクト初回提案',
    start: '2023-08-30T09:30:00Z',
    end: '2023-08-30T11:30:00Z',
    allDay: false,
    location: '山本建設株式会社 福岡本社',
    description: '環境配慮型オフィスビル建設の初期提案',
    attendees: ['sato@example.com', 'nakamura@yamamoto-kensetsu.co.jp'],
    contactIds: ['5'],
    createdAt: '2023-08-15T13:10:00Z',
    updatedAt: '2023-08-15T13:10:00Z',
    color: '#14b8a6'
  },
  {
    id: '6',
    title: '四半期営業戦略会議',
    start: '2023-08-21T09:00:00Z',
    end: '2023-08-21T12:00:00Z',
    allDay: false,
    location: '会議室B',
    description: '第3四半期の営業戦略と目標設定',
    attendees: ['yamada@example.com', 'sato@example.com', 'suzuki@example.com'],
    contactIds: [],
    createdAt: '2023-08-01T11:30:00Z',
    updatedAt: '2023-08-01T11:30:00Z',
    color: '#ef4444'
  },
  {
    id: '7',
    title: 'デジタルマーケティング戦略ミーティング',
    start: '2023-08-23T15:00:00Z',
    end: '2023-08-23T16:30:00Z',
    allDay: false,
    location: 'オンライン (Teams)',
    description: 'テックイノベーション社のデジタルマーケティング戦略について',
    attendees: ['suzuki@example.com', 'kobayashi@techinnovation.co.jp'],
    contactIds: ['6'],
    createdAt: '2023-08-10T09:15:00Z',
    updatedAt: '2023-08-10T09:15:00Z',
    color: '#f97316'
  }
];

// モックタスクデータ
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'AIソリューション提案書の修正',
    description: '顧客フィードバックに基づき、予算セクションと導入スケジュールを更新する',
    dueDate: '2023-08-20T17:00:00Z',
    status: 'pending',
    priority: 'high',
    assignedTo: '1',
    relatedTo: {
      type: 'deal',
      id: '1'
    },
    createdAt: '2023-08-16T11:30:00Z',
    updatedAt: '2023-08-16T11:30:00Z'
  },
  {
    id: '2',
    title: 'アジア市場調査レポートの作成',
    description: '丸山商事向けに、東南アジア主要5カ国の市場動向をまとめる',
    dueDate: '2023-08-21T17:00:00Z',
    status: 'pending',
    priority: 'medium',
    assignedTo: '2',
    relatedTo: {
      type: 'deal',
      id: '2'
    },
    createdAt: '2023-08-11T09:45:00Z',
    updatedAt: '2023-08-11T09:45:00Z'
  },
  {
    id: '3',
    title: '研究開発契約書の法務レビュー依頼',
    description: '最終ドラフトを法務部に送付し、確認を依頼する',
    dueDate: '2023-08-18T15:00:00Z',
    status: 'completed',
    priority: 'high',
    assignedTo: '3',
    relatedTo: {
      type: 'deal',
      id: '3'
    },
    createdAt: '2023-08-14T10:30:00Z',
    updatedAt: '2023-08-17T11:20:00Z'
  },
  {
    id: '4',
    title: 'ブランドリニューアル予算の見直し',
    description: '青空デザインからのフィードバックに基づき、予算を10%削減する方法を検討',
    dueDate: '2023-08-22T12:00:00Z',
    status: 'pending',
    priority: 'medium',
    assignedTo: '1',
    relatedTo: {
      type: 'deal',
      id: '4'
    },
    createdAt: '2023-08-09T14:15:00Z',
    updatedAt: '2023-08-09T14:15:00Z'
  },
  {
    id: '5',
    title: '持続可能建築プロジェクトの参考事例収集',
    description: '国内外の環境配慮型オフィスビルの成功事例を5件以上リストアップ',
    dueDate: '2023-08-25T17:00:00Z',
    status: 'pending',
    priority: 'low',
    assignedTo: '2',
    relatedTo: {
      type: 'deal',
      id: '5'
    },
    createdAt: '2023-08-15T15:40:00Z',
    updatedAt: '2023-08-15T15:40:00Z'
  },
  {
    id: '6',
    title: '四半期営業レポートの作成',
    description: '第2四半期の営業実績と第3四半期の予測をまとめる',
    dueDate: '2023-08-19T17:00:00Z',
    status: 'overdue',
    priority: 'high',
    assignedTo: '3',
    relatedTo: null,
    createdAt: '2023-08-01T13:20:00Z',
    updatedAt: '2023-08-01T13:20:00Z'
  }
];

// モックタイムラインデータ
export const mockTimelineItems: TimelineItem[] = [
  {
    id: '1',
    type: 'email',
    title: '【重要】AIソリューション提案書について',
    description: '田中様へ提案書を送付しました。',
    date: '2023-08-15T10:30:00Z',
    relatedTo: {
      type: 'contact',
      id: '1',
      name: '田中 健太'
    },
    createdBy: '1'
  },
  {
    id: '2',
    type: 'event',
    title: '丸山商事との初回ミーティング',
    description: 'アジア市場展開に関する初回ディスカッション',
    date: '2023-08-22T10:00:00Z',
    relatedTo: {
      type: 'company',
      id: '2',
      name: '丸山商事株式会社'
    },
    createdBy: '2'
  },
  {
    id: '3',
    type: 'task',
    title: '研究開発契約書の法務レビュー依頼',
    description: '最終ドラフトを法務部に送付し、確認を依頼する',
    date: '2023-08-17T11:20:00Z',
    status: 'completed',
    relatedTo: {
      type: 'deal',
      id: '3',
      name: '研究開発パートナーシップ'
    },
    createdBy: '3'
  },
  {
    id: '4',
    type: 'email',
    title: 'Re: 【重要】AIソリューション提案書について',
    description: '田中様から提案書の確認と社内検討の連絡がありました。',
    date: '2023-08-16T09:15:00Z',
    relatedTo: {
      type: 'contact',
      id: '1',
      name: '田中 健太'
    },
    createdBy: '1'
  },
  {
    id: '5',
    type: 'note',
    title: 'ブランドリニューアルに関するメモ',
    description: '伊藤様との電話会議で、ブランドカラーの変更について前向きな反応があった。次回のミーティングで具体的な色案を提示する。',
    date: '2023-08-10T11:30:00Z',
    relatedTo: {
      type: 'contact',
      id: '4',
      name: '伊藤 由美'
    },
    createdBy: '1'
  },
  {
    id: '6',
    type: 'event',
    title: '四半期営業戦略会議',
    description: '第3四半期の営業戦略と目標設定',
    date: '2023-08-21T09:00:00Z',
    relatedTo: null,
    createdBy: '1'
  },
  {
    id: '7',
    type: 'task',
    title: '四半期営業レポートの作成',
    description: '第2四半期の営業実績と第3四半期の予測をまとめる',
    date: '2023-08-01T13:20:00Z',
    status: 'overdue',
    relatedTo: null,
    createdBy: '3'
  }
];

// モックデータをエクスポート
export const mockData = {
  users: mockUsers,
  companies: mockCompanies,
  contacts: mockContacts,
  deals: mockDeals,
  emails: mockEmails,
  events: mockEvents,
  tasks: mockTasks,
  timelineItems: mockTimelineItems
};

export default mockData;
