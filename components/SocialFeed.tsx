import React, { useState, useEffect } from 'react';
import { FeedPost, Theme } from '../types';
import { Heart, MessageCircle } from 'lucide-react';

const MOCK_NAMES = ["조용한 산책가", "푸른 하늘", "새벽 별", "잔잔한 강물", "포근한 고양이", "용감한 새싹", "따뜻한 이불"];
const MOCK_MISSIONS = ["집 앞 공원 5분 산책", "책상 정리하기", "물 한 잔 천천히 마시기", "책 2페이지 읽기", "거울 보며 웃어보기", "이불 정리하기", "식물에 물 주기"];

interface SocialFeedProps {
  theme: Theme;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ theme }) => {
  const [posts, setPosts] = useState<FeedPost[]>([]);

  // Simulate incoming live feed
  useEffect(() => {
    // Initial posts
    const initialPosts: FeedPost[] = Array.from({ length: 3 }).map((_, i) => ({
      id: `post-${i}`,
      username: MOCK_NAMES[i % MOCK_NAMES.length],
      missionTitle: MOCK_MISSIONS[i % MOCK_MISSIONS.length],
      timestamp: `${(i + 1) * 5}분 전`,
      likes: Math.floor(Math.random() * 20),
    }));
    setPosts(initialPosts);

    const interval = setInterval(() => {
        const newPost: FeedPost = {
            id: `post-${Date.now()}`,
            username: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
            missionTitle: MOCK_MISSIONS[Math.floor(Math.random() * MOCK_MISSIONS.length)],
            timestamp: '방금 전',
            likes: 0
        };
        setPosts(prev => [newPost, ...prev].slice(0, 10)); // Keep last 10
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className={`font-bold text-lg px-2 ${theme.classes.text}`}>커뮤니티 발자국</h3>
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-fadeIn transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${theme.classes.bg} bg-opacity-80`} style={{backgroundColor: theme.primaryColor}}>
                    {post.username[0]}
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800">{post.username}</p>
                    <p className="text-xs text-gray-400">{post.timestamp}</p>
                </div>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                인증됨 ✅
            </span>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            완료한 미션: <span className={`font-medium ${theme.classes.accent}`}>{post.missionTitle}</span>
          </p>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
             <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <Heart size={14} /> {post.likes}
             </button>
             <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <MessageCircle size={14} /> 응원하기
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};