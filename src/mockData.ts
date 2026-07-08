import { LoungePost, Product, Soundscape, StretchingStep, DiagnosticQuestion } from './types';

export const USER_PROFILE = {
  name: 'Happy',
  fullName: 'Happy',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA31VoXWXgceKQvDuHjeg2ULm18wvSGSsnY--T-OnFqqP8UDvoh-Pl0t9SCTFw2NoVKrK7vcKMOvdGqGBbBX2N9WfqhqzaOXpvUv_s-E4oUzruaiPshGLQbJ7FrwIDVs6ttAO8saLq25i4QqI6GL5Vl3mk8VwcNdBtivg9vFZ0xAwSqksQWxehSKzuSgZ2NG7pCAt_FTBSOk7sAyvMk4b679JCUEFm6RQXBBAgmyhue0wpBzOYrZhRdUZ-YKsjPbJb3PpgvvtCckjel',
  department: '컴퓨터공학과',
  university: '수움쉬는대학교',
  badge: '마음챙김 초심자'
};

export const INITIAL_MOOD_RECORDS = [
  { id: '1', date: '2026-07-02', mood: 'Tired', score: 4, note: '과제 마감 때문에 밤샜음... 너무 피곤하다' },
  { id: '2', date: '2026-07-03', mood: 'Calm', score: 7, note: '금요일 저녁이라 오랜만에 푹 잤다' },
  { id: '3', date: '2026-07-04', mood: 'Joy', score: 9, note: '친구들이랑 한강공원에서 힐링한 날' },
  { id: '4', date: '2026-07-05', mood: 'Reflective', score: 6, note: '주말 저녁 조용히 생각 정리하는 시간' },
  { id: '5', date: '2026-07-06', mood: 'Mindful', score: 8, note: '아침 요가랑 명상으로 상쾌하게 시작!' },
  { id: '6', date: '2026-07-07', mood: 'Tired', score: 5, note: '시험 공부 시작했는데 집중이 잘 안 된다' },
  { id: '7', date: '2026-07-08', mood: 'Calm', score: 8, note: '수움 앱으로 스트레칭하고 나니 몸이 가볍다' }
] as any[];

export const STRETCHING_STEPS: StretchingStep[] = [
  {
    title: '의식적인 호흡하기 (Deep Breathing)',
    subtitle: '몸의 긴장을 풀고 마음을 가라앉히는 기초 단계',
    description: '편안하게 허리를 펴고 앉아 손은 무릎 위에 놓습니다. 코로 천천히 숨을 4초간 들이쉬고, 4초간 머금은 뒤, 입으로 8초간 길게 내뱉습니다. 가슴이 아닌 배가 부풀어 오르는 복식 호흡에 집중하세요.',
    duration: 60,
    proTip: '호흡을 내뱉을 때 어깨와 목 뒤쪽의 긴장이 스르륵 풀려나간다고 상상해 보세요.'
  },
  {
    title: '목 & 어깨 이완 (Neck & Shoulder Stretch)',
    subtitle: '거북목과 뭉친 어깨 근육을 부드럽게 이완',
    description: '오른손으로 머리 왼쪽을 가볍게 잡고 오른쪽 어깨 방향으로 지긋이 당겨줍니다. 이때 왼쪽 어깨가 따라 올라가지 않도록 아래로 낮추어 정지합니다. 15초 유지 후 반대쪽도 동일하게 진행합니다. 마지막으로 양손을 깍지 껴 머리 뒤를 잡고 아래로 가볍게 숙여 목 뒤를 늘려줍니다.',
    duration: 90,
    proTip: '힘으로 강하게 당기기보다 머리의 무게만으로 지긋이 눌러주는 느낌이 좋습니다.'
  },
  {
    title: '척추 비틀기 (Seated Spinal Twist)',
    subtitle: '척추 정렬을 맞추고 몸통의 순환을 촉진',
    description: '의자에 앉은 상태에서 오른손은 의자 등받이를 잡고, 왼손은 오른쪽 무릎 바깥쪽을 짚습니다. 마시는 숨에 척추를 길게 늘렸다가, 내쉬는 숨에 상체를 오른쪽 뒤편으로 천천히 비틀어 줍니다. 시선도 자연스럽게 오른쪽 어깨 너머를 바라봅니다. 양측 15초씩 반복합니다.',
    duration: 90,
    proTip: '허리가 굽지 않도록 척추를 곧게 세운 상태에서 회전해야 무리가 가지 않습니다.'
  },
  {
    title: '눈 피로 해소 (Eye Relaxation)',
    subtitle: '화면을 오래 보아 피로해진 시신경을 휴식',
    description: '양 손바닥을 서로 빠르게 마찰시켜 따뜻한 열감을 만듭니다. 손을 컵 모양으로 둥글게 만들어 양 눈 위에 살포시 얹어 빛을 차단하고 열기를 전달합니다. 30초간 눈을 지긋이 감고 열감을 느낀 후, 안구를 시계 방향, 반시계 방향으로 부드럽게 굴려줍니다.',
    duration: 60,
    proTip: '눈동자를 직접 누르지 않고, 눈 주변 뼈 부분을 지지대 삼아 얹어 주는 것이 포인트입니다.'
  }
];

