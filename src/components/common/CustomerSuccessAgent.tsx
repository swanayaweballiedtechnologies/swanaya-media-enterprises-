import React from 'react';
import { Bot, Sparkles, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';

export const openElaraAgent = () => {
  let parentUrl = '';
  try {
    parentUrl = window.top && window.top.location ? window.top.location.href : window.location.href;
  } catch (e) {
    parentUrl = window.location.href;
  }

  const url = `https://agent.jotform.com/01a0441d77a870008c43ab472957b80f6773?embedMode=popup&parentURL=${encodeURIComponent(parentUrl)}`;
  const width = 700;
  const height = 500;
  const top = typeof window !== 'undefined' && window.outerHeight ? Math.max(0, window.outerHeight / 2 - 250) : 100;
  const left = typeof window !== 'undefined' && window.outerWidth ? Math.max(0, window.outerWidth / 2 - 350) : 100;

  window.open(
    url,
    'blank',
    `scrollbars=yes,toolbar=no,width=${width},height=${height},top=${top},left=${left}`
  );
};

export interface ElaraAgentButtonProps {
  variant?: 'primary' | 'outline' | 'pill' | 'header' | 'raw';
  className?: string;
  label?: string;
}

export const ElaraAgentButton: React.FC<ElaraAgentButtonProps> = ({
  variant = 'primary',
  className = '',
  label = 'Elara: Customer Success Agent',
}) => {
  if (variant === 'raw') {
    return (
      <a
        style={{
          textTransform: 'uppercase',
          fontSize: '14px',
          cursor: 'pointer',
          padding: '12px 18px',
          fontFamily: 'inherit',
          backgroundColor: '#0075E3',
          border: '1px solid #0075E3',
          color: '#FFFFFF',
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
          fontWeight: 600,
        }}
        onClick={(e) => {
          e.preventDefault();
          openElaraAgent();
        }}
        href="#elara-agent"
        id="elara-agent-raw-btn"
      >
        {label}
      </a>
    );
  }

  if (variant === 'header') {
    return (
      <button
        onClick={openElaraAgent}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 text-xs font-bold transition-all ${className}`}
        title="Chat with Elara: Customer Success Agent"
        id="navbar-elara-agent-btn"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <Bot className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">Elara Agent</span>
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={openElaraAgent}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold uppercase tracking-wider transition-all ${className}`}
        id="elara-agent-outline-btn"
      >
        <Bot className="w-4 h-4" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={openElaraAgent}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0075E3] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/25 transition-all transform active:scale-95 ${className}`}
      id="elara-agent-primary-btn"
    >
      <Bot className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export const ElaraAgentCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border border-blue-700/40 shadow-xl space-y-4 relative overflow-hidden ${className}`}
      id="elara-agent-featured-card"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 border border-blue-400/40 flex-shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold">Elara</h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE 24/7</span>
              </span>
            </div>
            <p className="text-xs text-blue-200 font-medium">Swanaya Customer Success Agent</p>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        Need instant assistance with project scopes, pricing models, service timelines, or booking a consultation? Chat in real time with Elara.
      </p>

      <button
        onClick={openElaraAgent}
        className="w-full py-2.5 px-4 rounded-xl bg-[#0075E3] hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 transition-transform active:scale-95"
        id="elara-agent-card-launch-btn"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Launch Customer Success Chat</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
