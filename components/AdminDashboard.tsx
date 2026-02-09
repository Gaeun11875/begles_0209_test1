
import React, { useState, useRef } from 'react';
import { Theme, Party, SiteInfo } from '../types';
import { 
  Plus, Trash2, Edit, Save, Palette, FileText, 
  Settings, Image as ImageIcon, XCircle, Link as LinkIcon, ExternalLink, Info, Mail, Type, Instagram, MessageCircle, PlusCircle, Camera, Upload, ImagePlus, Lock, LogOut
} from 'lucide-react';

interface Props {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  parties: Party[];
  setParties: React.Dispatch<React.SetStateAction<Party[]>>;
  siteInfo: SiteInfo;
  setSiteInfo: React.Dispatch<React.SetStateAction<SiteInfo>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ 
  theme, setTheme, parties, setParties, siteInfo, setSiteInfo, onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'parties'>('parties');
  const [editingParty, setEditingParty] = useState<Party | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const deleteParty = (id: string) => {
    if (confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      setParties(parties.filter(p => p.id !== id));
    }
  };

  const saveParty = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingParty) {
      if (parties.find(p => p.id === editingParty.id)) {
        setParties(parties.map(p => p.id === editingParty.id ? editingParty : p));
      } else {
        setParties([...parties, editingParty]);
      }
      setEditingParty(null);
    }
  };

  const createNewParty = () => {
    setEditingParty({
      id: Date.now().toString(),
      title: '새로운 프리미엄 파티',
      date: new Date().toISOString().split('T')[0] + ' 19:00',
      location: '장소를 입력하세요',
      capacity: 10,
      currentApplicants: 0,
      price: 100000,
      description: '파티에 대한 상세 설명을 입력하세요.',
      imageUrl: '',
      introImages: [],
      status: '모집중',
      googleFormUrl: ''
    });
  };

  const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
    const newFeatures = [...siteInfo.aboutFeatures];
    newFeatures[index][field] = value;
    setSiteInfo({ ...siteInfo, aboutFeatures: newFeatures });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingParty) {
      try {
        const base64 = await fileToBase64(file);
        setEditingParty({ ...editingParty, imageUrl: base64 });
      } catch (err) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const files = e.target.files;
    if (!files || !editingParty) return;

    try {
      if (index !== undefined) {
        const file = files[0];
        if (file) {
          const base64 = await fileToBase64(file);
          const newImages = [...(editingParty.introImages || [])];
          newImages[index] = base64;
          setEditingParty({ ...editingParty, introImages: newImages });
        }
      } else {
        const base64Promises = (Array.from(files) as File[]).map(file => fileToBase64(file));
        const newBase64s = await Promise.all(base64Promises);
        setEditingParty({ 
          ...editingParty, 
          introImages: [...(editingParty.introImages || []), ...newBase64s] 
        });
      }
    } catch (err) {
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const addIntroImage = () => {
    if (editingParty) {
      const currentImages = editingParty.introImages || [];
      setEditingParty({ ...editingParty, introImages: [...currentImages, ''] });
    }
  };

  const removeIntroImage = (index: number) => {
    if (editingParty && editingParty.introImages) {
      const newImages = [...editingParty.introImages];
      newImages.splice(index, 1);
      setEditingParty({ ...editingParty, introImages: newImages });
    }
  };

  const updateIntroImage = (index: number, value: string) => {
    if (editingParty && editingParty.introImages) {
      const newImages = [...editingParty.introImages];
      newImages[index] = value;
      setEditingParty({ ...editingParty, introImages: newImages });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl flex flex-col z-10 border-r border-gray-100">
        <div className="p-10 border-b border-gray-50 text-center">
          <h2 className="text-2xl font-black tracking-tighter" style={{ color: theme.primaryColor }}>
            ADMIN CENTER
          </h2>
          <span className="text-[10px] font-black text-gray-300 tracking-[0.3em] uppercase mt-2 block">Premium Control</span>
        </div>
        <nav className="flex-1 px-6 py-10 space-y-4">
          <button onClick={() => setActiveTab('parties')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${activeTab === 'parties' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-400 font-medium'}`}>
            <FileText size={22} /> 파티 관리
          </button>
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${activeTab === 'content' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-400 font-medium'}`}>
            <Info size={22} /> 브랜드 스토리
          </button>
          <button onClick={() => setActiveTab('theme')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${activeTab === 'theme' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'hover:bg-gray-50 text-gray-400 font-medium'}`}>
            <Palette size={22} /> 디자인 설정
          </button>
        </nav>
        {/* Logout Button */}
        <div className="p-6 border-t border-gray-50">
          <button 
            type="button"
            onClick={onLogout} 
            className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl bg-gray-100 text-gray-500 font-bold hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <LogOut size={22} /> 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-16 bg-[#F8FAFC]">
        {activeTab === 'parties' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h3 className="text-4xl font-light tracking-tight">Party Management</h3>
                <p className="text-gray-400 mt-2 font-light">모든 파티 일정과 신청 현황을 한눈에 관리합니다.</p>
              </div>
              <button onClick={createNewParty} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-blue-500/20 flex items-center gap-3 hover:-translate-y-1 transition-all">
                <Plus size={20} /> 새 파티 등록
              </button>
            </div>
            <div className="grid gap-6">
              {parties.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
                  <p className="text-gray-400 italic">등록된 파티가 없습니다. 새로운 파티를 등록해보세요.</p>
                </div>
              ) : (
                parties.map(party => (
                  <div key={party.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-8">
                      <img src={party.imageUrl || 'https://via.placeholder.com/150?text=No+Image'} className="w-24 h-24 rounded-3xl object-cover" />
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold">{party.title}</h4>
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${party.status === '모집중' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{party.status}</span>
                        </div>
                        <p className="text-gray-400 font-light">{party.date} | {party.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setEditingParty(party)} className="p-4 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-2xl transition-colors"><Edit size={22} /></button>
                      <button onClick={() => deleteParty(party.id)} className="p-4 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-2xl transition-colors"><Trash2 size={22} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h3 className="text-4xl font-light tracking-tight mb-4">Brand Story & Content</h3>
              <p className="text-gray-400 font-light">사이트의 모든 텍스트 요소를 자유롭게 수정하세요.</p>
            </div>
            
            <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-10 border border-gray-100">
              <h4 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-6">
                <Settings size={20} className="text-blue-500" /> 기본 정보 설정
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">모임 이름 (Brand Name)</label>
                  <input 
                    type="text" 
                    value={siteInfo.name} 
                    onChange={(e) => setSiteInfo({...siteInfo, name: e.target.value})} 
                    className="w-full border-b-2 border-gray-100 py-4 text-xl font-bold outline-none focus:border-blue-500 transition-colors" 
                    placeholder="예: 비글 (BEAGLE)"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">문의 이메일 (Contact Email)</label>
                  <div className="flex items-center gap-3 border-b-2 border-gray-100">
                    <Mail size={18} className="text-gray-300" />
                    <input 
                      type="email" 
                      value={siteInfo.contactEmail} 
                      onChange={(e) => setSiteInfo({...siteInfo, contactEmail: e.target.value})} 
                      className="w-full py-4 text-xl font-bold outline-none focus:border-blue-500 transition-colors bg-transparent" 
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-10 border border-gray-100">
              <h4 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-6">
                <LinkIcon size={20} className="text-blue-500" /> SNS 채널 연동
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-pink-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Instagram size={14} /> 인스타그램 URL
                  </label>
                  <input 
                    type="text" 
                    value={siteInfo.instagramUrl || ''} 
                    onChange={(e) => setSiteInfo({...siteInfo, instagramUrl: e.target.value})} 
                    className="w-full border-b-2 border-gray-100 py-4 text-sm font-medium outline-none focus:border-pink-500 transition-colors" 
                    placeholder="https://instagram.com/beagle_social"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-yellow-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MessageCircle size={14} /> 카카오 플러스 친구 URL
                  </label>
                  <input 
                    type="text" 
                    value={siteInfo.kakaoUrl || ''} 
                    onChange={(e) => setSiteInfo({...siteInfo, kakaoUrl: e.target.value})} 
                    className="w-full border-b-2 border-gray-100 py-4 text-sm font-medium outline-none focus:border-yellow-500 transition-colors" 
                    placeholder="https://pf.kakao.com/_xxxx"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-10 border border-gray-100">
              <h4 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-6">
                <Type size={20} className="text-blue-500" /> 히어로 섹션 (메인 화면)
              </h4>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">메인 타이틀 (Hero Title)</label>
                <textarea 
                  rows={2} 
                  value={siteInfo.heroTitle} 
                  onChange={(e) => setSiteInfo({...siteInfo, heroTitle: e.target.value})} 
                  className="w-full border-b-2 border-gray-100 py-4 text-2xl font-light outline-none focus:border-blue-500 transition-colors" 
                  placeholder="와인에 비치다,\n비트윈 글라스"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">메인 부제목 (Hero Subtitle)</label>
                <textarea 
                  rows={2} 
                  value={siteInfo.heroSubTitle} 
                  onChange={(e) => setSiteInfo({...siteInfo, heroSubTitle: e.target.value})} 
                  className="w-full border-b-2 border-gray-100 py-4 text-lg font-light outline-none focus:border-blue-500 transition-colors" 
                  placeholder="글라스 사이로 오가는 진심 어린 대화..."
                />
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-10 border border-gray-100">
              <h4 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-6">
                <Info size={20} className="text-blue-500" /> 브랜드 스토리 (About Us)
              </h4>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">섹션 제목 (About Title)</label>
                <input 
                  type="text" 
                  value={siteInfo.aboutTitle} 
                  onChange={(e) => setSiteInfo({...siteInfo, aboutTitle: e.target.value})} 
                  className="w-full border-b-2 border-gray-100 py-4 text-2xl font-bold outline-none focus:border-blue-500 transition-colors" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">섹션 설명 (About Description)</label>
                <textarea 
                  rows={4} 
                  value={siteInfo.aboutDescription} 
                  onChange={(e) => setSiteInfo({...siteInfo, aboutDescription: e.target.value})} 
                  className="w-full bg-gray-50 rounded-3xl p-8 font-light leading-relaxed outline-none focus:bg-white focus:ring-2 ring-blue-500 transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteInfo.aboutFeatures.map((feature, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm space-y-6 border border-gray-100">
                  <span className="text-[10px] font-black text-gray-300 tracking-[0.2em]">FEATURE 0{idx + 1}</span>
                  <input 
                    type="text" 
                    value={feature.title} 
                    onChange={(e) => updateFeature(idx, 'title', e.target.value)} 
                    className="w-full border-b border-gray-100 py-2 font-bold outline-none focus:border-blue-500" 
                    placeholder="특징 제목" 
                  />
                  <textarea 
                    rows={4} 
                    value={feature.description} 
                    onChange={(e) => updateFeature(idx, 'description', e.target.value)} 
                    className="w-full text-sm text-gray-400 font-light leading-relaxed outline-none border-none p-0 focus:ring-0" 
                    placeholder="상세 설명" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h3 className="text-4xl font-light tracking-tight mb-4">Design Settings</h3>
              <p className="text-gray-400 font-light">브랜드 컬러와 스타일을 지정하세요.</p>
            </div>
            <div className="bg-white p-16 rounded-[3rem] shadow-sm space-y-16 border border-gray-100">
              <div className="grid grid-cols-2 gap-16">
                <div className="space-y-6 text-center">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Primary Color</label>
                  <div className="flex flex-col items-center gap-6">
                    <input 
                      type="color" 
                      value={theme.primaryColor} 
                      onChange={(e) => setTheme({...theme, primaryColor: e.target.value})} 
                      className="w-32 h-32 rounded-[2rem] cursor-pointer border-8 border-gray-50 shadow-inner overflow-hidden p-0 bg-transparent" 
                    />
                    <span className="font-mono text-xl text-gray-600">{theme.primaryColor.toUpperCase()}</span>
                  </div>
                </div>
                <div className="space-y-6 text-center">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Accent Color</label>
                  <div className="flex flex-col items-center gap-6">
                    <input 
                      type="color" 
                      value={theme.accentColor} 
                      onChange={(e) => setTheme({...theme, accentColor: e.target.value})} 
                      className="w-32 h-32 rounded-[2rem] cursor-pointer border-8 border-gray-50 shadow-inner overflow-hidden p-0 bg-transparent" 
                    />
                    <span className="font-mono text-xl text-gray-600">{theme.accentColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal for Parties */}
      {editingParty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 backdrop-blur-3xl bg-blue-900/10 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <form onSubmit={saveParty} className="flex flex-col h-full max-h-[95vh]">
              <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-3xl font-bold">Edit Party Details</h3>
                <button type="button" onClick={() => setEditingParty(null)} className="text-gray-300 hover:text-black transition-colors"><XCircle size={40} /></button>
              </div>
              
              <div className="p-12 overflow-y-auto space-y-12">
                {/* 메인 대표 사진 수정 */}
                <div className="bg-blue-50/30 p-10 rounded-[3rem] border border-blue-100/50">
                   <label className="text-[12px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2 mb-8">
                    <Camera size={16} /> 메인 대표 사진 (Main Thumbnail)
                  </label>
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-full md:w-64 aspect-video md:aspect-square rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white">
                      {editingParty.imageUrl ? (
                        <img src={editingParty.imageUrl} className="w-full h-full object-cover" alt="Main Preview" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 italic text-xs">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 space-y-6 w-full">
                      <p className="text-xs text-blue-600 font-bold">게시글 목록에서 바로 보이는 가장 중요한 사진입니다.</p>
                      
                      <div className="flex flex-col gap-4">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-fit px-8 py-4 bg-blue-600 text-white rounded-full font-bold flex items-center gap-3 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                        >
                          <Upload size={18} /> 이미지 파일 선택하기
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleMainImageUpload} 
                        />
                        
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400">또는 이미지 URL 직접 입력</label>
                          <input 
                            type="text" 
                            value={editingParty.imageUrl} 
                            onChange={(e) => setEditingParty({...editingParty, imageUrl: e.target.value})} 
                            className="w-full border-b border-blue-200 py-2 text-xs outline-none focus:border-blue-600 transition-colors bg-transparent" 
                            placeholder="https://..." 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 파티 소개 사진들 관리 (갤러리) */}
                <div className="space-y-8 bg-gray-50 p-10 rounded-[3rem]">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={16} /> 상세 소개 갤러리 (Intro Gallery)
                    </label>
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => galleryInputRef.current?.click()} 
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                      >
                        <ImagePlus size={16} /> 다중 사진 업로드
                      </button>
                      <input 
                        type="file" 
                        ref={galleryInputRef} 
                        multiple 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleGalleryUpload(e)} 
                      />
                      <button type="button" onClick={addIntroImage} className="text-gray-400 hover:text-black font-bold text-xs flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm">
                        <PlusCircle size={16} /> 빈 슬롯 추가
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(editingParty.introImages || []).map((imgUrl, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 relative group">
                        <button type="button" onClick={() => removeIntroImage(idx)} className="absolute -top-3 -right-3 text-red-500 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10">
                          <XCircle size={24} />
                        </button>
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 mb-2 border border-gray-50 group-hover:brightness-95 transition-all cursor-pointer relative" onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => handleGalleryUpload(e as any, idx);
                          input.click();
                        }}>
                          {imgUrl ? (
                            <img src={imgUrl} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 text-xs italic gap-2">
                              <Upload size={20} />
                              이미지를 선택하세요
                            </div>
                          )}
                        </div>
                        <input 
                          type="text" 
                          value={imgUrl} 
                          onChange={(e) => updateIntroImage(idx, e.target.value)} 
                          className="w-full border-b border-gray-100 py-2 text-[10px] outline-none focus:border-blue-500" 
                          placeholder="또는 이미지 URL 입력" 
                        />
                      </div>
                    ))}
                    {(editingParty.introImages || []).length === 0 && (
                      <div className="col-span-full py-16 text-center text-gray-300 italic text-sm bg-white/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                        상세 이미지들을 업로드하여 파티의 분위기를 보여주세요.
                      </div>
                    )}
                  </div>
                </div>

                {/* 기본 텍스트 정보 */}
                <div className="grid grid-cols-2 gap-10">
                  <div className="col-span-2 space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase">Party Title</label>
                    <input type="text" required value={editingParty.title} onChange={(e) => setEditingParty({...editingParty, title: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 text-2xl font-bold outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-blue-500 uppercase">Status</label>
                    <select value={editingParty.status} onChange={(e) => setEditingParty({...editingParty, status: e.target.value as any})} className="w-full border-b-2 border-gray-100 py-4 font-bold outline-none focus:border-blue-500 bg-transparent">
                      <option value="모집중">🟢 모집중</option>
                      <option value="마감">🔴 마감</option>
                      <option value="진행완료">⚪ 진행완료</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase">Google Form URL</label>
                    <input type="text" required value={editingParty.googleFormUrl || ''} onChange={(e) => setEditingParty({...editingParty, googleFormUrl: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 text-blue-600 outline-none" />
                  </div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Date</label><input type="text" required value={editingParty.date} onChange={(e) => setEditingParty({...editingParty, date: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Location</label><input type="text" required value={editingParty.location} onChange={(e) => setEditingParty({...editingParty, location: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Price</label><input type="number" required value={editingParty.price} onChange={(e) => setEditingParty({...editingParty, price: parseInt(e.target.value)})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase">Capacity</label><input type="number" required value={editingParty.capacity} onChange={(e) => setEditingParty({...editingParty, capacity: parseInt(e.target.value)})} className="w-full border-b-2 border-gray-100 py-4 outline-none" /></div>
                  <div className="col-span-2 space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase">Description</label>
                    <textarea rows={6} value={editingParty.description} onChange={(e) => setEditingParty({...editingParty, description: e.target.value})} className="w-full bg-gray-50 rounded-[2rem] p-8 outline-none focus:bg-white focus:ring-2 ring-blue-500" />
                  </div>
                </div>
              </div>

              <div className="p-12 bg-gray-50 flex gap-6">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-6 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"><Save size={24} /> 저장하기</button>
                <button type="button" onClick={() => setEditingParty(null)} className="px-16 bg-white border border-gray-200 py-6 rounded-3xl font-bold text-gray-400 hover:bg-gray-100 transition-colors">닫기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
