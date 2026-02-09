
export interface Theme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  fontFamily: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Party {
  id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  currentApplicants: number;
  price: number;
  description: string;
  imageUrl: string;
  introImages?: string[]; // 상세 소개용 추가 이미지들
  status: '모집중' | '마감' | '진행완료';
  googleFormUrl?: string;
}

export interface SiteInfo {
  name: string;
  heroTitle: string;
  heroSubTitle: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutFeatures: Feature[];
  contactEmail: string;
  instagramUrl?: string;
  kakaoUrl?: string;
  adminPassword?: string; // 관리자 접속 비밀번호
}
