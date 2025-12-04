import React from 'react';
import { THEMES } from '../constants';
import { Theme, UserState } from '../types';
import { Check, Lock } from 'lucide-react';

interface ShopProps {
  user: UserState;
  currentTheme: Theme;
  onBuy: (themeId: string) => void;
  onEquip: (themeId: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ user, currentTheme, onBuy, onEquip }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-2xl border ${currentTheme.classes.bgSoft} ${currentTheme.classes.border} text-center`}>
        <h2 className={`text-2xl font-bold ${currentTheme.classes.text} mb-2`}>테마 상점</h2>
        <p className="opacity-75">나만의 브릿지를 꾸며보세요.</p>
        <div className="mt-4 text-3xl font-black flex items-center justify-center gap-2">
           🪙 {user.credits} <span className="text-sm font-normal opacity-60">보유 크레딧</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THEMES.map((theme) => {
          const isOwned = user.inventory.includes(theme.id);
          const isEquipped = user.activeThemeId === theme.id;
          const canAfford = user.credits >= theme.price;

          return (
            <div 
              key={theme.id}
              className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 ${
                isEquipped ? 'border-green-500 shadow-lg scale-[1.02]' : 'border-gray-200 hover:border-gray-300'
              } ${currentTheme.classes.bg}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`font-bold text-lg ${currentTheme.classes.text}`}>{theme.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: theme.primaryColor }}></div>
                    <span className="text-xs opacity-60 uppercase tracking-wider">미리보기</span>
                  </div>
                </div>
                {isEquipped && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Check size={12} /> 사용 중
                  </span>
                )}
              </div>

              <div className="mt-4">
                {isOwned ? (
                  <button
                    onClick={() => !isEquipped && onEquip(theme.id)}
                    disabled={isEquipped}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      isEquipped 
                        ? 'bg-gray-100 text-gray-400 cursor-default' 
                        : `${currentTheme.classes.button} opacity-90 hover:opacity-100`
                    }`}
                  >
                    {isEquipped ? '장착됨' : '테마 장착'}
                  </button>
                ) : (
                  <button
                    onClick={() => onBuy(theme.id)}
                    disabled={!canAfford}
                    className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      canAfford
                        ? `${currentTheme.classes.button}`
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? (
                      <>{theme.price} 크레딧으로 구매</>
                    ) : (
                      <><Lock size={16} /> {theme.price} 크레딧 필요</>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};