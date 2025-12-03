import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, User, Trophy } from 'lucide-react';
import { THEMES, INITIAL_CREDITS } from './constants';
import { UserState, Mission } from './types';
import { MissionView } from './components/MissionView';
import { Shop } from './components/Shop';
import { SocialFeed } from './components/SocialFeed';

// Simple tabs for navigation
type Tab = 'home' | 'shop' | 'profile';

function App() {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  // Persist user state in localStorage
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('missionBridgeUser');
    return saved ? JSON.parse(saved) : {
      credits: INITIAL_CREDITS,
      streak: 0,
      inventory: ['default'],
      activeThemeId: 'default',
      history: []
    };
  });

  const [currentMission, setCurrentMission] = useState<Mission | null>(() => {
    const saved = localStorage.getItem('missionBridgeCurrentMission');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('missionBridgeUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (currentMission) {
      localStorage.setItem('missionBridgeCurrentMission', JSON.stringify(currentMission));
    } else {
      localStorage.removeItem('missionBridgeCurrentMission');
    }
  }, [currentMission]);

  // --- Helpers ---
  const activeTheme = THEMES.find(t => t.id === user.activeThemeId) || THEMES[0];

  const handleMissionComplete = () => {
    if (!currentMission) return;
    
    // Confetti effect could go here
    const updatedMission = { ...currentMission, status: 'completed' as const };
    setCurrentMission(updatedMission);
    
    setUser(prev => ({
      ...prev,
      credits: prev.credits + currentMission.rewardPoints,
      streak: prev.streak + 1,
      history: [updatedMission, ...prev.history]
    }));
  };

  const handleBuyTheme = (themeId: string) => {
    const themeToBuy = THEMES.find(t => t.id === themeId);
    if (!themeToBuy || user.credits < themeToBuy.price) return;
    
    setUser(prev => ({
      ...prev,
      credits: prev.credits - themeToBuy.price,
      inventory: [...prev.inventory, themeId]
    }));
  };

  const handleEquipTheme = (themeId: string) => {
    if (user.inventory.includes(themeId)) {
      setUser(prev => ({ ...prev, activeThemeId: themeId }));
    }
  };

  // --- Render ---
  return (
    <div className={`min-h-screen transition-colors duration-500 ${activeTheme.classes.bg} font-sans`}>
      
      {/* Top Bar */}
      <header className={`sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b ${activeTheme.classes.border} px-4 py-3 flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${activeTheme.classes.button} flex items-center justify-center`}>
            <Trophy size={16} />
          </div>
          <h1 className={`font-bold text-xl tracking-tight ${activeTheme.classes.text}`}>Mission Bridge</h1>
        </div>
        <div className={`flex items-center gap-3 px-3 py-1 rounded-full ${activeTheme.classes.bgSoft} border ${activeTheme.classes.border}`}>
           <span className="text-xl">🪙</span>
           <span className={`font-bold ${activeTheme.classes.text}`}>{user.credits}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 pb-24">
        
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Overview */}
            <div className="flex gap-4">
               <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold">현재 스트릭</p>
                  <p className={`text-2xl font-black ${activeTheme.classes.text}`}>🔥 {user.streak}일</p>
               </div>
               <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold">총 미션</p>
                  <p className={`text-2xl font-black ${activeTheme.classes.text}`}>✅ {user.history.length}</p>
               </div>
            </div>

            {/* Main Mission Card */}
            <section>
              <h2 className={`text-lg font-bold mb-3 ${activeTheme.classes.text} opacity-80`}>오늘의 작은 발걸음</h2>
              <MissionView 
                mission={currentMission} 
                setMission={setCurrentMission} 
                onComplete={handleMissionComplete}
                theme={activeTheme}
              />
            </section>

            {/* Social Feed */}
            <section>
               <SocialFeed theme={activeTheme} />
            </section>
          </div>
        )}

        {activeTab === 'shop' && (
          <Shop 
            user={user} 
            currentTheme={activeTheme} 
            onBuy={handleBuyTheme} 
            onEquip={handleEquipTheme} 
          />
        )}

        {activeTab === 'profile' && (
          <div className="animate-fadeIn space-y-6">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                <div className={`w-24 h-24 mx-auto rounded-full ${activeTheme.classes.bgSoft} flex items-center justify-center text-4xl mb-4 border-4 ${activeTheme.classes.border}`}>
                  🦁
                </div>
                <h2 className={`text-2xl font-bold ${activeTheme.classes.text}`}>용감한 탐험가</h2>
                <p className="text-gray-400 text-sm">5일 전 가입함</p>
             </div>

             <div className="space-y-2">
                <h3 className={`font-bold px-2 ${activeTheme.classes.text}`}>최근 성공 기록</h3>
                {user.history.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">아직 완료한 미션이 없습니다.</p>
                ) : (
                  user.history.map((m, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 opacity-80">
                      <span className="font-medium text-gray-700">{m.title}</span>
                      <span className="text-xs text-gray-400">{new Date(m.timestamp).toLocaleDateString()}</span>
                    </div>
                  ))
                )}
             </div>
          </div>
        )}

      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 py-2 px-6 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === 'home' ? `${activeTheme.classes.accent} scale-110` : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">홈</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('shop')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === 'shop' ? `${activeTheme.classes.accent} scale-110` : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ShoppingBag size={24} strokeWidth={activeTab === 'shop' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">상점</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === 'profile' ? `${activeTheme.classes.accent} scale-110` : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">프로필</span>
          </button>
        </div>
      </nav>

    </div>
  );
}

export default App;