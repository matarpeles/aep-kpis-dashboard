import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { PortLogo } from './components/PortLogo';
import { useSheetData } from './hooks/useSheetData';
import { H1_END_DATE, CATEGORY_ORDER } from './config';

// Clean, minimal KPI card - Apple style
const KPICard = ({ kpi, onClick }) => {
  const { name, current, target, status, unit } = kpi;
  const percentage = target ? Math.round((current / target) * 100) : null;
  const displayValue = unit === '%' ? `${current}%` : current;
  
  const statusColors = {
    green: { bar: 'bg-emerald-500', text: 'text-emerald-600' },
    yellow: { bar: 'bg-amber-500', text: 'text-amber-600' },
    red: { bar: 'bg-red-500', text: 'text-red-600' }
  };
  const colors = statusColors[status] || statusColors.yellow;

  return (
    <div 
      className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
      onClick={() => onClick?.(kpi)}
    >
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        {name}
      </h3>
      
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-5xl font-bold text-gray-900 tracking-tight">
          {displayValue}
        </span>
        {target && (
          <span className="text-xl text-gray-400">
            / {target}
          </span>
        )}
      </div>

      {target && (
        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${colors.bar}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm font-semibold ${colors.text}`}>
              {percentage}% complete
            </span>
            <span className="text-xs text-gray-400">
              {target - current} to go
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Category section
const CategorySection = ({ title, kpis, onKPIClick }) => (
  <div className="mb-8">
    <div className="flex items-center gap-4 mb-5">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} onClick={onKPIClick} />
      ))}
    </div>
  </div>
);

// Dashboard page
const Dashboard = () => {
  const navigate = useNavigate();
  const { data, loading, lastFetch, refetch } = useSheetData();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diff = H1_END_DATE - now;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysRemaining(Math.max(0, days));
    };
    calculateDays();
    const timer = setInterval(calculateDays, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      if (e.key === 'r' || e.key === 'R') refetch();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen, refetch]);

  const kpisByCategory = data.kpis.reduce((acc, kpi) => {
    if (!acc[kpi.category]) acc[kpi.category] = [];
    acc[kpi.category].push(kpi);
    return acc;
  }, {});

  const sortedCategories = Object.entries(kpisByCategory).sort(([a], [b]) => {
    const orderA = CATEGORY_ORDER.indexOf(a);
    const orderB = CATEGORY_ORDER.indexOf(b);
    return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
  });

  const totalKPIs = data.kpis.length;
  const onTrack = data.kpis.filter(k => k.status === 'green').length;
  const avgProgress = Math.round(
    data.kpis
      .filter(k => k.target)
      .reduce((sum, k) => sum + (k.current / k.target) * 100, 0) / 
    data.kpis.filter(k => k.target).length
  );

  const handleKPIClick = (kpi) => {
    navigate(`/kpi/${kpi.id}`);
  };

  if (loading && !data.kpis.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <PortLogo />
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">AEP KPIs</h1>
                <p className="text-xs text-gray-500">H1 2026 Targets</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{daysRemaining}</div>
                <div className="text-xs text-gray-500">days left</div>
              </div>
              
              <div className="h-10 w-px bg-gray-200" />
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{avgProgress}%</div>
                <div className="text-xs text-gray-500">avg progress</div>
              </div>
              
              <div className="h-10 w-px bg-gray-200" />
              
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{onTrack}/{totalKPIs}</div>
                <div className="text-xs text-gray-500">on track</div>
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {sortedCategories.map(([category, kpis]) => (
          <CategorySection 
            key={category} 
            title={category} 
            kpis={kpis} 
            onKPIClick={handleKPIClick}
          />
        ))}
      </main>

      <footer className="fixed bottom-4 right-4">
        <span className="text-xs text-gray-400">
          Updated {lastFetch.toLocaleTimeString()} • port.io
        </span>
      </footer>

      {!isFullscreen && (
        <div className="fixed bottom-4 left-4 text-xs text-gray-400">
          <kbd className="px-1.5 py-0.5 bg-white rounded border text-gray-500">F</kbd> fullscreen
          <kbd className="px-1.5 py-0.5 bg-white rounded border text-gray-500 ml-2">R</kbd> refresh
        </div>
      )}
    </div>
  );
};

// KPI Detail page
const KPIDetail = () => {
  const { kpiId } = useParams();
  const { data, loading } = useSheetData();
  
  const kpi = data.kpis.find(k => k.id === kpiId);

  if (loading && !data.kpis.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!kpi) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">KPI not found</p>
          <Link to="/" className="text-indigo-600 hover:underline">← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const { drilldown } = kpi;
  const percentage = kpi.target ? Math.round((kpi.current / kpi.target) * 100) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-gray-400 hover:text-gray-900 mb-4 flex items-center gap-2 text-sm">
            ← Back to Dashboard
          </Link>
          <div className="flex items-start justify-between mt-4">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
                {kpi.category}
              </p>
              <h1 className="text-3xl font-bold text-gray-900">{kpi.name}</h1>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-gray-900">
                {kpi.current}{kpi.unit || ''}
                {kpi.target && <span className="text-2xl text-gray-400 ml-2">/ {kpi.target}</span>}
              </div>
              {percentage && (
                <p className="text-sm text-gray-500 mt-1">
                  {percentage}% to target
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {drilldown ? (
          <>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              What we're doing to achieve this
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drilldown.items?.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {item.company || item.name || item.author || 'Item'}
                    </h3>
                    {item.status && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        item.status === 'live' || item.status === 'high' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'in_progress' || item.status === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                  {(item.quote || item.comment) && (
                    <p className="text-sm text-gray-600 italic">
                      "{item.quote || item.comment}"
                    </p>
                  )}
                  {item.stage && (
                    <p className="text-xs text-gray-400 mt-2">{item.stage}</p>
                  )}
                  {item.platform && (
                    <p className="text-xs text-gray-400 mt-2">{item.platform}</p>
                  )}
                </div>
              ))}
            </div>

            {drilldown.campaigns && drilldown.campaigns.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Active Campaigns
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {drilldown.campaigns.map((campaign, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                      <h3 className="font-medium text-gray-900 mb-1">{campaign.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{campaign.type}</p>
                      <p className="text-sm font-semibold text-indigo-600">{campaign.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No detailed data available for this KPI yet.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-4 right-4">
        <span className="text-xs text-gray-400">port.io</span>
      </footer>
    </div>
  );
};

// Main App with Routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/kpi/:kpiId" element={<KPIDetail />} />
    </Routes>
  );
}

export default App;
