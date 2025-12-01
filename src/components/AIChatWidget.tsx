'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  'מה המחירים?',
  'איך זה עובד?',
  'מתי אפשר להתחיל?',
  'תן לי פרטים נוספים',
];

const botResponses: Record<string, string> = {
  'מה המחירים?': 'יש לנו 3 מסלולים: חברות מבוססות (מ-₪50,000), שותפות אחוז (0₪ מראש), ותשלום חודשי (מ-₪2,500). איזה מסלול מעניין אותך?',
  'איך זה עובד?': 'זה פשוט! אנחנו מתחילים בפגישת היכרות, בונים תוכנית עבודה, מפתחים ביחד, משיקים, וממשיכים לתמוך. הכל שקוף ומובן מראש.',
  'מתי אפשר להתחיל?': 'אפשר להתחיל תוך שבוע! אנחנו זמינים לפגישת היכרות כבר השבוע. רוצה שנקבע זמן?',
  'תן לי פרטים נוספים': 'בוודאי! אני יכול לשלוח לך קישור לטופס יצירת קשר, או שאפשר לדבר ישירות בוואטסאפ. מה נוח לך?',
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'שלום! אני כאן כדי לעזור. איך אני יכול לעזור לך היום?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[text] || 'תודה על השאלה! אני אשמח לעזור. אפשר לשלוח לי הודעה בוואטסאפ או למלא את טופס יצירת הקשר לקבלת תשובה מפורטת יותר.';
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-32 left-8 z-[97] w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all glow-purple"
        aria-label="פתח צ'אט"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 left-8 z-[97] w-full sm:w-96 h-[500px] max-h-[calc(100vh-8rem)] glass-effect-2 rounded-2xl shadow-2xl flex flex-col overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="chat-title">
          {/* Header */}
          <div className="gradient-primary px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <div id="chat-title" className="text-sm font-bold text-white">CoreSide Assistant</div>
                <div className="text-xs text-white/80">זמין עכשיו</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'gradient-primary text-white'
                      : 'glass-effect text-[#fafafa]'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-effect rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-xs glass-effect-2 rounded-full text-[#a1a1aa] hover:text-white transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="כתוב הודעה..."
                className="flex-1 px-4 py-2 bg-[#1a1a1e] border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-purple-500"
                aria-label="כתוב הודעה"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsOpen(false);
                }}
              />
              <button
                type="submit"
                className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white hover:scale-110 transition-all"
                aria-label="שלח הודעה"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

