import React from 'react';
import { useCms } from '../../context/CmsContext';
import { AnalyticsGlobe3D } from '../../components/3d/AnalyticsGlobe3D';
import { Globe2, Users, MapPin, Activity, Radio, Sparkles } from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const { analytics, liveVisitors = [] } = useCms();
  const safeLiveVisitors = liveVisitors || [];

  return (
    <div className="space-y-8" id="admin-analytics-world-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Live 3D Digital World & Visitor Telemetry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time geospatial visitor telemetry across global business hubs and Kerala regional production sets.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Real-time Polling Active</span>
        </div>
      </div>

      {/* 3D Globe Interactive Visualization */}
      <AnalyticsGlobe3D visitors={safeLiveVisitors} />

      {/* Live Nodes Table & Geography Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Active Concurrent Sessions ({safeLiveVisitors.length})</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Latency: ~42ms</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Location / Geo IP</th>
                  <th className="p-3">Current Active Page</th>
                  <th className="p-3">Device / OS</th>
                  <th className="p-3">Coordinates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {safeLiveVisitors.map((vis) => (
                  <tr key={vis.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{vis.location}</span>
                    </td>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">
                      {vis.currentPage}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      {vis.device}
                    </td>
                    <td className="p-3 font-mono text-slate-400 text-[11px]">
                      {(vis.latitude || 0).toFixed(2)}°N, {(vis.longitude || 0).toFixed(2)}°E
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Geography Reach */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Top Geographic Regions</span>
          </h3>

          <div className="space-y-3 pt-2">
            {[
              { region: 'Kerala (Kochi, Kozhikode, Trivandrum)', share: '52%' },
              { region: 'Middle East & UAE (Dubai, Abu Dhabi)', share: '21%' },
              { region: 'Bangalore & Chennai Tech Corridors', share: '14%' },
              { region: 'North America (US & Canada)', share: '8%' },
              { region: 'United Kingdom & Europe', share: '5%' },
            ].map((geo) => (
              <div key={geo.region} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">{geo.region}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{geo.share}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: geo.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
