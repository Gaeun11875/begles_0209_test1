
import { Theme, Party, SiteInfo } from './types';

export const DEFAULT_THEME: Theme = {
  primaryColor: '#0369A1', // Ocean Blue
  accentColor: '#38BDF8',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  fontFamily: '"Pretendard Variable", Pretendard, -apple-system, sans-serif'
};

export const DEFAULT_SITE_INFO: SiteInfo = {
  name: 'BEGLES',
  heroTitle: 'Genuine Connections,\nBetween Glasses',
  heroSubTitle: '글라스 사이로 오가는 진심 어린 대화와 새로운 인연, 프리미엄 소셜 클럽 베글스(BEGLES)',
  aboutTitle: 'Why BEGLES?',
  aboutDescription: 'BEGLES는 "Between Glass"의 가치를 지향합니다. 엄격한 멤버 선별 시스템을 통해 검증된 분들과 함께, 와인의 풍미만큼이나 다채롭고 깊이 있는 인연의 순간을 선사합니다.',
  aboutFeatures: [
    {
      title: 'Curated Members',
      description: '단순한 가입이 아닌, 신원 검증과 내부 선별 과정을 통과한 분들만 파티에 초대됩니다. 수준 높은 대화와 매너는 기본입니다.'
    },
    {
      title: 'Atmosphere',
      description: '단순한 장소가 아닌, 대화의 몰입도를 높일 수 있는 엄선된 공간과 그 분위기에 어울리는 최상급 와인 리스트를 제공합니다.'
    },
    {
      title: 'Private & Safe',
      description: '모든 만남은 철저한 보안 하에 프라이빗하게 진행되며, 파티 종료 후에도 매너 있는 커뮤니티 문화를 유지합니다.'
    }
  ],
  contactEmail: 'contact@begles.com',
  instagramUrl: 'https://instagram.com',
  kakaoUrl: 'https://pf.kakao.com',
  adminPassword: '1234'
};

export const INITIAL_PARTIES: Party[] = [
  {
    id: '1',
    title: '서울 신라호텔 프라이빗 와인 파티',
    date: '2024-06-15 19:00',
    location: '서울 중구 신라호텔 영빈관',
    capacity: 20,
    currentApplicants: 12,
    price: 150000,
    description: '엄선된 최고급 와인과 함께하는 신라호텔의 품격 있는 저녁 만남입니다. 신라호텔 전문 소믈리에가 직접 큐레이션한 5종의 프리미엄 와인과 페어링 코스 요리가 제공됩니다.',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
    introImages: [
      'https://images.unsplash.com/photo-1553344518-a4673899912c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop'
    ],
    status: '모집중',
    googleFormUrl: 'https://forms.google.com'
  },
  {
    id: '2',
    title: '청담동 테라스 멤버십 미팅',
    date: '2024-06-22 18:00',
    location: '서울 강남구 청담동 루프탑 카페',
    capacity: 12,
    currentApplicants: 8,
    price: 80000,
    description: '노을 지는 강남의 야경을 배경으로 편안하게 대화할 수 있는 프라이빗 미팅입니다. 소수 정예로 운영되어 깊이 있는 대화가 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
    introImages: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop'
    ],
    status: '모집중',
    googleFormUrl: 'https://forms.google.com'
  },
  {
    id: '3',
    title: '한남동 프라이빗 다이닝 소셜',
    date: '2024-06-29 19:30',
    location: '서울 용산구 한남동 미슐랭 가이드 레스토랑',
    capacity: 8,
    currentApplicants: 4,
    price: 180000,
    description: '한남동의 조용한 골목, 미슐랭 스타 셰프의 창의적인 요리와 함께하는 극소수 정예 다이닝 파티입니다. 미식과 예술을 사랑하는 분들을 위해 준비했습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
    introImages: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
    ],
    status: '모집중',
    googleFormUrl: 'https://forms.google.com'
  },
  {
    id: '4',
    title: '시그니엘 서울 스카이라인 라운지',
    date: '2024-07-06 20:00',
    location: '서울 송파구 잠실 시그니엘 서울 79층',
    capacity: 16,
    currentApplicants: 10,
    price: 120000,
    description: '대한민국에서 가장 높은 곳에서 즐기는 샴페인 나이트입니다. 환상적인 한강 뷰와 시티 라이트를 감상하며 새로운 인연과 우아한 시간을 만끽하세요.',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop',
    introImages: [
      'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=2070&auto=format&fit=crop'
    ],
    status: '모집중',
    googleFormUrl: 'https://forms.google.com'
  }
];
