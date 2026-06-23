import React, { useState, useEffect } from 'react';

const COOKIE_NAME = 'hidePortfolioNotice';

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name, value, hours) => {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const FEATURES = [
  {
    title: '관광 정보 제공',
    items: ['경기 남부/북부 지역 관광지 조회', '먹거리·볼거리·놀거리·잘거리 카테고리', '지역별 상세 관광 정보 조회'],
  },
  {
    title: 'AI 여행 플래너',
    items: ['지역·기간·테마 선택 기반 일정 자동 생성', '일정별 장소 추천 기능 제공', '지도 마커 기반 방문 순서 시각화'],
  },
  {
    title: '관광지·코스 공유',
    items: ['인생 / 핫플거리 게시판', '댓글 및 좋아요 기능', '타 사용자 일정 가져오기'],
  },
];

const LINKS = [
  { label: 'GitHub (Front)', href: 'https://github.com/mojitt/sst-front' },
  { label: 'GitHub (Back)', href: 'https://github.com/mojitt/sst-back' },
  { label: 'GitHub (FastAPI)', href: 'https://github.com/mojitt/sst-fastApi' },
  { label: '개발 문서', href: 'https://zrr.kr/RBIWiH' },
  { label: '완료 보고서', href: 'https://zrr.kr/y7AL1U' },
];

const PortfolioNoticeModal = () => {
  const [show, setShow] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowToday) {
      setCookie(COOKIE_NAME, 'true', 24);
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl relative">

        {/* 헤더 */}
        <div className="bg-[#0F9B73] px-8 py-6 rounded-t-2xl">
          <p className="text-base font-semibold text-white/70 mb-1.5 tracking-widest uppercase">Portfolio Project</p>
          <h2 className="text-2xl font-extrabold text-white leading-snug">
            경기도 스마트 AI 여행 플래너
          </h2>
          <p className="text-base text-white/80 mt-1">Gyeonggi Smart AI Travel Planner Service</p>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
              aria-label="닫기"
            >
              ✕
            </button>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* 프로젝트 소개 */}
          <div>
            <p className="text-xl font-bold text-[#0F9B73] uppercase tracking-wider mb-2">프로젝트 소개</p>
            <p className="text-lg text-gray-600 leading-relaxed">
              경기도 내 다양한 여행지 정보를 제공하고, 사용자가 원하는 선택지를 선택하면
              AI가 동선 최적화된 여행 일정을 자동으로 생성해주는 웹 서비스입니다.
            </p>
          </div>

          {/* 주요 기능 */}
          <div>
            <p className="text-xl font-bold text-[#0F9B73] uppercase tracking-wider mb-3">주요 기능</p>
            <div className="grid grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-gray-50 rounded-xl p-2 md:p-4">
                  <p className="text- md:text-lg font-bold text-gray-800 mb-2">{f.title}</p>
                  <ul className="space-y-1.5">
                    {f.items.map((item) => (
                      <li key={item} className="text-sm md:text-base text-gray-500 flex items-start gap-1.5">
                        <span className="text-[#0F9B73] mt-0.5 shrink-0">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 관련 문서 */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {LINKS.filter(link => link.label.startsWith('GitHub')).map((link) => (
                
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-[#0F9B73]/10 hover:text-[#0F9B73] transition"
                >
                  🔗 {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {LINKS.filter(link => !link.label.startsWith('GitHub')).map((link) => (
                
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-[#0F9B73]/10 hover:text-[#0F9B73] transition"
                >
                  🔗 {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* 포트폴리오 안내 */}
          <p className="text-sm text-gray-400 border-t border-gray-100 pt-5">
            본 사이트는 팀 [SST]의 공동 역량 증명을 위한 포트폴리오 용도로 제작되었으며, 일체의 상업적 목적이 없음을 밝힙니다.
          </p>

          {/* 하단 */}
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 select-none">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="accent-[#0F9B73] w-4 h-4"
              />
              오늘 하루 보지 않기
            </label>
            <button
              onClick={handleClose}
              className="px-8 py-2.5 rounded-xl bg-[#0F9B73] font-bold text-white text-base hover:bg-[#0d8a66] transition"
            >
              확인
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PortfolioNoticeModal;