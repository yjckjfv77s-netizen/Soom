import React, { useState } from 'react';
import { TabType } from './components/NavigationBar';
import NavigationBar from './components/NavigationBar';
import HomeDashboard from './components/HomeDashboard';
import MoodCalendar from './components/MoodCalendar';
import RelaxSection from './components/RelaxSection';
import CommunityLounge from './components/CommunityLounge';
import GrowthJourney from './components/GrowthJourney';
import { MoodType, MoodRecord, Journal, LoungePost, Product } from './types';
import { INITIAL_MOOD_RECORDS, INITIAL_POSTS, MARKET_PRODUCTS, USER_PROFILE } from './mockData';
import { Heart, Sparkles, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [relaxSubTab, setRelaxSubTab] = useState<string>('stretching');
  const [loungeSubTab, setLoungeSubTab] = useState<string>('lounge');

  // Core application states
  const [moodRecords, setMoodRecords] = useState<MoodRecord[]>(INITIAL_MOOD_RECORDS);
  const [journals, setJournals] = useState<Journal[]>([
    {
      id: 'j0',
      date: '2026-07-06',
      content: '요즘 학업 부담감에 마음이 조급했는데, 수움 쉼터에서 목 스트레칭을 정복하고 모닥불 소리를 가만히 듣고 나니 신기하게 몸의 긴장이 부드럽게 완화되는 걸 체험했다. 매일 밤 나를 돌보는 작은 호흡을 잊지 말자.',
      treeLevel: 11
    }
  ]);
  const [loungePosts, setLoungePosts] = useState<LoungePost[]>(INITIAL_POSTS);
  const [marketProducts, setMarketProducts] = useState<Product[]>(MARKET_PRODUCTS);

  // Tree growth levels
  const [treeLevel, setTreeLevel] = useState<number>(12);
  const [treeExp, setTreeExp] = useState<number>(78);
  const [levelUpAlert, setLevelUpAlert] = useState<boolean>(false);

  // Experience booster helper
  const handleAddExp = (exp: number) => {
    setTreeExp((prevExp) => {
      const nextExp = prevExp + exp;
      if (nextExp >= 100) {
        setTreeLevel((prevLevel) => prevLevel + 1);
        setLevelUpAlert(true);
        setTimeout(() => {
          setLevelUpAlert(false);
        }, 5000);
        return nextExp - 100;
      }
      return nextExp;
    });
  };

  // State handlers
  const handleAddMood = (mood: MoodType, score: number, note?: string) => {
    const todayFormatted = new Date().toISOString().split('T')[0];
    const newRecord: MoodRecord = {
      id: String(Date.now()),
      date: todayFormatted,
      mood,
      score,
      note
    };
    setMoodRecords((prev) => [...prev, newRecord]);
    handleAddExp(10); // Award experience
  };

  const handleAddJournal = (content: string) => {
    const todayFormatted = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const newJournal: Journal = {
      id: String(Date.now()),
      date: todayFormatted,
      content,
      treeLevel
    };
    setJournals((prev) => [...prev, newJournal]);
    handleAddExp(15); // Award experience
  };

  const handleAddPost = (content: string, category: LoungePost['category'], imageUrl?: string) => {
    const newPost: LoungePost = {
      id: String(Date.now()),
      author: USER_PROFILE.name,
      role: '나 (컴공과 22학번)',
      avatarUrl: USER_PROFILE.avatarUrl,
      content,
      category,
      imageUrl,
      likes: 0,
      comments: [],
      date: '방금 전'
    };
    setLoungePosts((prev) => [newPost, ...prev]);
    handleAddExp(5); // Small award for sharing
  };

  const handleToggleLikePost = (postId: string) => {
    setLoungePosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = post.isLikedByUser;
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            isLikedByUser: !isLiked
          };
        }
        return post;
      })
    );
  };

  const handleAddCommentPost = (postId: string, commentContent: string) => {
    const newComment = {
      id: String(Date.now()),
      author: USER_PROFILE.name,
      content: commentContent,
      date: '방금 전'
    };
    setLoungePosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  const handleToggleFavoriteProduct = (productId: string) => {
    setMarketProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return { ...p, isFavorite: !p.isFavorite };
        }
        return p;
      })
    );
  };

  const handleDeleteJournal = (id: string) => {
    setJournals((prev) => prev.filter((j) => j.id !== id));
  };

  // Handle cross-component quick navigations
  const handleNavigate = (tab: TabType, subTab?: string) => {
    setActiveTab(tab);
    if (tab === 'relax' && subTab) {
      setRelaxSubTab(subTab);
    }
    if (tab === 'lounge' && subTab) {
      setLoungeSubTab(subTab);
    }
  };

  return (
    <div id="soom-app-wrapper" className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-sans pb-24 relative selection:bg-neutral-900 selection:text-white">
      {/* Top Floating App Header Bar */}
      <header id="floating-app-header" className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-100 py-3 sm:py-4 px-4 sm:px-6 shadow-xs">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          {/* Logo brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigate('home')}>
            {/* Pulsing Breathing green Dot to represent mindfulness respiration */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-lg font-black tracking-tight text-neutral-900 flex items-center font-sans gap-0.5">
              수움 <span className="text-neutral-400 font-medium text-xs tracking-normal font-mono">soom</span>
            </span>
          </div>

          {/* Quick interactive header widgets */}
          <div className="flex items-center space-x-3 text-xs font-semibold text-neutral-500">
            <div className="flex items-center space-x-1 bg-neutral-100 px-2.5 py-1 rounded-full text-[10px]">
              <span className="text-amber-500">🌱</span>
              <span>Lv. {treeLevel}</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 bg-neutral-100 px-2.5 py-1 rounded-full text-[10px]">
              <span className="text-rose-500">❤️</span>
              <span>스트릭 {moodRecords.length}일</span>
            </div>
            <img 
              src={USER_PROFILE.avatarUrl} 
              alt="Avatar Profile" 
              className="w-7 h-7 rounded-full object-cover border border-neutral-100"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </header>

      {/* Level Up Notification Modal */}
      {levelUpAlert && (
        <div id="level-up-modal" className="fixed top-18 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-950 text-white px-6 py-4 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4 animate-bounce max-w-sm sm:max-w-md">
          <div className="bg-amber-400 text-neutral-950 p-2.5 rounded-2xl">
            <Award className="w-6 h-6 fill-neutral-950" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> LEVEL UP!
            </p>
            <h4 className="text-sm font-bold">마음 성장 나무 레벨 {treeLevel} 달성</h4>
            <p className="text-[11px] text-neutral-300 leading-tight">
              성실한 마음 일지 쓰기와 호흡 수련으로 나무가 한 등급 크게 자라났습니다!
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'home' && (
          <HomeDashboard 
            moodRecords={moodRecords} 
            onAddMood={handleAddMood} 
            onNavigate={handleNavigate} 
          />
        )}

        {activeTab === 'calendar' && (
          <MoodCalendar 
            moodRecords={moodRecords} 
            onNavigate={(tab) => handleNavigate(tab)} 
          />
        )}

        {activeTab === 'relax' && (
          <RelaxSection 
            initialSubTab={relaxSubTab} 
            onNavigate={(tab) => handleNavigate(tab)}
            onAddExp={handleAddExp} 
          />
        )}

        {activeTab === 'lounge' && (
          <CommunityLounge 
            initialSubTab={loungeSubTab}
            loungePosts={loungePosts} 
            marketProducts={marketProducts}
            onAddPost={handleAddPost}
            onToggleLikePost={handleToggleLikePost}
            onAddCommentPost={handleAddCommentPost}
            onToggleFavoriteProduct={handleToggleFavoriteProduct}
          />
        )}

        {activeTab === 'growth' && (
          <GrowthJourney 
            journals={journals} 
            moodRecords={moodRecords} 
            treeLevel={treeLevel} 
            treeExp={treeExp} 
            onAddJournal={handleAddJournal}
            onDeleteJournal={handleDeleteJournal}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Menu */}
      <NavigationBar activeTab={activeTab} onTabChange={(tab) => handleNavigate(tab)} />
    </div>
  );
}
