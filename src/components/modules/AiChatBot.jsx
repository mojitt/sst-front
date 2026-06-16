import React, { useEffect, useState } from "react";
import aiApi from "@api/aiAxios";
import chatbotImg from "@assets/images/chatbot.png";

/* AI 고객지원 대화 기록 저장 키 */
const STORAGE_KEY = "faq_ai_chat_history";

const AiChatBot = () => {
  /* 챗봇 열림/닫힘 상태 */
  const [isOpen, setIsOpen] = useState(false);

  /* 사용자 질문 */
  const [question, setQuestion] = useState("");

  /* AI 답변 */
  const [aiAnswer, setAiAnswer] = useState("");

  /* AI 답변 로딩 상태 */
  const [aiLoading, setAiLoading] = useState(false);

  /* 최근 대화 기록 */
  const [chatHistory, setChatHistory] = useState([]);

  /* AI 고객지원 질문 */
  const handleAskAi = async () => {
    if (!question.trim()) {
      alert("질문을 입력해주세요.");
      return;
    }

    try {
      setAiLoading(true);
      setAiAnswer("");

      const res = await aiApi.post("/ai/qna", {
        question: question.trim(),
        history: chatHistory,
      });

      const answer = res.data.answer || "답변을 생성하지 못했습니다.";

      setAiAnswer(answer);

      /* 최근 대화 5개만 저장 */
      const newHistory = [
        ...chatHistory,
        {
          question: question.trim(),
          answer,
        },
      ].slice(-5);

      setChatHistory(newHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

      setQuestion("");
    } catch (err) {
      console.error("AI 고객지원 실패", err);
      setAiAnswer("죄송합니다. 현재 AI 답변을 불러올 수 없습니다.");
    } finally {
      setAiLoading(false);
    }
  };

  /* 처음 로딩 시 localStorage에서 대화 기록 불러오기 */
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);

    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <>
      {/* 오른쪽 하단 챗봇 버튼 */}
      <button
        type="button"
        onClick={() => {
            if (isOpen) {
            setQuestion("");
            setAiAnswer("");
            }
            setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl hover:scale-105 transition z-50 overflow-hidden">
        <img
            src={chatbotImg}
            alt="AI 챗봇"
            className="w-full h-full object-cover"
        />
      </button>

      {/* AI 고객지원 모달 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-48px)] rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-2xl z-50">
          {/* 모달 헤더 */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100">
                <img
                    src={chatbotImg}
                    alt="AI 챗봇"
                    className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  AI 고객지원
                </h3>
                <p className="text-lg text-gray-500">
                  공지사항과 FAQ를 기반으로 안내해드려요.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                    setIsOpen(false);
                    setQuestion("");
                    setAiAnswer("");
                }}
              className="text-gray-400 hover:text-gray-600 text-xl">
              ×
            </button>
          </div>

          {/* 질문 입력 */}
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={500}
            placeholder="예) 카카오 로그인이 되지 않아요."
            className="w-full min-h-[120px] rounded-2xl border border-gray-200 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          {/* 글자 수 및 질문 버튼 */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-400">
              {question.length}/500
            </span>

            <button
              type="button"
              onClick={handleAskAi}
              disabled={aiLoading}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-300">
              {aiLoading ? "답변 생성 중..." : "질문하기"}
            </button>
          </div>

          {/* AI 답변 출력 */}
          {aiAnswer && (
            <div className="mt-5 max-h-[220px] overflow-y-auto rounded-2xl bg-white border border-gray-100 p-4 text-gray-700 leading-7 whitespace-pre-wrap text-justify fs-up-2">
              {aiAnswer}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AiChatBot;