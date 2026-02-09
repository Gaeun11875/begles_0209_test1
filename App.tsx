
import React, { useState, useEffect } from 'react';
import { Theme, Party, SiteInfo } from './types';
import { DEFAULT_THEME, INITIAL_PARTIES, DEFAULT_SITE_INFO } from './constants';
import ClientView from './components/ClientView';
import AdminDashboard from './components/AdminDashboard';
import { Lock, User, Key, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [parties, setParties] = useState<Party[]>(INITIAL_PARTIES);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);

  // Load from local storage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('sogeting_theme');
    const savedParties = localStorage.getItem('sogeting_parties');
    const savedSiteInfo = localStorage.getItem('sogeting_siteinfo');

    if (savedTheme) setTheme(JSON.parse(savedTheme));
    if (savedParties) setParties(JSON.parse(savedParties));
    if (savedSiteInfo) setSiteInfo(JSON.parse(savedSiteInfo));
    
    // Check if was already admin in this session
    const wasAdmin = sessionStorage.getItem('is_admin_session') === 'true';
    if (wasAdmin) setIsAdmin(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('sogeting_theme', JSON.stringify(theme));
    localStorage.setItem('sogeting_parties', JSON.stringify(parties));
    localStorage.setItem('sogeting_siteinfo', JSON.stringify(siteInfo));
  }, [theme, parties, siteInfo]);

  const toggleAdmin = () => {
    if (isAdmin) {
      // Logout - 즉시 저장(useEffect에서 처리됨) 후 홈으로 이동
      setIsAdmin(false);
      sessionStorage.removeItem('is_admin_session');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show login modal
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 지정된 계정 정보 확인
    if (idInput === 'begles_manager' && passwordInput === 'BMB9696!') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setIdInput('');
      setPasswordInput('');
      setLoginError(false);
      sessionStorage.setItem('is_admin_session', 'true');
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ 
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily 
      }}
    >
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
          <div className={`bg-white w-full max-w-md p-10 md:p-14 rounded-[3.5rem] shadow-2xl transition-all duration-300 ${loginError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-black shadow-inner">
                <Lock size={32} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Manager Sign-in</h2>
              <p className="text-gray-400 text-sm font-light">관리자 계정 정보를 입력하세요.</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    placeholder="Manager ID"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white py-5 pl-14 pr-8 rounded-2xl outline-none transition-all font-bold"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                    <Key size={18} />
                  </div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white py-5 pl-14 pr-8 rounded-2xl outline-none transition-all font-bold"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-red-500 text-[11px] font-black uppercase tracking-widest text-center animate-pulse">
                  Invalid Credentials
                </p>
              )}
              
              <div className="flex flex-col gap-4 mt-10">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors shadow-xl shadow-black/10 active:scale-95"
                >
                  Sign In <ChevronRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => { setShowLoginModal(false); setIdInput(''); setPasswordInput(''); setLoginError(false); }}
                  className="w-full text-gray-400 py-3 rounded-2xl font-bold text-xs hover:text-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAdmin ? (
        <AdminDashboard 
          theme={theme} 
          setTheme={setTheme} 
          parties={parties} 
          setParties={setParties} 
          siteInfo={siteInfo}
          setSiteInfo={setSiteInfo}
          onLogout={toggleAdmin}
        />
      ) : (
        <ClientView 
          theme={theme} 
          parties={parties} 
          siteInfo={siteInfo}
          onAdminLogin={toggleAdmin}
        />
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};

export default App;
