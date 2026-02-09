
import React, { useState } from 'react';
import { Theme, Party, SiteInfo } from '../types';
import { Calendar, MapPin, Users, Share2, Instagram, MessageCircle, ChevronRight, X, ExternalLink, ShieldCheck, Target, Heart, Mail } from 'lucide-react';

interface Props {
  theme: Theme;
  parties: Party[];
  siteInfo: SiteInfo;
  onAdminLogin: () => void;
}

const ClientView: React.FC<Props> = ({ theme, parties, siteInfo, onAdminLogin }) => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const openPartyDetail = (party: Party) => {
    setSelectedParty(party);
    document.body.style.overflow = 'hidden';
  };

  const closePartyDetail = () => {
    setSelectedParty(null);
    document.body.style.overflow = 'auto';
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-gray-100 bg-white/80">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-[0.1em] cursor-pointer" style={{ color: theme.primaryColor }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {siteInfo.name}
          </h1>
          <nav className="flex gap-8 md:gap-12 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <button onClick={() => scrollTo('party-grid')} className="hover:text-black transition-colors">Parties</button>
            <button onClick={() => scrollTo('about-section')} className="hover:text-black transition-colors">About</button>
            <button onClick={() => scrollTo('footer-section')} className="hover:text-black transition-colors">Contact</button>
          </nav>
          <div className="hidden md:block w-24"></div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="relative pt-64 pb-48 px-6 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: theme.primaryColor }}></div>
        <div className="absolute bottom-10 left-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10" style={{ backgroundColor: theme.accentColor }}></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-8 px-5 py-2 border border-gray-200 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            Premium Social Club
          </div>
          <h2 className="text-5xl md:text-8xl font-medium mb-10 leading-[1.2] tracking-tight text-gray-900 whitespace-pre-line">
            {siteInfo.heroTitle}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-normal leading-relaxed px-4">
            {siteInfo.heroSubTitle}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => scrollTo('party-grid')}
              className="px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-2xl shadow-blue-900/10 hover:-translate-y-1 transition-all"
              style={{ backgroundColor: theme.primaryColor, color: '#FFFFFF' }}
            >
              View Parties
            </button>
          </div>
        </div>
      </section>

      {/* 2. Party Grid */}
      <section id="party-grid" className="py-40 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-6">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block">Upcoming Events</span>
                <h3 className="text-4xl md:text-5xl font-light text-gray-900">Curated Parties</h3>
              </div>
            </div>

            {/* Grid Change: lg:grid-cols-3 for 3 columns on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {parties.map((party) => (
                <div key={party.id} onClick={() => openPartyDetail(party)} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img src={party.imageUrl} alt={party.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-5 left-5">
                      <div className="px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md bg-white/90 text-black shadow-sm">
                        {party.status}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="px-1 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug flex-1 pr-4 break-keep">{party.title}</h4>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                      <div className="flex flex-col gap-1 text-xs text-gray-400 font-medium">
                        <div className="flex items-center gap-2"><Calendar size={14} /><span>{party.date}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={14} /><span className="line-clamp-1">{party.location}</span></div>
                      </div>
                      <span className="text-lg font-bold" style={{ color: theme.primaryColor }}>₩{party.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section id="about-section" className="py-40 bg-gray-50/50 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-4 block">Values</span>
            <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">{siteInfo.aboutTitle}</h3>
            <p className="text-xl text-gray-500 font-light leading-relaxed whitespace-pre-line px-4">
              {siteInfo.aboutDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {siteInfo.aboutFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-50">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500 text-gray-900">
                  {idx === 0 ? <ShieldCheck size={24} strokeWidth={1.5} /> : idx === 1 ? <Target size={24} strokeWidth={1.5} /> : <Heart size={24} strokeWidth={1.5} />}
                </div>
                <h4 className="text-lg font-bold mb-3 text-gray-900">{feature.title}</h4>
                <p className="text-gray-400 text-sm font-normal leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedParty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closePartyDetail}></div>
          <div className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[92vh]">
            <button onClick={closePartyDetail} className="absolute top-8 right-8 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white md:text-gray-300 md:hover:text-black transition-colors">
              <X size={28} />
            </button>
            
            {/* Left Section: Gallery */}
            <div className="w-full md:w-1/2 h-80 md:h-auto overflow-y-auto bg-gray-50 flex flex-col gap-1 p-1">
              <img src={selectedParty.imageUrl} className="w-full aspect-[4/5] object-cover rounded-2xl" alt="Main" />
              {(selectedParty.introImages || []).map((img, idx) => (
                <img key={idx} src={img} className="w-full aspect-[4/5] object-cover rounded-2xl" alt={`Intro ${idx}`} />
              ))}
            </div>

            {/* Right Section: Details */}
            <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto bg-white">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-6 block">Private Party</span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight">{selectedParty.title}</h3>
              <div className="grid grid-cols-2 gap-10 mb-12 border-b border-gray-50 pb-12">
                <div className="space-y-2"><span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Date</span><div className="text-sm font-medium">{selectedParty.date}</div></div>
                <div className="space-y-2"><span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Location</span><div className="text-sm font-medium line-clamp-1">{selectedParty.location}</div></div>
                <div className="space-y-2"><span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Fee</span><div className="text-2xl font-bold text-blue-900">₩{selectedParty.price.toLocaleString()}</div></div>
                <div className="space-y-2"><span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Entry</span><div className="text-2xl font-bold text-gray-700">{selectedParty.currentApplicants}/{selectedParty.capacity}</div></div>
              </div>
              <div className="prose prose-sm max-w-none text-gray-500 font-normal leading-relaxed mb-12">
                <p className="whitespace-pre-line">{selectedParty.description}</p>
              </div>
              {selectedParty.status === '모집중' ? (
                <a href={selectedParty.googleFormUrl || '#'} target="_blank" className="w-full py-6 rounded-3xl flex items-center justify-center gap-3 text-white font-bold transition-all hover:brightness-110 shadow-2xl shadow-blue-900/20 active:scale-[0.98]" style={{ backgroundColor: theme.primaryColor }}>참여 신청하기 <ExternalLink size={20} /></a>
              ) : (
                <button disabled className="w-full py-6 rounded-3xl bg-gray-100 text-gray-400 font-bold">마감되었습니다</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer id="footer-section" className="py-32 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
            <div className="max-w-sm mx-auto md:mx-0">
              <h1 className="text-3xl font-black tracking-widest mb-8" style={{ color: theme.primaryColor }}>{siteInfo.name}</h1>
              <p className="text-gray-400 font-normal leading-relaxed text-sm">
                새로운 만남의 설렘과 고급스러운 신뢰감이 공존하는 프리미엄 플랫폼
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mx-auto md:mx-0">
              <div id="contact-info">
                <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-8">Contact</h5>
                <div className="flex items-center gap-3 justify-center md:justify-start text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors">
                   <Mail size={20} />
                   <a href={`mailto:${siteInfo.contactEmail}`}>{siteInfo.contactEmail}</a>
                </div>
              </div>
              <div>
                <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-8">Social</h5>
                <div className="flex gap-6 justify-center md:justify-start">
                  <a 
                    href={siteInfo.instagramUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href={siteInfo.kakaoUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-yellow-500 transition-colors"
                  >
                    <MessageCircle size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 pt-10 border-t border-gray-50 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-300 text-[10px] font-bold tracking-widest uppercase">© 2024 {siteInfo.name}. All rights reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
              <button onClick={onAdminLogin} className="hover:text-black transition-colors text-gray-200">Admin</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientView;
