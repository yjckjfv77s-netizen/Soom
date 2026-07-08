import React, { useState } from 'react';
import { MoodType, MoodRecord } from '../types';
import { Calendar, Heart, Award, ArrowLeft, ArrowRight, Activity, Plus } from 'lucide-react';

interface MoodCalendarProps {
  moodRecords: MoodRecord[];
  onNavigate: (tab: 'home' | 'calendar' | 'relax' | 'lounge' | 'growth') => void;
}

const MOOD_META: Record<MoodType, { emoji: string; label: string; bg: string; dot: string; text: string }> = {
  Calm: { emoji: '🧘', label: '평온', bg: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-200', text: 'text-emerald-600' },
  Joy: { emoji: '😊', label: '기쁨', bg: 'bg-amber-50 text-amber-700', dot: 'bg-amber-200', text: 'text-amber-500' },
  Reflective: { emoji: '💭', label: '사색', bg: 'bg-indigo-50 text-indigo-700', dot: 'bg-indigo-200', text: 'text-indigo-600' },
  Mindful: { emoji: '🌿', label: '마음챙김', bg: 'bg-teal-50 text-teal-700', dot: 'bg-teal-200', text: 'text-teal-600' },
  Tired: { emoji: '😴', label: '피로', bg: 'bg-slate-100 text-slate-700', dot: 'bg-slate-200', text: 'text-slate-500' }
};

export default function MoodCalendar({ moodRecords, onNavigate }: MoodCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(8); // Default to today July 8th

  // Calendar info for July 2026
  const year = 2026;
  const month = 6; // July (0-indexed)
  const monthLabel = '2026년 7월';
  
  // July 1, 2026 is Wednesday (index 3)
  const startDayOffset = 3;
  const daysInMonth = 31;

  // Create an array for the grid cells
  const gridCells = [];
  
  // Empty slots for padding before 1st of month
  for (let i = 0; i < startDayOffset; i++) {
    gridCells.push(null);
  }
  
  // Actual calendar days
  for (let i = 1; i <= daysInMonth; i++) {
    gridCells.push(i);
  }

  // Helper to find record for a specific calendar day (July X, 2026)
  const getRecordForDay = (day: number) => {
    const formattedDate = `2026-07-${day.toString().padStart(2, '0')}`;
    return moodRecords.find((rec) => rec.date === formattedDate);
  };

  // Stats calculation
  const totalCount = moodRecords.length;
  const moodCounts = moodRecords.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  // Find longest streak of consecutive days logged
  const calculateStreak = () => {
    // Sort records by date ascending
    const sortedDates = [...moodRecords]
      .map(r => r.date)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
    
    if (sortedDates.length === 0) return 0;
    
    let currentStreak = 1;
    let maxStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diffTime = Math.abs(curr.getTime() - prev.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        currentStreak = 1;
      }
    }
    return Math.max(maxStreak, currentStreak);
  };

  const streak = calculateStreak();
  const selectedRecord = selectedDay ? getRecordForDay(selectedDay) : null;

  return (
    <div id="mood-calendar-container" className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Streak Header Banner */}
      <div id="streak-banner" className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shrink-0">
            <Award className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-full text-white/90">
              마음챙김 스트릭
            </span>
            <h2 className="text-lg font-bold mt-1">
              연속 <span className="text-amber-300">{streak}일째</span> 마음 기록 중!
            </h2>
            <p className="text-xs text-white/80 font-sans mt-0.5">
              스스로를 세밀히 돌아보는 습관이 깊어지고 있습니다.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-50 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          오늘 마음 기록하기
        </button>
      </div>

      {/* Main Grid: Calendar & Statistics Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: July Calendar Grid Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-50">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-neutral-800" />
              <h3 className="text-base font-bold text-neutral-900 font-sans">{monthLabel}</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button disabled className="p-1.5 rounded-lg border border-neutral-100 text-neutral-300 cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button disabled className="p-1.5 rounded-lg border border-neutral-100 text-neutral-300 cursor-not-allowed">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Titles */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-neutral-400 py-1">
            <span className="text-rose-500">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-indigo-500">토</span>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center">
            {gridCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-10 sm:h-12"></div>;
              }

              const isSelected = selectedDay === day;
              const record = getRecordForDay(day);
              const meta = record ? MOOD_META[record.mood as MoodType] : null;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`h-10 sm:h-12 relative flex flex-col items-center justify-center rounded-xl transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white font-bold scale-105 shadow-sm z-10'
                      : record
                        ? 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                        : 'bg-white hover:bg-neutral-50 text-neutral-500'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{day}</span>
                  {record && !isSelected && (
                    <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${meta?.dot}`}></span>
                  )}
                  {record && isSelected && (
                    <span className="text-[10px] mt-0.5">{meta?.emoji}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom legend */}
          <div className="flex justify-between items-center pt-4 border-t border-dashed border-neutral-100 text-[10px] text-neutral-400">
            <span>* 숫자를 클릭하면 해당 날짜의 일지를 볼 수 있습니다.</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-200"></span> 기쁨
              <span className="w-2 h-2 rounded-full bg-emerald-200 ml-1"></span> 평온
              <span className="w-2 h-2 rounded-full bg-indigo-200 ml-1"></span> 사색
            </span>
          </div>
        </div>

        {/* Right: Selected Day Details & Statistics */}
        <div className="lg:col-span-5 space-y-6">

          {/* Day details section */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-50 pb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              선택한 날의 마음 기록
            </h3>

            {selectedDay ? (
              selectedRecord ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">
                      2026년 7월 {selectedDay}일
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${MOOD_META[selectedRecord.mood].bg}`}>
                      <span>{MOOD_META[selectedRecord.mood].emoji}</span>
                      <span>{MOOD_META[selectedRecord.mood].label}</span>
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-neutral-500">
                      <span>감정 체감 지수</span>
                      <span className="text-neutral-900">{selectedRecord.score} / 10</span>
                    </div>
                    {/* Visual strength bar */}
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedRecord.score * 10}%` }}
                        className={`h-full rounded-full ${MOOD_META[selectedRecord.mood].dot}`}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      마음 일지 메모
                    </span>
                    <p className="text-xs text-neutral-700 leading-relaxed font-sans bg-neutral-50/50 p-3 rounded-2xl border border-neutral-100">
                      {selectedRecord.note || '이날은 별도의 메모 없이 감정 기류만 마크해 두었습니다.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <span className="text-3xl block">💭</span>
                  <p className="text-xs text-neutral-400">
                    2026년 7월 {selectedDay}일에는 아직 기록이 없습니다.
                  </p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="py-2 px-3 border border-neutral-200 text-neutral-800 hover:bg-neutral-50 text-xs font-bold rounded-xl transition-all"
                  >
                    오늘 기분 기록하러 가기
                  </button>
                </div>
              )
            ) : (
              <p className="text-xs text-neutral-400 text-center py-10">
                달력의 날짜를 탭하여 지난 마음날씨를 확인해 보세요.
              </p>
            )}
          </div>

          {/* Emotional Statistics Section */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-500" />
              감정 분포 분석
            </h3>

            <div className="space-y-3 pt-1">
              {(Object.keys(MOOD_META) as MoodType[]).map((key) => {
                const count = moodCounts[key] || 0;
                const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                const meta = MOOD_META[key];

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm">{meta.emoji}</span>
                        <span className="text-neutral-700">{meta.label}</span>
                      </div>
                      <span className="text-neutral-500 font-mono">
                        {count}회 ({Math.round(percentage)}%)
                      </span>
                    </div>
                    {/* Bar */}
                    <div className="w-full h-2 bg-neutral-50 rounded-full overflow-hidden border border-neutral-100/50">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${meta.dot}`}
                      ></div>
                    </div>
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
