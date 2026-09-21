import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { AIEngine } from '@/services/aiEngine';
import { CARS } from '@/data/cars';
import { useApp } from '@/context/AppContext';

export default function AIAssistant() {
  const { addToast } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm CarFashion AI 👋 I can help you find cars, plan trips, estimate costs, and more. Try asking: \"cheap SUV for 5 people\" or \"plan a 3-day trip to Goa\"." },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  const quickPrompts = ['Cheap car for 5 people', 'Luxury car under ₹8000', 'Electric SUV options', '7-seater for family trip'];

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { from: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      const reply = AIEngine.assistantReply(msg, { cars: CARS, bookings: [], favorites: [] });
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
      addToast('AI Assistant replied', 'ai');
    }, 500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[3500]">
      {open && (
        <div className="absolute bottom-[76px] left-0 w-[360px] max-w-[calc(100vw-48px)] rounded-[20px] overflow-hidden flex flex-col max-h-[520px]"
             style={{ background: 'var(--bg-surface)', boxShadow: 'var(--sh-xl)', border: '1px solid var(--border)', animation: 'fadeUp .3s ease' }}
             role="dialog" aria-label="AI Assistant">
          <div className="px-5 py-4 flex items-center justify-between text-white" style={{ background: 'var(--grad-brand)' }}>
            <h4 className="font-bold flex items-center gap-2"><Sparkles size={16} /> CarFashion AI</h4>
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/35 transition-all hover:rotate-90" aria-label="Close">
              <X size={16} />
            </button>
          </div>
          <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[200px] max-h-[360px]">
            {messages.map((m, i) => (
              <div key={i}
                   className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[0.88rem] leading-normal ${
                     m.from === 'bot' ? 'self-start' : 'self-end text-white'
                   }`}
                   style={m.from === 'bot' ? {
                     background: 'var(--bg-soft)', color: 'var(--text-primary)', borderBottomLeftRadius: 4,
                   } : {
                     background: 'var(--grad-brand)', borderBottomRightRadius: 4,
                   }}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 px-3 pb-3">
            {quickPrompts.map((p, i) => (
              <button key={i} onClick={() => send(p)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                      style={{ background: 'var(--bg-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && send()}
                   placeholder="Ask me anything..."
                   className="flex-1 px-3.5 py-2.5 rounded-full text-sm outline-none border-[1.5px]"
                   style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }} />
            <button onClick={() => send()} aria-label="Send"
                    className="w-9.5 h-9.5 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    style={{ background: 'var(--grad-brand)' }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button
        className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110"
        style={{ background: 'var(--grad-brand)', boxShadow: '0 12px 32px -8px rgba(124,58,237,.6)' }}
        onClick={() => setOpen((o) => !o)} aria-label="Open AI assistant">
        {open ? <X size={24} /> : <Sparkles size={24} />}
        <span className="absolute -inset-1 rounded-full border-2 border-violet-500" style={{ animation: 'ping 2s ease-out infinite' }} />
      </button>
    </div>
  );
}