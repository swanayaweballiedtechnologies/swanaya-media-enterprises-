import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Shield, KeyRound, Lock, Clock, CheckCircle2, User, AlertCircle } from 'lucide-react';

export const AdminAuditView: React.FC = () => {
  const { auditLogs = [], changePassword, currentUser } = useCms();
  const safeAuditLogs = auditLogs || [];
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    changePassword(newPassword);
    setMsg({ type: 'success', text: 'Admin security password has been successfully updated!' });
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="space-y-8" id="admin-audit-security-view">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Audit Logs & Security Governance
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Immutable audit trails of all CMS mutations, lead actions, and access credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Password Reset */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <KeyRound className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Update Admin Master Password
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Change the credentials for user: <strong className="text-slate-900 dark:text-white font-mono">{currentUser?.username || 'aadithyan'}</strong>.
          </p>

          {msg && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                msg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-500/30'
              }`}
            >
              {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Security Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password..."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password..."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md mt-2"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Right Column: Audit Logs Timeline */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Immutable System Audit Trail ({safeAuditLogs.length})</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Chronological</span>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {safeAuditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {log.action} • {log.entityType}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                  {log.entityTitle}
                </p>
                {log.details && (
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    {log.details}
                  </p>
                )}
                <div className="text-[10px] text-slate-400 font-mono pt-1">
                  Actor: <strong>{log.adminUsername}</strong> ({log.adminRole}) • {new Date(log.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
            {safeAuditLogs.length === 0 && (
              <p className="text-center py-6 text-slate-400 font-mono text-xs">
                No audit entries recorded.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