export const SOUNDSCAPES: Soundscape[] = [
  {
    id: 'forest-rain',
    name: 'Forest Rain',
    koreanName: '숲속의 소나기',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMa30fFYnZ7xaqugl_6Z1zsCT_MM3rpdt7b1X1f4QKsAyql8S9kMIgZFwbXvInX3s_4dSkKR9mJqLKGn68QggUSkT_3kJqvosyz_0wNH0u05VXFBpmHqFR68ETqn2lWkNgD-CXIUm2xSMESSKZCUMLm5vqRRF_02f-Lz3MWu0KGNvPgDHAmh6ObdTSCGCwNB3W_ZH2dMeyyOEyrtzlz45EnlzMf9qv2o0AFfW4plRS5iLG1uyU-q5mds0apL3eBQuX5Hl1r2Bs3Zmm',
    description: '울창한 숲에 떨어지는 맑고 깊은 빗소리와 산새 소리'
  },
  {
    id: 'soft-piano',
    name: 'Soft Piano',
    koreanName: '아늑한 다락방 피아노',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKmImL_RCsIcrceCQBgQBD4EjDkEgJ_Qtfmx152mO6nRQJ1gjQVi-2IaaXtpQTfenCXTPnexdJyHOyKy_ovhe8jKUOTj29vhzYr7l4ZbCEKdjk2Bl0v7OFSN1TGD-k1_TZTnpHFRFNhkS2kBhYmoRFyleAujTOSOIPxIuMqQe6RhpAErjGwk_fd6_p-l9W42CEPkHJlg8ql99jec0LcOkVlcDHUgFB1J2QfFJGehfqJEy_t0sbZlAQVvhCg42vzX6zDhybBE4415FX',
    description: '조용한 방안에 잔잔하게 울려 퍼지는 위로의 피아노 선율'
  },
  {
    id: 'white-noise',
    name: 'Lo-Fi Chill Beat',
    koreanName: '모닥불 & 레코드판',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqC9mUNwqnZ2E8561QTfW-u3xXvvXeQVz_G4tMEH2kSBG4l9Lw8lYJn1JiSJZYZ7e5Uu2GtTckzG7zA2Noc0C2v5pnTiezgYqpJKNzLIH9xuX7C8R5fuFwtMF8YUgTQ8ODXjx0OgdamNmKXLKpnKpqZKgUagzAOPc5JMMXOLj5SMFQ6RVPdwwghjdHAMWaCNfnMPmyfC4z6gopF3aTVbrEyEBgnJb8lsOIADihKUi8yJ10EGlw8mw1zEegQ3ksLyBElgZ4sxY9fp3x',
    description: '타닥타닥 모닥불 타는 소리와 레코드판의 아날로그 감성 노이즈'
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    koreanName: '해 질 녘 해변의 파도',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlvWX6BLVvkmKyFYzjIul3o91vysGvoltvfEFUxmVpAOatM14cg3zxSNq1qnwhRtjTVEC1waWLnj7zpYdwiBc6qPUysR1ux5Mv2aOjfOFMzbOo5G3_KcDZ-OhcFGHchvkQHTo7BFmekTnw5BLd2zBQko-r9qWxM3svTKymf30Ejbh8nz8l5sETTQXsPsQvm3c515aOFVtmsk-S8Fx5zZWW_VUhuocoT6y_4PmPlN8dw1_obCK-flu14svaGquK76Z3yclgJDrwZELj',
    description: '잔잔하게 밀려왔다 부서지는 하얀 모래사장 해변의 바닷소리'
  }
];

