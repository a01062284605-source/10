import { Theme, Mission } from './types';

export const INITIAL_CREDITS = 50;

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: '고요한 블루',
    price: 0,
    primaryColor: '#3b82f6',
    classes: {
      bg: 'bg-slate-50',
      bgSoft: 'bg-blue-50',
      text: 'text-slate-800',
      border: 'border-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      accent: 'text-blue-600',
    },
  },
  {
    id: 'forest',
    name: '평온한 숲',
    price: 150,
    primaryColor: '#10b981',
    classes: {
      bg: 'bg-stone-50',
      bgSoft: 'bg-emerald-50',
      text: 'text-stone-800',
      border: 'border-emerald-200',
      button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      accent: 'text-emerald-600',
    },
  },
  {
    id: 'sunset',
    name: '따스한 노을',
    price: 300,
    primaryColor: '#f97316',
    classes: {
      bg: 'bg-orange-50',
      bgSoft: 'bg-amber-100',
      text: 'text-orange-950',
      border: 'border-orange-200',
      button: 'bg-orange-500 hover:bg-orange-600 text-white',
      accent: 'text-orange-600',
    },
  },
  {
    id: 'midnight',
    name: '깊은 밤',
    price: 500,
    primaryColor: '#6366f1',
    classes: {
      bg: 'bg-slate-900',
      bgSoft: 'bg-slate-800',
      text: 'text-slate-100',
      border: 'border-indigo-800',
      button: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      accent: 'text-indigo-400',
    },
  },
];

export const FALLBACK_MISSION: Mission = {
  id: 'fallback-1',
  title: '아침 햇살 맞기',
  description: '창가에 서거나 잠시 밖으로 나가 5분 동안 따뜻한 햇살을 느껴보세요.',
  difficulty: 'Easy',
  rewardPoints: 50,
  status: 'pending',
  timestamp: Date.now(),
};