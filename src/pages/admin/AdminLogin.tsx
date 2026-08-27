import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Shield, Lock, User, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onReturnHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onReturnHome }) => {
  const { loginAdmin } = useCms();
  const [username, setUsername] = useState('aadithyan');
  const [password, setPassword] = useState('swanaya2026!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(username, password);
      setLoading(false);
      if (success) {
        onSuccess();
      } else {
        setError('Invalid admin credentials. Please verify username and password.');
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4" id="admin-login-screen">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-8 text-center text-white border-b border-blue-900/40">
          <div className="flex justify-center mb-3">
            <BrandLogo variant="light" size="md" />
          </div>
          <h2 className="text-xl font-bold font-serif tracking-tight">
            Swanaya Enterprise Admin Console
          </h2>
          <p className="text-xs text-blue-300 mt-1 font-mono">
            Restricted Central Management System (CMS)
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 flex items-center gap-2.5 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white font-mono"
                  placeholder="aadithyan"
                  id="admin-username-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white font-mono"
                  placeholder="••••••••"
                  id="admin-password-input"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div><strong>Primary Admin:</strong> <code className="text-blue-600 dark:text-blue-400">aadithyan</code></div>
              <div><strong>Default Demo Credential:</strong> <code className="text-blue-600 dark:text-blue-400">swanaya2026!</code></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              id="admin-login-submit-btn"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Access Admin Console</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onReturnHome}
              className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-mono"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
