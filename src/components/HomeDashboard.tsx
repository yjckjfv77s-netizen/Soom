import React, { useState } from 'react';
import { MoodType, MoodRecord } from '../types';
import { USER_PROFILE } from '../mockData';
import { Sparkles, Heart, Clock, ArrowRight, CheckCircle, Smile } from 'lucide-react';

interface HomeDashboardProps {
  moodRecords: MoodRecord[];
  onAddMood: (mood: MoodType, score: number, note?: string) => void;
  onNavigate: (tab: 'home' | 'calendar' | 'relax' | 'lounge' | 'growth', subTab?: string) => void;
}

const MOOD_META: Record<MoodType, { emoji: string; label: string; color: string; bg: string; border: string; desc: string }> = {
  Calm: { emoji: '🧘', label: '평온', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: '마음이 고요하고 안정된 상태' },
  Joy: { emoji: '😊', label: '기쁨', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', desc: '활기차고 즐거운 긍정 에너지' },
  Reflective: { emoji: '💭', label: '사색', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', desc: '조용히 나를 돌아보고 조율하는 시간' },
  Mindful: { emoji: '🌿', label: '마음챙김', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', desc: '온전히 현재에 집중하며 정돈하는 느낌' },
  Tired: { emoji: '😴', label: '피로', color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-300', desc: '에너지가 바닥나고 몸과 맘이 지친 상태' }
};

export default function HomeDashboard({ moodRecords, onAddMood, onNavigate }: HomeDashboardProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodScore, setMoodScore] = useState<number>(5);
  const [moodNote, setMoodNote] = useState<string>('');
  const [isLoggedToday, setIsLoggedToday] = useState(false);

  // Get current date formatted
  const todayStr = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  // Handle logging mood
  const handleLogMood = () => {
    if (!selectedMood) return;
    onAddMood(selectedMood, moodScore, moodNote);
    setIsLoggedToday(true);
    setSelectedMood(null);
    setMoodNote('');
    setMoodScore(5);
    // Auto scroll or success effect
    setTimeout(() => {
      setIsLoggedToday(false);
    }, 4000);
  };

  // Calculate stats for "이번 주 마음 날씨"
  // We assume the last 7 items in moodRecords correspond to the current week
  const weekRecords = moodRecords.slice(-7);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  // Map latest logs to display
  const latestLogs = [...moodRecords].reverse().slice(0, 3);

  // Customized tip based on the very last mood record
  const lastRecord = moodRecords[moodRecords.length - 1];
  const lastMoodType = lastRecord?.mood || 'Calm';
  const getCustomTip = (mood: MoodType) => {
    switch (mood) {
      case 'Tired':
        return {
          title: '어깨와 눈에 쌓인 디지털 피로 풀어내기',
          desc: '오늘 유독 지쳐 보이시네요. 쉼터에서 "눈 피로 해소 스트레칭"과 함께 "아늑한 다락방 피아노" 소리치유를 10분만 즐겨보세요.',
          actionLabel: '눈 피로 스트레칭 하러 가기',
          targetSubTab: 'stretching'
        };
      case 'Reflective':
        return {
          title: '다이어리에 마음의 소리 온전히 담아보기',
          desc: '사색에 잠겨 계시군요. 성장 저니 탭으로 이동하여 오늘 느낀 솔직한 생각들을 글로 정리해 보며 나무를 한 단계 키워보세요.',
          actionLabel: '마음 일지 쓰러 가기',
          targetSubTab: 'growth'
        };
      case 'Joy':
        return {
          title: '따뜻한 에너지를 학우들과 함께 나누기',
          desc: '오늘 정말 행복한 하루를 보내고 계시는군요! 기분 좋은 이 기운을 라운지에 자랑하여 다른 학생들에게도 따뜻한 미소를 나누어 주세요.',
          actionLabel: '휴식 라운지 가기',
          targetSubTab: 'lounge'
        };
      case 'Mindful':
        return {
          title: '지금 이 맑은 호흡을 소리로 극대화하기',
          desc: '온전한 마음챙김 상태를 유지하는 데에는 소리 자극이 도움이 됩니다. 쉼터에서 "숲속의 소나기" 자연 소리를 틀어놓고 명상해 보세요.',
          actionLabel: '소리 치유 플레이어 열기',
          targetSubTab: 'sound'
        };
      default:
        return {
          title: '가벼운 목 스트레칭과 수분 섭취',
          desc: '마음이 평온해서 참 다행이에요. 따뜻한 카모마일 차 한 잔을 마시며 가벼운 어깨 스트레칭을 곁들여 몸의 이완을 더해보세요.',
          actionLabel: '스트레칭 가이드 보기',
          targetSubTab: 'stretching'
        };
    }
  };

  const currentTip = getCustomTip(lastMoodType);

  return (
    <div id="home-dashboard-container" className="space-y-6 animate-fade-in pb-12">
      {/* Top Welcome Card */}
      <div id="welcome-card" className="relative overflow-hidden rounded-3xl bg-sky-100 text-sky-950 shadow-sm border border-sky-200">
        {/* Background Image Overlay with Gradients */}
        <div className="absolute inset-0 z-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1200&q=80" 
            alt="Beautiful Sky" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sky-100/90 via-sky-100/40 to-white/10 z-1"></div>

        <div className="relative z-10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src={USER_PROFILE.avatarUrl} 
              alt={USER_PROFILE.name} 
              className="w-12 h-12 rounded-full border-2 border-sky-200 object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-sky-900">{USER_PROFILE.fullName}님</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-800 font-mono font-bold">
                  {USER_PROFILE.badge}
                </span>
              </div>
              <p className="text-xs text-sky-700/85 font-medium">{USER_PROFILE.university} · {USER_PROFILE.department}</p>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-sky-950">
              오늘 하루, 어떤 호흡으로 <br className="sm:hidden" />쉬어갈까요?
            </h1>
            <p className="text-xs sm:text-sm text-sky-800/80 font-medium font-sans">
              {todayStr} · 수움에 오신 것을 환영합니다.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-sky-200/50 text-center">
            <div className="p-2 rounded-xl bg-white/40 backdrop-blur-xs">
              <span className="block text-[10px] text-sky-800 font-bold">오늘의 마음</span>
              <span className="text-xs sm:text-sm font-bold mt-0.5 block text-sky-950">
                {lastRecord ? `${MOOD_META[lastRecord.mood].emoji} ${MOOD_META[lastRecord.mood].label}` : '기록 필요'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white/40 backdrop-blur-xs cursor-pointer hover:bg-white/60 transition-colors" onClick={() => onNavigate('growth')}>
              <span className="block text-[10px] text-sky-800 font-bold">나무 레벨</span>
              <span className="text-xs sm:text-sm font-extrabold mt-0.5 block text-sky-900">Lv.12</span>
            </div>
            <div className="p-2 rounded-xl bg-white/40 backdrop-blur-xs cursor-pointer hover:bg-white/60 transition-colors" onClick={() => onNavigate('calendar')}>
              <span className="block text-[10px] text-sky-800 font-bold">누적 기록</span>
              <span className="text-xs sm:text-sm font-bold mt-0.5 block text-sky-950">{moodRecords.length}회</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mood Log & Tips */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Mood Logging Picker */}
          <div id="mood-picker-box" className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  지금 나의 마음은 어떤가요?
                </h2>
                <p className="text-xs text-neutral-500">오늘 하루 나의 마음 상태를 1초 만에 기록하세요.</p>
              </div>
              {isLoggedToday && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 animate-pulse font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  기록 완료!
                </span>
              )}
            </div>

            {/* Mood Cards Selector */}
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(MOOD_META) as MoodType[]).map((mKey) => {
                const isSelected = selectedMood === mKey;
                const meta = MOOD_META[mKey];
                return (
                  <button
                    key={mKey}
                    onClick={() => {
                      setSelectedMood(mKey);
                      setIsLoggedToday(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center group relative ${
                      isSelected
                        ? `${meta.bg} ${meta.border} ring-2 ring-neutral-900 scale-102`
                        : 'bg-white border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-110 duration-200">
                      {meta.emoji}
                    </span>
                    <span className="text-xs font-semibold text-neutral-800">{meta.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Show extra input forms if mood selected */}
            {selectedMood && (
              <div className="space-y-4 pt-2 border-t border-dashed border-neutral-100 animate-slide-up">
                {/* Score Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-neutral-600">
                    <span>이 감정의 크기는 어느 정도인가요?</span>
                    <span className="text-neutral-900 font-bold">강도: {moodScore} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>매우 살짝</span>
                    <span>적당함</span>
                    <span>매우 강하게</span>
                  </div>
                </div>

                {/* Short text note */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-600">
                    한 줄 요약 또는 짧은 일기 (선택)
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="오늘 어떤 일로 이런 기분이 드셨나요?"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-neutral-400 bg-neutral-50/50"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setSelectedMood(null)}
                    className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleLogMood}
                    className="flex-1 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors shadow-sm"
                  >
                    오늘의 마음 등록하기
                  </button>
                </div>
              </div>
            )}

            {/* If successfully logged */}
            {isLoggedToday && !selectedMood && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800 text-xs flex items-start gap-3 animate-slide-up">
                <span className="text-xl">🌿</span>
                <div className="space-y-1">
                  <p className="font-bold">성공적으로 마음이 기록되었습니다!</p>
                  <p className="text-emerald-700/90 leading-relaxed">
                    오늘의 기록으로 <span className="font-bold text-amber-600">마음 나무가 무럭무럭 자라고 있어요.</span> 계속해서 마음의 날씨를 돌보며 건강한 나를 가꿔보세요.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Recommended Personalized Tip Card */}
          <div id="personalized-tip" className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-md">
              <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                이주의 맞춤 휴식 조언
              </span>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                {currentTip.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{currentTip.desc}</p>
            </div>
            <button
              onClick={() => {
                if (currentTip.targetSubTab === 'growth') {
                  onNavigate('growth');
                } else if (currentTip.targetSubTab === 'lounge') {
                  onNavigate('lounge', 'feed');
                } else {
                  onNavigate('relax', currentTip.targetSubTab);
                }
              }}
              className="w-full md:w-auto shrink-0 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-bold px-4 py-2.5 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors group"
            >
              <span>{currentTip.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>

        {/* Right Column: Mood Weather Chart & Recent Logs */}
        <div className="lg:col-span-5 space-y-6">

          {/* Section 3: My Mind Weather This Week Chart */}
          <div id="mood-chart" className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-neutral-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-500" />
                이번 주 나의 마음 날씨
              </h3>
              <p className="text-xs text-neutral-500">최근 일주일 간 기록된 기분 밸런스입니다.</p>
            </div>

            {/* Styled Chart Container */}
            <div className="h-44 flex items-end justify-between pt-4 pb-2 px-1">
              {daysOfWeek.map((day, idx) => {
                // Try to find if there is a record for this slot
                // We'll map mock indexes for a clean illustrative chart
                const rec = weekRecords[idx];
                const heightPercent = rec ? (rec.score / 10) * 100 : 15; // default low height if no record
                const meta = rec ? MOOD_META[rec.mood as MoodType] : null;

                return (
                  <div key={idx} className="flex flex-col items-center flex-1 space-y-2">
                    <div className="w-full flex justify-center h-28 items-end relative group">
                      {/* Tooltip on hover */}
                      {rec && (
                        <div className="absolute bottom-full mb-1.5 hidden group-hover:block bg-neutral-900 text-white text-[10px] py-1 px-2 rounded shadow-md z-15 whitespace-nowrap">
                          {meta?.label} (강도: {rec.score})
                        </div>
                      )}
                      
                      {/* Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-3.5 sm:w-5 rounded-full transition-all duration-500 ${
                          rec 
                            ? rec.mood === 'Calm' ? 'bg-emerald-200' 
                              : rec.mood === 'Joy' ? 'bg-amber-200' 
                              : rec.mood === 'Reflective' ? 'bg-indigo-200' 
                              : rec.mood === 'Mindful' ? 'bg-teal-200' 
                              : 'bg-slate-200'
                            : 'bg-neutral-100 border border-dashed border-neutral-200'
                        }`}
                      ></div>
                    </div>
                    {/* Day label */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {rec ? meta?.emoji : '·'}
                      </span>
                      <span className="text-xs font-semibold text-neutral-600">{day}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 border-t border-neutral-50 text-[10px] text-neutral-500 font-sans">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 inline-block"></span>
                평온
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-200 inline-block"></span>
                기쁨
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-200 inline-block"></span>
                사색
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-200 inline-block"></span>
                마음챙김
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block"></span>
                피로
              </span>
            </div>
          </div>

          {/* Section 4: Recent Logs */}
          <div id="recent-logs-section" className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-neutral-900">최근 감정 기록</h3>
              <button 
                onClick={() => onNavigate('calendar')}
                className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-0.5 transition-colors font-medium"
              >
                더보기 <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {latestLogs.map((log) => {
                const meta = MOOD_META[log.mood];
                const formattedDate = new Date(log.date).toLocaleDateString('ko-KR', {
                  month: 'numeric',
                  day: 'numeric'
                });

                return (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-2xl border border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="text-2xl shrink-0 bg-neutral-50 w-10 h-10 rounded-xl flex items-center justify-center">
                        {meta.emoji}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-neutral-900">{meta.label}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">강도 {log.score}</span>
                        </div>
                        <p className="text-xs text-neutral-500 truncate mt-0.5">
                          {log.note || '메모 없이 마음날씨만 기록했어요.'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono shrink-0 font-medium">
                      {formattedDate}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
