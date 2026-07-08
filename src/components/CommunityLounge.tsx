import React, { useState } from 'react';
import { LoungePost, Product } from '../types';
import { POPULAR_REST_METHODS, STUDENT_TIPS, USER_PROFILE } from '../mockData';
import { 
  MessageSquare, Heart, Share2, Filter, Send, ShoppingCart, 
  Tag, Star, CheckCircle, Flame, Plus, ThumbsUp 
} from 'lucide-react';

interface CommunityLoungeProps {
  initialSubTab?: string;
  loungePosts: LoungePost[];
  marketProducts: Product[];
  onAddPost: (content: string, category: LoungePost['category'], imageUrl?: string) => void;
  onToggleLikePost: (postId: string) => void;
  onAddCommentPost: (postId: string, commentContent: string) => void;
  onToggleFavoriteProduct: (productId: string) => void;
}

export default function CommunityLounge({
  initialSubTab = 'lounge',
  loungePosts,
  marketProducts,
  onAddPost,
  onToggleLikePost,
  onAddCommentPost,
  onToggleFavoriteProduct
}: CommunityLoungeProps) {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);
  const [selectedCategory, setSelectedCategory] = useState<LoungePost['category'] | '전체'>('전체');

  // New Post inputs
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostCategory, setNewPostCategory] = useState<LoungePost['category']>('기타');
  const [newPostImageUrl, setNewPostImageUrl] = useState<string>('');
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);

  // New Comment inputs (keyed by post ID)
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Purchase state modal simulation
  const [purchasedProduct, setPurchasedProduct] = useState<string | null>(null);

  // Student tips helpful counts
  const [tipHelpfulCounts, setTipHelpfulCounts] = useState<Record<string, number>>({
    st1: 14,
    st2: 9,
    st3: 25
  });
  const [votedTips, setVotedTips] = useState<Record<string, boolean>>({});

  const handleHelpfulClick = (tipId: string) => {
    if (votedTips[tipId]) return;
    setTipHelpfulCounts((prev) => ({ ...prev, [tipId]: prev[tipId] + 1 }));
    setVotedTips((prev) => ({ ...prev, [tipId]: true }));
  };

  // Create post handler
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    // We can use one of the hotlinked images for posts at random or if provided
    let finalImg = newPostImageUrl.trim();
    if (!finalImg && newPostCategory === '스트레칭') {
      finalImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCznkRjDw93LLA2bCTt-6F89OeZuSYUC_5EMaEBIMfZ3R5QAuhk9b1Tzg1itn8GtMC7ebAuiSORccc1D6Z0HgA8K8OPLD3EmhGK1NyWGZFJOzx3ZKI79jGrzh1PEqBTA3OtWoIe_60UGaZqA_XKmDVOmwhRLcEvRFbghlf8MSfjK6gstxOEHNyoPIhB9BKsQHYJs9aXPQNE9p2doOBDEIwHK1r_eT4hjOUWmNiK33toQxR_jhQNDIbPvVj-yNwEU_atSkgGzW0Ia9ED';
    }
    onAddPost(newPostContent, newPostCategory, finalImg || undefined);
    setNewPostContent('');
    setNewPostImageUrl('');
    setNewPostCategory('기타');
    setIsCreatingPost(false);
  };

  // Comment submission handler
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    onAddCommentPost(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  // Filter posts
  const filteredPosts = loungePosts.filter((post) => {
    if (selectedCategory === '전체') return true;
    return post.category === selectedCategory;
  });

  const handleBuyProduct = (product: Product) => {
    setPurchasedProduct(product.name);
    setTimeout(() => {
      setPurchasedProduct(null);
    }, 4000);
  };

  return (
    <div id="community-lounge-container" className="space-y-6 animate-fade-in pb-12">
      {/* Top Segmented Navigation */}
      <div className="flex border border-neutral-100 bg-white rounded-2xl p-1 shadow-sm">
        <button
          onClick={() => setActiveSubTab('lounge')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'lounge'
              ? 'bg-sky-100 text-sky-950 shadow-xs border border-sky-200/40'
              : 'text-neutral-500 hover:text-sky-900 hover:bg-sky-50/50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>우리의 휴식 라운지</span>
        </button>
        <button
          onClick={() => setActiveSubTab('market')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'market'
              ? 'bg-sky-100 text-sky-950 shadow-xs border border-sky-200/40'
              : 'text-neutral-500 hover:text-sky-900 hover:bg-sky-50/50'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>휴식 꿀템 마켓</span>
        </button>
      </div>

      {/* =========================================================================
          SUB-TAB 1: 소통 라운지 (Rest Lounge)
          ========================================================================= */}
      {activeSubTab === 'lounge' && (
        <div id="lounge-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Feed content & Filter Chips */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Post writing widget */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={USER_PROFILE.avatarUrl} 
                  alt={USER_PROFILE.name} 
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setIsCreatingPost(!isCreatingPost)}
                  className="flex-1 bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-100 rounded-2xl text-left py-3 px-4 text-xs text-neutral-400 font-medium transition-colors"
                >
                  오늘 나의 기분 좋은 휴식이나 꿀팁을 남겨보세요...
                </button>
              </div>

              {/* Expandable creation panel */}
              {isCreatingPost && (
                <div className="space-y-4 pt-3 border-t border-dashed border-neutral-100 animate-slide-up">
                  <textarea
                    rows={3}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="캠퍼스 일상 속 나만의 소소한 힐링은 어떤 것인가요? (예: 전공 가방 내려놓고 3분 어깨 돌리기, 도서관에서 ASMR 듣기 등)"
                    className="w-full text-xs p-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-neutral-50/50 placeholder:text-neutral-400"
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Category Selector */}
                    <div className="flex-1 flex items-center space-x-2">
                      <span className="text-xs font-semibold text-neutral-500 shrink-0">태그 분류:</span>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value as LoungePost['category'])}
                        className="flex-1 text-xs py-2 px-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white"
                      >
                        <option value="스트레칭">스트레칭</option>
                        <option value="명상">명상</option>
                        <option value="취미">취미</option>
                        <option value="ASMR">ASMR</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    {/* Image URL input (optional) */}
                    <div className="flex-1 flex items-center space-x-2">
                      <span className="text-xs font-semibold text-neutral-500 shrink-0">이미지 첨부:</span>
                      <input
                        type="text"
                        value={newPostImageUrl}
                        onChange={(e) => setNewPostImageUrl(e.target.value)}
                        placeholder="첨부할 이미지 핫링크 URL (선택)"
                        className="flex-1 text-xs py-2 px-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      onClick={() => setIsCreatingPost(false)}
                      className="px-4 py-2 text-xs font-bold border border-neutral-200 hover:bg-neutral-50 rounded-xl transition-all"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                      className="px-4 py-2 text-xs font-bold bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                    >
                      게시글 등록
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Category filtering chips */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-neutral-400 shrink-0 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3 h-3" />
                정렬:
              </span>
              {(['전체', '스트레칭', '명상', '취미', 'ASMR', '기타'] as const).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all shrink-0 ${
                      isActive
                        ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                        : 'bg-white border-neutral-100 hover:border-neutral-200 text-neutral-600'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Posts Feed list */}
            <div className="space-y-6">
              {filteredPosts.map((post) => {
                const isLiked = post.isLikedByUser;
                const isMyCommentEmpty = !commentInputs[post.id];

                return (
                  <div key={post.id} className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4 animate-fade-in">
                    
                    {/* Post Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={post.avatarUrl} 
                          alt={post.author} 
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-bold text-neutral-900">{post.author}</span>
                            {post.role && (
                              <span className="text-[10px] text-neutral-400">· {post.role}</span>
                            )}
                          </div>
                          <span className="inline-block text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 rounded-full px-2 py-0.5 mt-0.5">
                            #{post.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono font-medium">
                        {post.date}
                      </span>
                    </div>

                    {/* Post Content */}
                    <p className="text-xs text-neutral-700 leading-relaxed font-sans whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Post Image if exists */}
                    {post.imageUrl && (
                      <div className="h-48 sm:h-64 rounded-2xl overflow-hidden border border-neutral-50 bg-neutral-100">
                        <img 
                          src={post.imageUrl} 
                          alt="Post attachment" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Actions panel */}
                    <div className="flex items-center space-x-4 pt-1 text-xs text-neutral-400 border-t border-neutral-50">
                      <button
                        onClick={() => onToggleLikePost(post.id)}
                        className={`flex items-center space-x-1 font-bold transition-all ${
                          isLiked ? 'text-rose-600 font-bold scale-102' : 'hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </span>

                      <button className="flex items-center space-x-1 hover:text-neutral-950 font-semibold transition-colors">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>공유</span>
                      </button>
                    </div>

                    {/* Comments section */}
                    <div className="space-y-3 pt-3 border-t border-dashed border-neutral-100 bg-neutral-50/40 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        댓글 목록 ({post.comments.length})
                      </p>

                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2 text-xs">
                          <span className="text-sm shrink-0 bg-white shadow-sm border border-neutral-100 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                            💬
                          </span>
                          <div className="bg-white p-2 rounded-xl border border-neutral-100 flex-1 min-w-0">
                            <div className="flex justify-between items-center text-[10px] text-neutral-400">
                              <span className="font-bold text-neutral-800">{comment.author}</span>
                              <span className="font-mono">{comment.date}</span>
                            </div>
                            <p className="text-neutral-600 font-sans mt-0.5 leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Write comment input */}
                      <div className="flex items-center space-x-2 pt-1">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="응원의 한마디 또는 공감 댓글을 남겨주세요..."
                          className="flex-1 text-xs px-3 py-2 border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white rounded-xl placeholder:text-neutral-400"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={isMyCommentEmpty}
                          className="p-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="w-3.5 h-3.5 fill-white" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Weekly Popular Methods and Student wisdom */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Section 1: Weekly popular methods */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-50 pb-2 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                이주의 인기 휴식법
              </h3>

              <div className="space-y-3">
                {POPULAR_REST_METHODS.map((method, idx) => (
                  <div key={method.id} className="flex items-start gap-3 p-2.5 rounded-2xl border border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <span className="text-xs font-bold text-neutral-400 shrink-0 font-mono mt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs font-bold text-neutral-800 truncate">{method.title}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{method.desc}</p>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-neutral-400">
                        <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {method.rating}</span>
                        <span>조회 {method.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Student tip of the day block */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-5 space-y-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">학생 휴식 리서치</h4>
                <h3 className="text-sm font-bold text-neutral-900">우리들의 휴식 노하우</h3>
              </div>

              <div className="space-y-3">
                {STUDENT_TIPS.map((tip) => {
                  const hasVoted = votedTips[tip.id];
                  return (
                    <div key={tip.id} className="bg-white p-3 rounded-2xl border border-neutral-100 space-y-2">
                      <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                        &quot;{tip.text}&quot;
                      </p>
                      <div className="flex justify-between items-center border-t border-neutral-50 pt-2 text-[10px]">
                        <span className="font-semibold text-neutral-400">by {tip.author}</span>
                        <button
                          onClick={() => handleHelpfulClick(tip.id)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-lg border transition-all ${
                            hasVoted
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-700 font-bold'
                              : 'bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>도움돼요 {tipHelpfulCounts[tip.id]}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 2: 휴식 꿀템 마켓 (Rest Marketplace)
          ========================================================================= */}
      {activeSubTab === 'market' && (
        <div id="market-tab" className="space-y-6">
          
          {/* Main header bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
            <div className="absolute inset-0 z-0 opacity-40">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxjPiTEMggcY2GaiOwo-RDCtYhNbHCDcR8KHhtMe5lCloLMrBketvv6LJOkVyePWA6TW-huFaSm_HEIMV3PyFdUuAZOHwtPS5HwH7zdtZdFZynFNS1wK1gqcZKO_Se2UXrDUZq2qW30vPSn34ehn4RGY_6DtegknDjVfNO0noIf7_H9jGmG_oLPOi4ViNfOeuVhFg_G7FBtmzqev9Pn9MJGOfKkzweox0P2JtWEEiqMUmXCefWJQH6weO_2StVznAnqTcxWocEJRVS" 
                alt="Teacup and notebook" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-950/80 z-1"></div>
            
            <div className="relative z-10 space-y-1 max-w-md">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">수움 마켓 솔루션</span>
              <h2 className="text-base sm:text-lg font-bold">오프라인 휴식을 돕는 소품 셀렉션</h2>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                캠퍼스 학업 스트레스 수치를 줄여줄 완벽한 아이템들을 대학생 맞춤형 혜택가로 제안합니다.
              </p>
            </div>
          </div>

          {/* Toast Notification simulation */}
          {purchasedProduct && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800 text-xs flex items-center justify-between animate-slide-up shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-xl">🛍️</span>
                <div className="space-y-0.5">
                  <p className="font-bold">[{purchasedProduct}] 구매/장바구니 연결 완료!</p>
                  <p className="text-emerald-700/90 font-sans">
                    학생 복지 카드 연동 및 10% 추가 할인이 정상적으로 등록되었습니다.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full border border-emerald-200">
                SUCCESS
              </span>
            </div>
          )}

          {/* Grid list of Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketProducts.map((prod) => {
              const isFav = prod.isFavorite;

              return (
                <div key={prod.id} className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col justify-between group">
                  {/* Photo cover */}
                  <div className="h-40 overflow-hidden relative bg-neutral-50">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category tag */}
                    <span className="absolute top-3 left-3 text-[9px] bg-white/90 backdrop-blur-sm text-neutral-800 font-extrabold px-2 py-1 rounded-lg border border-neutral-100 shadow-xs uppercase tracking-wider">
                      {prod.category}
                    </span>

                    {/* Favorite Trigger */}
                    <button
                      onClick={() => onToggleFavoriteProduct(prod.id)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full border border-neutral-100 shadow-xs text-neutral-400 hover:text-rose-500 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Body description */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {prod.name}
                        </h4>
                        <span className="shrink-0 flex items-center text-[10px] text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                          {prod.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed font-sans">
                        {prod.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-neutral-400 font-medium">대학생 할인가</span>
                        <span className="text-sm font-extrabold text-neutral-950 font-sans">
                          {prod.price}원
                        </span>
                      </div>

                      <button
                        onClick={() => handleBuyProduct(prod)}
                        className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>맞춤 구매하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
