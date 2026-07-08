import React, { useState } from 'react';
import { Journal, MoodRecord } from '../types';
import { Heart, Sparkles, BookOpen, Clock, Calendar, Save, Trash2, CheckCircle2 } from 'lucide-react';

interface GrowthJourneyProps {
  journals: Journal[];
  moodRecords: MoodRecord[];
  treeLevel: number;
  treeExp: number;
  onAddJournal: (content: string) => void;
  onDeleteJournal?: (id: string) => void;
}

export default function GrowthJourney({
  journals,
  moodRecords,
  treeLevel,
  treeExp,
  onAddJournal,
  onDeleteJournal
}: GrowthJourneyProps) {
  const [reflectionText, setReflectionText] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Handle saving journal entry
  const handleSaveJournal = () => {
    if (!reflectionText.trim()) return;
    onAddJournal(reflectionText);
    setReflectionText('');
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  // Cumulative statistics calculations
  const totalLogsCount = moodRecords.length;
  const journalEntriesCount = journals.length;
  // Estimate total healing minutes based on records
  const totalHealingMinutes = moodRecords.length * 15 + journals.length * 20;

  return (
    <div id="growth-journey-container" className="space-y-6 animate-fade-in pb-12">
      {/* Top Welcome Banner */}
      <div className="bg-emerald-50 text-emerald-950 rounded-3xl p-6 relative overflow-hidden shadow-sm border border-emerald-100/60">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfNsp9RxtmnoZ2orzxqbzgClztqMLjCC2VWV5R8sK0kUfmQysDYzDiDaCKUF7Y4W3VnbiSKts47mDogOUhWJuEWMdj6l9oB2Qa0tlgZQTpuoFzOfnZS160NcvE4nJtmutF5jBv0V86-8KPQ60Vy9TL9oMxhedzotdMbQlJ0BKq-v3yD6aUZVo0HHAhSKyy0ECV9sHZrZVSbv4GojoHz3U4tVwppwtPdCkoW1I11CwBwHWJQUnPG8CNlutQZyqih5kUnYvXl9h_vMfI" 
            alt="Campus walkway sun" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/90 via-emerald-50/70 to-transparent z-1"></div>

        <div className="relative z-10 space-y-1 max-w-md">
          <span className="text-[10px] bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">나의 성장 저니</span>
          <h2 className="text-base sm:text-lg font-bold text-emerald-900">마음의 걸음만큼 자라나는 힐링 반려 나무</h2>
          <p className="text-xs text-emerald-800/80 font-sans leading-relaxed">
            감정을 돌아보고, 따뜻한 소리를 듣고, 스트레칭을 정복하는 모든 과정이 나무의 거름이 됩니다.
          </p>
        </div>
      </div>

      {/* Main Panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tree Visual Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Lv. {treeLevel} 마음 성장 나무
            </span>
            <p className="text-xs text-neutral-400">당신의 성실한 마음 관찰로 튼튼하게 자랐어요!</p>
          </div>

          {/* Realistic hotlinked green tree pot photo with styled frames */}
          <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-neutral-100 shadow-md">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUvFH3FXhR4_XEZHiu8FAlk69c2xL17ibGSi27epZvRf05bKGvwr7Q099mmrlKiE4CSs2SvtAc4TsaxcSO19Bw0_Zy812qI-hq8R_U28PisM6FyBWk-0zjEO5REji8TFjy5ImMKPQ8qbSiv-JqTsX3CpALJI7exXMexyjxinDBkqCG7SB1WEeJo_mnuSIICEQ9l1g8CvRTPPqdJPh_Bb1CUvZl_oCPTBW5p2CPAbyYeQHm5tJZKySfSR1EXEyDZz29etu1A1PAuymu" 
              alt="Beautiful growing tree in a pot" 
              className="w-full h-full object-cover rounded-full hover:scale-103 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Progress indicators */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-neutral-600">
              <span>다음 레벨 (Lv.{treeLevel + 1}) 성장도</span>
              <span className="text-indigo-600">{treeExp} / 100 Exp</span>
            </div>
            
            {/* Progress bar container */}
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-50">
              <div 
                style={{ width: `${treeExp}%` }}
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              ></div>
            </div>

            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>기초 묘목</span>
              <span>78% 채워짐</span>
              <span>푸른 거목</span>
            </div>
          </div>

          {/* Cumulative logs statistics */}
          <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-dashed border-neutral-100">
            <div className="p-2 rounded-2xl bg-neutral-50 border border-neutral-100/50">
              <span className="block text-[10px] text-neutral-400 font-bold uppercase">마음기록</span>
              <span className="text-sm font-extrabold text-neutral-800 font-mono mt-0.5 block">{totalLogsCount}회</span>
            </div>
            <div className="p-2 rounded-2xl bg-neutral-50 border border-neutral-100/50">
              <span className="block text-[10px] text-neutral-400 font-bold uppercase">누적치유</span>
              <span className="text-sm font-extrabold text-neutral-800 font-mono mt-0.5 block">{totalHealingMinutes}분</span>
            </div>
            <div className="p-2 rounded-2xl bg-neutral-50 border border-neutral-100/50">
              <span className="block text-[10px] text-neutral-400 font-bold uppercase">작성일지</span>
              <span className="text-sm font-extrabold text-neutral-800 font-mono mt-0.5 block">{journalEntriesCount}개</span>
            </div>
          </div>

        </div>

        {/* Right Column: Reflection Journal & History */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Daily Reflection Journal Form */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-neutral-800" />
                오늘의 성찰 일기장
              </h3>
              <p className="text-xs text-neutral-500">
                오늘 나를 따뜻하게 안아준 소소한 일, 내면의 생각들을 차분히 정리해 보세요. (+15 Exp)
              </p>
            </div>

            {/* Notification alert */}
            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 text-emerald-800 text-xs flex items-center gap-2.5 animate-slide-up">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <p className="font-semibold">성찰 다이어리가 안전하게 저장되었습니다! (+15 Exp 적립)</p>
              </div>
            )}

            <div className="space-y-3">
              <textarea
                rows={4}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="오늘 어떤 마음의 날씨를 마주하셨나요? 나를 스쳐간 감정과 편안함을 준 것들에 대해 정직하게 기록해보세요..."
                className="w-full text-xs p-3.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-neutral-50/50 placeholder:text-neutral-400 font-sans"
              />

              <button
                onClick={handleSaveJournal}
                disabled={!reflectionText.trim()}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-45 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>성찰 일기 저장하기</span>
              </button>
            </div>
          </div>

          {/* Section 2: Reflection History collection */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-500" />
              나의 성찰 일지 모아보기
            </h3>

            {journals.length > 0 ? (
              <div className="space-y-3">
                {[...journals].reverse().map((j) => (
                  <div key={j.id} className="p-4 rounded-2xl border border-neutral-50 bg-neutral-50/20 hover:bg-neutral-50/50 transition-all space-y-2 relative group">
                    <div className="flex justify-between items-center text-[10px] text-neutral-400">
                      <span className="font-mono">{j.date}</span>
                      <div className="flex items-center space-x-2">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold">
                          당시 나무 레벨: Lv.{j.treeLevel}
                        </span>
                        {onDeleteJournal && (
                          <button
                            onClick={() => onDeleteJournal(j.id)}
                            className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-sans whitespace-pre-line">
                      {j.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <span className="text-3xl block">📖</span>
                <p className="text-xs text-neutral-400">
                  아직 보관된 성찰 다이어리가 없습니다. 위의 다이어리 필드에 기록을 작성해보세요.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