export const INITIAL_POSTS: LoungePost[] = [
  {
    id: 'p1',
    author: 'OO님',
    role: '정외과 22학번',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARHFGHmsfWjnskMp_zKiW1Jt9AIK9-hDpMq-TRrRspxwFqTDP4iyUo0dl1E6I8XdUEm9K9CGQckwZdDLFVs0GXDrnYVR9VpFXr840faVBz_ngq_qUd2VxFCDiMC5amruwjf6Xb4bYssCR5flLOngXQOXdanNX6QT3IAXZJghBmELCG0RLJSPVzgT-rlsRsWQeXORgWacc7o8Ex2LkX30kaTQokUSlgSOZAer2trhjDM9MZccTqBNl5swq9N4J42IAY13yEpq95GDxb',
    content: '시험기간에는 역시 이 요가 스트레칭이죠... 허리 굳는 느낌 다 날아가요 ㅠ 다들 요가매트 깔고 5분만 허리 비틀기 해보세요. 척추가 바로 서는 느낌!',
    category: '스트레칭',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCznkRjDw93LLA2bCTt-6F89OeZuSYUC_5EMaEBIMfZ3R5QAuhk9b1Tzg1itn8GtMC7ebAuiSORccc1D6Z0HgA8K8OPLD3EmhGK1NyWGZFJOzx3ZKI79jGrzh1PEqBTA3OtWoIe_60UGaZqA_XKmDVOmwhRLcEvRFbghlf8MSfjK6gstxOEHNyoPIhB9BKsQHYJs9aXPQNE9p2doOBDEIwHK1r_eT4hjOUWmNiK33toQxR_jhQNDIbPvVj-yNwEU_atSkgGzW0Ia9ED',
    likes: 24,
    date: '2026-07-08',
    comments: [
      { id: 'c1', author: 'OO님', content: '방금 의자 척추 비틀기 따라해봤는데 두두둑 소리 나면서 짱시원해요 ㅋㅋ', date: '30분 전' }
    ]
  },
  {
    id: 'p2',
    author: 'OO님',
    role: '경영학과 23학번',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsqEdh_Gt33UrXeRIbjwcuKJ8HISFvOECDtiA5IKmfDZhYME3_ywMVtZqVJrWlwnIK2E49NrW_k7KuzNh2pcsHVq2vRSLPQ0T7hrwuohpQmtmAxQymVTqVyY0Uch2cnyxuFoEPxApuuovD9sJyatjYmneI2ZuqjIW5w04oWXuf0-GICpGoRFzF68WYRBr2JThy6sOlFOyWPMnc2nFPBipLRdmA-CbDV8ozXjLdm4we6yBs5CssdtN2s7Tj5O9AK02x-DLQRNfvGG_9',
    content: '주말 아침에 이불 속에서 양말 신고 따뜻하게 음악 듣는 게 제 유일한 숨구멍이에요. 여러분들의 소소한 소확행은 어떤 게 있나요?',
    category: '취미',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqhisxPVwuF4hB2j00reVAjCn4xnjCrAngzelXFP1U1MZwVkckvM_qSaw9IGgr1EnfoCw2xocfdhA9LrkrjlgHHoteEwFjiygayuv1oHUyOrOOYHdA_q1IK8a_U6TlwzkjuRpm2-Lz7V6hcxi8QIH_KayEZkWL6v573aagc520hgbwdLcaaeKUwb_FcdbCSvnnFgbnHDLDYorxx1-VClfB5demf6E0Ubsf1nd6nA4uw6jUwx1lM_qbFHXWLla0ap92Y0zydSPgVCa2',
    likes: 42,
    date: '2026-07-07',
    comments: [
      { id: 'c2', author: 'OO님', content: '저는 카모마일 차 마시면서 다이어리 쓰기에요! 진짜 뇌가 맑아지는 기분', date: '2시간 전' }
    ]
  },
  {
    id: 'p3',
    author: 'OO님',
    role: '미술대학 21학번',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA31VoXWXgceKQvDuHjeg2ULm18wvSGSsnY--T-OnFqqP8UDvoh-Pl0t9SCTFw2NoVKrK7vcKMOvdGqGBbBX2N9WfqhqzaOXpvUv_s-E4oUzruaiPshGLQbJ7FrwIDVs6ttAO8saLq25i4QqI6GL5Vl3mk8VwcNdBtivg9vFZ0xAwSqksQWxehSKzuSgZ2NG7pCAt_FTBSOk7sAyvMk4b679JCUEFm6RQXBBAgmyhue0wpBzOYrZhRdUZ-YKsjPbJb3PpgvvtCckjel',
    content: '몸의 중심에 호흡을 모은다는 생각으로 아날로그 다이어리를 적어가니 신기하게 마음이 차분해져요. 차 한잔의 여유도 최고입니다.',
    category: '명상',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxjPiTEMggcY2GaiOwo-RDCtYhNbHCDcR8KHhtMe5lCloLMrBketvv6LJOkVyePWA6TW-huFaSm_HEIMV3PyFdUuAZOHwtPS5HwH7zdtZdFZynFNS1wK1gqcZKO_Se2UXrDUZq2qW30vPSn34ehn4RGY_6DtegknDjVfNO0noIf7_H9jGmG_oLPOi4ViNfOeuVhFg_G7FBtmzqev9Pn9MJGOfKkzweox0P2JtWEEiqMUmXCefWJQH6weO_2StVznAnqTcxWocEJRVS',
    likes: 31,
    date: '2026-07-06',
    comments: []
  }
];

