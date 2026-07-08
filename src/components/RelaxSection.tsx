import React, { useState, useEffect, useRef } from 'react';
import { StretchingStep, Soundscape } from '../types';
import { STRETCHING_STEPS, SOUNDSCAPES, DIAGNOSTIC_QUESTIONS } from '../mockData';
import { 
  Dumbbell, Music, Activity, Play, Pause, RotateCcw, 
  Volume2, Clock, CheckCircle2, AlertCircle, Sparkles, ChevronRight, ChevronLeft 
} from 'lucide-react';

interface RelaxSectionProps {
  initialSubTab?: string;
  onNavigate: (tab: 'home' | 'calendar' | 'relax' | 'lounge' | 'growth') => void;
  onAddExp?: (exp: number) => void;
}

export default function RelaxSection({ initialSubTab = 'stretching', onNavigate, onAddExp }: RelaxSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);

  // Sync with initialSubTab changes
  useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  // =========================================================================
  // 1. STRETCHING GUIDE STATE & EFFECT
  // =========================================================================
  const [stretchIndex, setStretchIndex] = useState<number>(0);
  const [stretchTimer, setStretchTimer] = useState<number>(STRETCHING_STEPS[0].duration);
  const [isStretchRunning, setIsStretchRunning] = useState<boolean>(false);
  const [stretchCompleted, setStretchCompleted] = useState<boolean>(false);
  
  const currentStretch = STRETCHING_STEPS[stretchIndex];

  // Sync timer when step changes
  useEffect(() => {
    setStretchTimer(currentStretch.duration);
    setIsStretchRunning(false);
  }, [stretchIndex]);

  // Countdown logic for stretching
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStretchRunning && stretchTimer > 0) {
      interval = setInterval(() => {
        setStretchTimer((prev) => prev - 1);
      }, 1000);
    } else if (stretchTimer === 0 && isStretchRunning) {
      setIsStretchRunning(false);
      // Move to next step or complete
      if (stretchIndex < STRETCHING_STEPS.length - 1) {
        setStretchIndex((prev) => prev + 1);
      } else {
        setStretchCompleted(true);
        if (onAddExp) onAddExp(20); // Award experience
      }
    }
    return () => clearInterval(interval);
  }, [isStretchRunning, stretchTimer, stretchIndex]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRestartStretch = () => {
    setStretchIndex(0);
    setStretchTimer(STRETCHING_STEPS[0].duration);
    setIsStretchRunning(false);
    setStretchCompleted(false);
  };

  // =========================================================================
  // 2. SOUND THERAPY PLAYER STATE & AUDIO SYNTHESIS
  // =========================================================================
  const [selectedSound, setSelectedSound] = useState<Soundscape>(SOUNDSCAPES[0]);
  const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false);
  const [soundProgress, setSoundProgress] = useState<number>(0); // 0 to 100%
  const [volume, setVolume] = useState<number>(50);
  const [sleepTimer, setSleepTimer] = useState<number>(0); // 0 means no timer, in seconds

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  // Soundscape simulated progress incrementor
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSoundPlaying) {
      interval = setInterval(() => {
        setSoundProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
        
        // Count down sleep timer if set
        if (sleepTimer > 0) {
          setSleepTimer((prev) => {
            if (prev <= 1) {
              setIsSoundPlaying(false);
              stopSynth();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSoundPlaying, sleepTimer]);

  // Handle synthesized sound effects using Web Audio API!
  // This produces a beautiful, low-hum ocean breeze ambient when played, so it is real audio!
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gain Node for volume control
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime((volume / 100) * 0.15, ctx.currentTime); // keep it soft
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // Base carrier low frequency (ambient hum)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      
      // Pitch varies based on selected soundscape
      let baseFreq = 110; // A2 hum
      if (selectedSound.id === 'forest-rain') baseFreq = 98; // G2 rain frequency
      if (selectedSound.id === 'soft-piano') baseFreq = 130; // C3 sweet piano frequency
      if (selectedSound.id === 'ocean-waves') baseFreq = 73; // D2 waves swell

      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc1.connect(gainNode);
      osc1.start();
      osc1Ref.current = osc1;

      // Slower mod oscillator to mimic waving / swelling breeze
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime);
      
      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      // LFO modulation to simulate ocean wave swells or piano decay
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // very slow 5 second cycles
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      lfo.start();

      osc2.connect(gainNode);
      osc2.start();
      osc2Ref.current = osc2;

    } catch (e) {
      console.warn('Web Audio synthesis failed or blocked:', e);
    }
  };

  const stopSynth = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
    } catch (e) {
      // ignore
    }
  };

  // Sync volume with Web Audio node
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime((volume / 100) * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Sync sound selection
  useEffect(() => {
    if (isSoundPlaying) {
      stopSynth();
      startSynth();
    }
  }, [selectedSound]);

  const handlePlayToggle = () => {
    if (isSoundPlaying) {
      setIsSoundPlaying(false);
      stopSynth();
    } else {
      setIsSoundPlaying(true);
      startSynth();
      if (onAddExp) onAddExp(2); // Award a little exp for starting relaxing sounds
    }
  };

  const handleSleepTimerSelect = (mins: number) => {
    setSleepTimer(mins * 60);
  };

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  // =========================================================================
  // 3. DIAGNOSTIC QUESTIONNAIRE STATE
  // =========================================================================
  const [diagStep, setDiagStep] = useState<number>(0); // 0 means welcome, 1 to 5 are questions, 6 is results
  const [diagScores, setDiagScores] = useState<number[]>([]);
  
  const handleAnswerSelect = (score: number) => {
    const updatedScores = [...diagScores, score];
    setDiagScores(updatedScores);
    
    if (diagStep < DIAGNOSTIC_QUESTIONS.length) {
      setDiagStep((prev) => prev + 1);
    }
  };

  const totalDiagScore = diagScores.reduce((a, b) => a + b, 0);
  const maxPossibleScore = DIAGNOSTIC_QUESTIONS.length * 4;

  const getDiagnosticEvaluation = (score: number) => {
    if (score <= 8) {
      return {
        level: '안정적인 산뜻함',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-400',
        desc: '현재 마음 밸런스가 매우 양호하고 스트레스가 적절히 다스려지고 있습니다. 가벼운 차담과 호흡을 유지해 보세요.',
        recommendation: '모닥불 소리 테라피 청취',
        actionSubTab: 'sound',
        actionItem: 'white-noise'
      };
    } else if (score <= 13) {
      return {
        level: '가벼운 긴장 상태',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-400',
        desc: '신체적, 정신적 피로가 서서히 쌓이기 시작하는 상태입니다. 휴식이 권장됩니다. 5분간의 어깨 이완 스트레칭을 실천해 보세요.',
        recommendation: '목 & 어깨 이완 스트레칭 5분',
        actionSubTab: 'stretching',
        actionItem: 1
      };
    } else {
      return {
        level: '위험한 번아웃 기류',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        barColor: 'bg-rose-500',
        desc: '축적된 스트레스 수치가 한계에 달해 뇌와 신체가 휴식을 강하게 갈망하고 있습니다. 모든 일을 멈추고 15분 이상 따뜻한 사운드 힐링이나 복식 호흡을 반드시 수행해야 합니다.',
        recommendation: '숲속의 소나기 사운드 + 눈 휴식',
        actionSubTab: 'sound',
        actionItem: 'forest-rain'
      };
    }
  };

  const evaluationResult = getDiagnosticEvaluation(totalDiagScore);

  const resetDiagnostic = () => {
    setDiagStep(0);
    setDiagScores([]);
  };

  return (
    <div id="relax-section-container" className="space-y-6 animate-fade-in pb-12">
      {/* Top Navigation Tabs */}
      <div className="flex border border-neutral-100 bg-white rounded-2xl p-1 shadow-sm">
        <button
          onClick={() => setActiveSubTab('stretching')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'stretching'
              ? 'bg-sky-100 text-sky-950 shadow-xs border border-sky-200/40'
              : 'text-neutral-500 hover:text-sky-900 hover:bg-sky-50/50'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>맞춤 스트레칭</span>
        </button>
        <button
          onClick={() => setActiveSubTab('sound')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'sound'
              ? 'bg-sky-100 text-sky-950 shadow-xs border border-sky-200/40'
              : 'text-neutral-500 hover:text-sky-900 hover:bg-sky-50/50'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>소리 치유 (ASMR)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('diagnostic')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'diagnostic'
              ? 'bg-sky-100 text-sky-950 shadow-xs border border-sky-200/40'
              : 'text-neutral-500 hover:text-sky-900 hover:bg-sky-50/50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>마음 자가진단</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: 맞춤 스트레칭 (Stretching)
          ========================================================================= */}
      {activeSubTab === 'stretching' && (
        <div id="stretching-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Main sequence box */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-6">
            
            {!stretchCompleted ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-50">
                  <div className="space-y-0.5">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold border border-emerald-100">
                      스트레칭 훈련 코스 · {stretchIndex + 1}단계 / {STRETCHING_STEPS.length}
                    </span>
                    <h2 className="text-lg font-bold text-neutral-900 font-sans mt-2">
                      {currentStretch.title}
                    </h2>
                    <p className="text-xs text-neutral-500">{currentStretch.subtitle}</p>
                  </div>
                </div>

                {/* Hotlinked Ilustrative Photo */}
                <div className="h-48 sm:h-64 rounded-2xl overflow-hidden relative border border-neutral-100">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4rfNpFZoSL-I0pr8TtTMticAuTJBrBny7IANAbpHWAptp0k-khCSQdDcTqVqQSDybxU3dxpBvBCu6QW9rgoPb5fqKQ3ZRvVrQ1UMYlUqmarJcm1ieNY_z7sisdC_Fc-Nkihy9WlGN0tw1QVj-t7iTcLJ7PXiHcBN0YLB7SwpIGgd0JvwzcgKmGpIhPzsbvlPHSQOFw_ogi82o_Sfb1QJHsHTSZH9lqR2aEK9LRVZRMgY990Emtw1cO7OqlIPnah1JWKmH7K7qORr" 
                    alt="Yoga stretching session" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-neutral-950/10"></div>
                </div>

                {/* Instructions Text */}
                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100/50">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    수행 가이드
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                    {currentStretch.description}
                  </p>
                </div>

                {/* Active Interactive Timer Component */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-neutral-100 bg-white gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                        권장 수행 시간
                      </span>
                      <span className="text-xl font-mono font-bold text-neutral-800">
                        {formatTime(stretchTimer)}
                      </span>
                    </div>
                  </div>

                  {/* Play Pause Controls */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => setIsStretchRunning(!isStretchRunning)}
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isStretchRunning
                          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                          : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                      }`}
                    >
                      {isStretchRunning ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-white" />
                          <span>일시 정지</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>스트레칭 시작</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setStretchTimer(currentStretch.duration)}
                      className="p-2 border border-neutral-200 text-neutral-600 hover:bg-neutral-50 rounded-xl transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pro Tip Box */}
                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-xs text-amber-800">
                  <span className="text-lg">💡</span>
                  <div className="space-y-0.5">
                    <p className="font-bold">수움 가득 프로 꿀팁</p>
                    <p className="text-amber-700 font-sans leading-relaxed">
                      {currentStretch.proTip}
                    </p>
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                  <button
                    disabled={stretchIndex === 0}
                    onClick={() => setStretchIndex((prev) => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-bold transition-all disabled:opacity-45 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>이전 단계</span>
                  </button>
                  <button
                    onClick={() => {
                      if (stretchIndex < STRETCHING_STEPS.length - 1) {
                        setStretchIndex((prev) => prev + 1);
                      } else {
                        setStretchCompleted(true);
                        if (onAddExp) onAddExp(20);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>{stretchIndex === STRETCHING_STEPS.length - 1 ? '전체 코스 완료' : '다음 단계'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              /* Completion splash */
              <div className="text-center py-12 space-y-6 animate-fade-in max-w-md mx-auto">
                <span className="text-6xl block">🏆</span>
                <div className="space-y-2">
                  <h2 className="text-xl font-extrabold text-neutral-900">오늘의 스트레칭 코스 정복!</h2>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                    몸과 마음의 굳어있던 긴장 매듭을 아주 부드럽게 한 번 풀어주셨습니다. 마음나무가 쑥쑥 자라기 위한 <span className="font-bold text-indigo-600">+20 Exp</span> 혜택이 적립되었어요.
                  </p>
                </div>
                
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1">
                  <p className="text-xs text-indigo-800 font-bold">🌱 나무가 영양분을 공급받았어요!</p>
                  <p className="text-[10px] text-indigo-700">성장 저니 탭에서 자라난 나만의 힐링 나무를 확인해 보세요.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleRestartStretch}
                    className="flex-1 py-3 text-xs font-bold border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    처음부터 한 번 더
                  </button>
                  <button
                    onClick={() => onNavigate('growth')}
                    className="flex-1 py-3 text-xs font-bold bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors"
                  >
                    성장 나무 구경하기
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar: stretching stats & benefits */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-50 pb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              스트레칭의 힐링 과학
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-base bg-emerald-50 w-8 h-8 shrink-0 rounded-xl flex items-center justify-center">🧠</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-neutral-800">교감신경 가라앉히기</p>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    느린 호흡과 정적인 가동성 스트레칭은 몸의 투쟁-도피 유발 교감신경을 정지하고 휴식 지향 부교감신경을 가동합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base bg-amber-50 w-8 h-8 shrink-0 rounded-xl flex items-center justify-center">👀</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-neutral-800">VDT 증후군 완전 탈출</p>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    지속적인 모니터 정시 시야는 가상 안구 근육을 수축시킵니다. 인위적으로 열기를 활용하여 혈관을 수축·이완해주면 피로 해소에 극적입니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base bg-indigo-50 w-8 h-8 shrink-0 rounded-xl flex items-center justify-center">🫁</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-neutral-800">안구 & 뇌 혈류 부스팅</p>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    목과 승모근 주위가 부드럽게 늘어나면 뇌로 공급되는 경동맥 가림막이 제거되어 머리가 가볍게 맑아집니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: 소리 치유 (Soundscapes)
          ========================================================================= */}
      {activeSubTab === 'sound' && (
        <div id="sound-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Left Column: Playlist selector */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-4">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-neutral-900">사운드스케이프 플레이 리스트</h2>
              <p className="text-xs text-neutral-500">원하시는 청취 주파수의 힐링 테라피 소리를 선택해 보세요.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SOUNDSCAPES.map((sound) => {
                const isSelected = selectedSound.id === sound.id;
                return (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setSelectedSound(sound);
                      setSoundProgress(0);
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'bg-sky-50/50 border-sky-500 ring-1 ring-sky-500'
                        : 'bg-white border-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <img 
                      src={sound.imageUrl} 
                      alt={sound.name} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-800 group-hover:text-neutral-950 truncate">
                        {sound.koreanName}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{sound.name}</p>
                      <p className="text-[10px] text-neutral-500 truncate mt-1">{sound.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Today's rest hint card */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex gap-3 text-xs text-neutral-700 leading-relaxed font-sans mt-2">
              <span className="text-base">🧠</span>
              <div className="space-y-1">
                <p className="font-bold text-neutral-800">소리 치유 요법이란?</p>
                <p className="text-neutral-600">
                  특정 백색 가우시안 노이즈(바람, 비, 파도)는 뇌의 불규칙한 각성 알파파를 규칙적인 평온 델타파로 유도해 긴장성 두통을 완화시킵니다. 잠들기 전 15분간 타이머를 걸어 두시면 천연 수면 유도제로 작동합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Active Player UI */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-6 flex flex-col justify-between">
            
            {/* Player Main Details */}
            <div className="space-y-4 text-center">
              <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                ACTIVE PLAYING
              </span>

              {/* Vinyl / Cover Art Container */}
              <div className="relative mx-auto w-40 h-40">
                {/* Rotating Vinyl circle effect */}
                <div 
                  className={`w-full h-full rounded-full overflow-hidden border-4 border-neutral-900/10 shadow-lg transition-transform duration-[15000ms] ease-linear transform ${
                    isSoundPlaying ? 'rotate-3600 animate-spin-slow' : ''
                  }`}
                  style={{ animationDuration: '10s' }}
                >
                  <img 
                    src={selectedSound.imageUrl} 
                    alt={selectedSound.koreanName} 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Center hole of vinyl */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-neutral-900 shadow-inner z-10"></div>
              </div>

              {/* Title texts */}
              <div className="space-y-1 pt-2">
                <h3 className="text-base font-bold text-neutral-900">{selectedSound.koreanName}</h3>
                <p className="text-xs text-neutral-400 font-mono">{selectedSound.name} ambient</p>
              </div>
            </div>

            {/* Simulated progress indicator */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>00:{Math.round(soundProgress * 1.8).toString().padStart(2, '0')}</span>
                <span>03:00</span>
              </div>
              <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${soundProgress}%` }}
                  className="h-full bg-sky-500 rounded-full transition-all duration-300"
                ></div>
              </div>
            </div>

            {/* Timer and Volume bar block */}
            <div className="space-y-4 pt-2">
              {/* Volume Slider */}
              <div className="flex items-center space-x-3 bg-neutral-50 px-3 py-2.5 rounded-2xl border border-neutral-100">
                <Volume2 className="w-4 h-4 text-neutral-500 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <span className="text-[10px] text-neutral-500 font-mono font-bold w-6 text-right">
                  {volume}%
                </span>
              </div>

              {/* Sleep timer Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  수면 오프 타이머
                </span>
                <div className="flex gap-1.5">
                  {[0, 15, 30].map((mins) => {
                    const isTimerSelected = mins === 0 ? sleepTimer === 0 : Math.round(sleepTimer / 60) === mins;
                    return (
                      <button
                        key={mins}
                        onClick={() => handleSleepTimerSelect(mins)}
                        className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-bold transition-all ${
                          isTimerSelected
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {mins === 0 ? 'OFF' : `${mins}분`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {sleepTimer > 0 && isSoundPlaying && (
                <div className="text-center">
                  <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 font-mono font-bold animate-pulse">
                    자동 OFF 종료까지: {Math.floor(sleepTimer / 60)}분 {sleepTimer % 60}초
                  </span>
                </div>
              )}
            </div>

            {/* Play Pause Trigger */}
            <button
              onClick={handlePlayToggle}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                isSoundPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              {isSoundPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>소리 일시 정지 (Web Audio Active)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>소리 치유 재생하기 (볼륨 확인)</span>
                </>
              )}
            </button>

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: 마음 자가진단 (Diagnostic)
          ========================================================================= */}
      {activeSubTab === 'diagnostic' && (
        <div id="diagnostic-tab" className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm max-w-2xl mx-auto animate-fade-in">
          
          {/* Splash screen before diagnostic starts */}
          {diagStep === 0 && (
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <span className="text-5xl block">🧐</span>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-neutral-900">오늘 나의 감정 조율 진단하기</h2>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  일상 속 피로감, 디지털 기기 소모 상태, 감정 흔들림 등 총 5개 질문에 답하고 현재 내 몸이 원하고 필요로 하는 최적의 휴식 처방전을 받아 보세요.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-left space-y-2.5">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">진단 항목 안내</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 신체 축적 근육 긴장 피로도
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 시야 및 수면 패턴 스트레스
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 뇌 피로도 및 인지 번아웃 임계치
                </div>
              </div>

              <button
                onClick={() => setDiagStep(1)}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                자가진단 시작하기
              </button>
            </div>
          )}

          {/* Active Questions quiz */}
          {diagStep >= 1 && diagStep <= DIAGNOSTIC_QUESTIONS.length && (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  <span>마음 진단 측정 중</span>
                  <span>{diagStep} / {DIAGNOSTIC_QUESTIONS.length} 단계</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(diagStep / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-sky-500 rounded-full transition-all duration-300"
                  ></div>
                </div>
              </div>

              {/* Question text */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                  {DIAGNOSTIC_QUESTIONS[diagStep - 1].category === 'physical' ? 'Physical Health' 
                   : DIAGNOSTIC_QUESTIONS[diagStep - 1].category === 'mental' ? 'Emotional Health' 
                   : 'Overall Stress'}
                </span>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  {DIAGNOSTIC_QUESTIONS[diagStep - 1].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {DIAGNOSTIC_QUESTIONS[diagStep - 1].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(opt.score)}
                    className="w-full p-4 rounded-2xl border border-neutral-100 hover:border-sky-500 text-left text-xs font-semibold text-neutral-700 hover:bg-sky-50/10 transition-all flex justify-between items-center group"
                  >
                    <span>{opt.text}</span>
                    <span className="w-6 h-6 rounded-full border border-neutral-200 group-hover:border-sky-500 group-hover:text-sky-600 flex items-center justify-center text-[10px] text-neutral-400 transition-colors">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Abort button */}
              <button
                onClick={resetDiagnostic}
                className="w-full py-2.5 border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-500 rounded-xl transition-all"
              >
                진단 그만두기
              </button>
            </div>
          )}

          {/* Results Screen */}
          {diagStep > DIAGNOSTIC_QUESTIONS.length && (
            <div className="space-y-6 text-center animate-fade-in py-4">
              <span className="text-5xl block">📑</span>
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-neutral-900">자가진단 분석 완료!</h2>
                <p className="text-xs text-neutral-500">당신의 종합 긴장 지수는 아래와 같이 연산되었습니다.</p>
              </div>

              {/* Score Display */}
              <div className="max-w-xs mx-auto p-5 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-neutral-500">
                  <span>진단 스코어</span>
                  <span className="text-neutral-950 font-bold">{totalDiagScore} / {maxPossibleScore}</span>
                </div>
                {/* Visual bar */}
                <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(totalDiagScore / maxPossibleScore) * 100}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${evaluationResult.barColor}`}
                  ></div>
                </div>

                {/* Level badge */}
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${evaluationResult.color}`}>
                  {evaluationResult.level}
                </span>
              </div>

              {/* Evaluated Description */}
              <div className="space-y-1.5 max-w-md mx-auto text-center">
                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  {evaluationResult.desc}
                </p>
              </div>

              {/* Recommended Action block */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <Sparkles className="w-4 h-4" />
                  추천 맞춤 처방 솔루션
                </div>
                <p className="text-xs text-amber-700 leading-relaxed font-sans">
                  현재 누적 피로에 가장 직효가 우수한 <span className="font-bold underline">{evaluationResult.recommendation}</span>이 처방되었습니다. 즉각 실행하여 몸에 편안함을 선물하세요!
                </p>
                <button
                  onClick={() => {
                    if (evaluationResult.actionSubTab === 'stretching') {
                      setActiveSubTab('stretching');
                      setStretchIndex(evaluationResult.actionItem as number);
                    } else if (evaluationResult.actionSubTab === 'sound') {
                      setActiveSubTab('sound');
                      const soundObj = SOUNDSCAPES.find(s => s.id === evaluationResult.actionItem) || SOUNDSCAPES[0];
                      setSelectedSound(soundObj);
                    }
                  }}
                  className="w-full mt-2 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                >
                  처방 솔루션 즉시 시작하기
                </button>
              </div>

              {/* Reset trigger */}
              <button
                onClick={resetDiagnostic}
                className="py-2 px-4 border border-neutral-200 text-neutral-800 hover:bg-neutral-50 text-xs font-bold rounded-xl transition-all"
              >
                다시 진단해 보기
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
