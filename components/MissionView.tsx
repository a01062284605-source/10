import React, { useState } from 'react';
import { Mission, Theme } from '../types';
import { CheckCircle2, RefreshCw, Upload, Camera } from 'lucide-react';
import { generateMission } from '../services/geminiService';

interface MissionViewProps {
  mission: Mission | null;
  setMission: (m: Mission) => void;
  onComplete: () => void;
  theme: Theme;
}

const difficultyMap: Record<string, string> = {
  'Easy': '쉬움',
  'Medium': '보통',
  'Hard': '어려움'
};

export const MissionView: React.FC<MissionViewProps> = ({ mission, setMission, onComplete, theme }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationImg, setVerificationImg] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Pass a random mood context for variety
      const moods = ["불안함", "무기력함", "활기참", "심심함", "외로움"];
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const newMissionData = await generateMission(mood);
      
      setMission({
        ...newMissionData,
        id: crypto.randomUUID(),
        status: 'pending',
        timestamp: Date.now(),
      });
      setVerificationImg(null); // Reset prev verification
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setVerificationImg(url);
    }
  };

  const handleSubmit = () => {
    setIsVerifying(true);
    // Simulate API verification delay
    setTimeout(() => {
      setIsVerifying(false);
      onComplete();
    }, 1500);
  };

  if (!mission) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6">
        <h3 className={`text-xl font-bold mb-4 ${theme.classes.text}`}>작은 발걸음을 내딛을 준비가 되셨나요?</h3>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-transform active:scale-95 ${theme.classes.button}`}
        >
          {isLoading ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
          {isLoading ? "생성 중..." : "오늘의 미션 받기"}
        </button>
        <p className="mt-4 text-sm opacity-60 max-w-xs">
          AI가 당신만을 위한 맞춤형 미션을 만들어드립니다.
        </p>
      </div>
    );
  }

  if (mission.status === 'completed') {
    return (
      <div className={`text-center p-10 rounded-2xl border-2 border-dashed ${theme.classes.border} ${theme.classes.bgSoft}`}>
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className={`text-2xl font-bold ${theme.classes.text} mb-2`}>미션 성공!</h2>
        <p className="opacity-70 mb-6">오늘 정말 멋진 한 걸음을 내디뎠어요. 내일 또 만나요!</p>
        <div className="text-sm font-bold opacity-50">
          다음 미션까지 12시간 남음
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-xl ${theme.classes.bg} border ${theme.classes.border}`}>
       {/* Header */}
       <div className={`p-6 ${theme.classes.bgSoft} border-b ${theme.classes.border}`}>
         <div className="flex justify-between items-start">
           <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 bg-white ${theme.classes.accent} shadow-sm uppercase tracking-wide`}>
                {difficultyMap[mission.difficulty] || mission.difficulty} 미션
              </span>
              <h2 className={`text-2xl md:text-3xl font-black ${theme.classes.text} leading-tight`}>
                {mission.title}
              </h2>
           </div>
           <div className="flex flex-col items-center justify-center bg-white w-16 h-16 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-2xl">🪙</span>
              <span className={`text-xs font-bold ${theme.classes.text}`}>+{mission.rewardPoints}</span>
           </div>
         </div>
       </div>

       {/* Body */}
       <div className="p-6 space-y-6">
         <div className="prose">
           <p className={`text-lg opacity-80 ${theme.classes.text}`}>
             {mission.description}
           </p>
         </div>

         {/* Verification Section */}
         <div className={`p-4 rounded-xl border-2 border-dashed ${theme.classes.border} bg-white/50`}>
            <h4 className={`text-sm font-bold mb-3 ${theme.classes.text} flex items-center gap-2`}>
              <Camera size={16}/> 미션 인증
            </h4>
            
            {!verificationImg ? (
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${theme.classes.border}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className={`w-8 h-8 mb-2 ${theme.classes.accent}`} />
                    <p className="text-sm opacity-60">사진 업로드 (선택)</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            ) : (
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden group">
                <img src={verificationImg} alt="Proof" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setVerificationImg(null)}
                  className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white transition"
                >
                  ✕
                </button>
              </div>
            )}
         </div>

         <div className="flex gap-3">
           <button
             onClick={handleSubmit}
             disabled={isVerifying}
             className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transform transition-all active:scale-[0.98] ${theme.classes.button} disabled:opacity-70`}
           >
             {isVerifying ? '인증 확인 중...' : '미션 완료하기'}
           </button>
           <button 
             onClick={handleGenerate}
             className={`px-4 rounded-xl border-2 ${theme.classes.border} hover:bg-gray-50 transition-colors`}
             title="다른 미션 받기"
           >
             <RefreshCw size={20} className="opacity-50" />
           </button>
         </div>
       </div>
    </div>
  );
};