export const MARKET_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: '소이 왁스 라벤더 캔들',
    category: '향기 테라피',
    price: '14,800',
    description: '100% 천연 천연 소이 왁스와 프랑스산 천연 라벤더 에센셜 오일로 제작하여, 지친 하루의 긴장을 완화하고 깊은 숙면을 유도합니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZxmpismd0Mis8zmfDWYepF_-0S2Df8BWPsKleSrwc7t_KplOgZAkRz2GKru-usIbJF5lyPgGvnRa9nPVQJXAQfRFtQHPgxGziWC1eDKpGRW6VdN5RodZK5YVkzG5IEos778KB6o6XY309UY_ILcOBM0tckX8FeG64g6vMT8Cb2cyzHPzzyXzJle_bfe4uGYdJq4T0H_o9tM_f62rdpozKKVOb1NWBpk_LRA9V1jqS9leMOP_Zc50bJ6A8ny_4TMejtEJPSZuRcreG',
    rating: 4.8
  },
  {
    id: 'prod2',
    name: '천연 암막 실크 안대',
    category: '숙면 꿀템',
    price: '19,500',
    description: '최상급 뽕나무 실크로 제작되어 피부 자극이 적고 완벽한 차광을 보장합니다. 수면 중 눈가 피부를 보호하고 멜라토닌 분비를 촉진합니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2o0HeNoHMbmMmJPgBEe44KEroxiwRr4XRwYN3P6h1xetZsELjTe8f8xfWcynM9e5hOuYKLQ0_MhRPpN5qYosVId6EZv0Lq6HYsOLVqHngHb_3rwEaaEIc4Ux6s617fhR1OSKB5gDxJZqS8st2gVmJWGsLOtAV-lqiI469czkfMGkEok0X7E-pWfrP5_-n63A_JcRJQLJwzvnBUpWvQSl2hp4_fFjBD5MzmjwWcHnOLtJlUKtqsAMddWNH0TBA4ejg583nn2B23AnG',
    rating: 4.9
  },
  {
    id: 'prod3',
    name: '유기농 카모마일 리프 티 (20티백)',
    category: '힐링 티백',
    price: '12,000',
    description: '크로아티아산 청정 유기농 카모마일 꽃잎만을 그대로 담았습니다. 카페인이 없어 잠들기 전 따뜻하게 음용하면 심신 안정과 스트레스 완화에 탁월합니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH39Dv_GntUGVKzVQkqAQ8QPR0uIuRG4W7q5Y2Kby4ToQhh_Oc-BV1DKzuHpQ2ZWyyS-MGf0VDhR_ZvAxIWxuEmWOBe_BC7CSWQOm9ThZHBGueN3jTpShRzC5wPJV7Bh8hyEm3vkUTaF5i_3Cn_5HYbFmfkCFyOipmD_dMt1vpobUAmTt3hjQtVQOz1tQG1O2_OhJAfNRrIEAx6fGE2FgP-CPiTjsmRFAwibpr6fe1gfDvxYhsRDNk7UGahsBTi-sl5oSYxVLfz0kO',
    rating: 4.7
  },
  {
    id: 'prod4',
    name: '아로마 필로우 룸미스트 (편백 & 솔잎)',
    category: '공간 아로마',
    price: '16,500',
    description: '국산 천연 편백 오일과 솔잎 추출물 베이스로 피톤치드가 가득 담겼습니다. 베개나 이불에 2-3회 분사하면 숲속에 누워있는 듯한 울창한 아로마를 선사합니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdHfptL2PxEI1YoPce5ja3pBTDJbL_loqYv61ZlgFb0970q3wrZG_0TFzWwZgEYQeOFoV0t41en9Rn1kB4_b4q9cE2fW_nGgnm1JxZJWbU8Ad2GRAHVYGBl3ZEX8c2HVVOh9J6TdaXvYx_ONscx_WuV2fHGbn0AtGBp3IjGRk8scUrcTA0AWkppdFUjDw4e7MPYsTst5qpilIvgUiSy9cjrFkJUygkwlBnHtPmWxKSLCrAV7zzddA6j8g83XbzLObqIu_1xQwReGzm',
    rating: 4.6
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    question: '최근 학업이나 일과 후 신체적 피로도(어깨 결림, 두통 등)는 어느 정도인가요?',
    category: 'physical',
    options: [
      { text: '거의 느끼지 않음 (가뿐함)', score: 1 },
      { text: '약간 뻐근하고 피로함', score: 2 },
      { text: '오후가 되면 묵직하고 상당히 뻐근함', score: 3 },
      { text: '온몸이 돌덩이 같고 두통이 동반될 정도로 극심함', score: 4 }
    ]
  },
  {
    id: 'q2',
    question: '컴퓨터, 스마트폰 등 하루 평균 디지털 기기 모니터를 들여다보는 시간은?',
    category: 'physical',
    options: [
      { text: '4시간 미만', score: 1 },
      { text: '4시간 이상 ~ 8시간 미만', score: 2 },
      { text: '8시간 이상 ~ 12시간 미만', score: 3 },
      { text: '12시간 이상 (눈이 항상 피로함)', score: 4 }
    ]
  },
  {
    id: 'q3',
    question: '사소한 일에 짜증이 나거나 감정이 쉽게 요동치나요?',
    category: 'mental',
    options: [
      { text: '대체로 마음이 매우 평온함', score: 1 },
      { text: '가끔 감정 조절이 안 될 때가 있음', score: 2 },
      { text: '자주 가슴이 답답하고 짜증이 솟구침', score: 3 },
      { text: '매우 신경질적이고 항상 불안정한 상태임', score: 4 }
    ]
  },
  {
    id: 'q4',
    question: '걱정거리가 많아 잠들기 전 30분 이상 뒤척이거나 자주 깨시나요?',
    category: 'mental',
    options: [
      { text: '누우면 바로 푹 잠듦', score: 1 },
      { text: '조금 뒤척이지만 숙면하는 편', score: 2 },
      { text: '생각이 꼬리를 물어 잠들기 어렵고 자주 깸', score: 3 },
      { text: '거의 만성 불면증 수준으로 수면 만족도가 극악임', score: 4 }
    ]
  },
  {
    id: 'q5',
    question: '현재 전반적으로 느끼는 나의 누적 스트레스 지수는?',
    category: 'stress',
    options: [
      { text: '안정적이고 긍정적인 충전 상태', score: 1 },
      { text: '감당할 수 있는 보통 수준의 일상적 자극', score: 2 },
      { text: '상당히 지치고 휴식이 절대적으로 필요한 상태', score: 3 },
      { text: '에너지가 완전히 고갈된 번아웃 상태', score: 4 }
    ]
  }
];

export const POPULAR_REST_METHODS = [
  { id: '1', title: '5분 4-7-8 단전 호흡법', desc: '불안감 완화와 뇌 혈류 순환 촉진', views: '1.2k', rating: '4.9' },
  { id: '2', title: '허브티 마시며 디지털 아웃', desc: '일 30분 기기 차단 뇌 디톡스 효과', views: '980', rating: '4.8' },
  { id: '3', title: '거북목 탈출 어깨 날개뼈 열기', desc: '목 통증 개선 및 상체 긴장 전면 차단', views: '870', rating: '4.7' }
];

export const STUDENT_TIPS = [
  { id: 'st1', author: '경영과 OO님', text: '공강 시간에 빈 강의실 불 끄고 숲소리 백색소음 10분만 들으면 오후 수업 진짜 말짱하게 들을 수 있어요!' },
  { id: 'st2', author: '건축과 OO님', text: '과제 집중 안 될 때 라벤더 룸미스트 베개에 가볍게 뿌리고 척추비틀기 3세트 해보세요. 뇌에 산소 공급되는 느낌 대박임.' },
  { id: 'st3', author: '생명과 OO님', text: '암막실크안대 무조건 사세요... 낮잠 잘 때나 밤에 자취방 불빛 차단하는 데 최고입니다. 수면 질 3배 올라감.' }
];
