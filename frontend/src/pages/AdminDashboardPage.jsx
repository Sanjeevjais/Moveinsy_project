import { useEffect, useState } from "react";
import { getDriverStats, getSentimentSummary, getRecentAlerts } from "../api/feedbackApi";
import { fetchConfig } from "../api/configApi";
import SummaryCards from "../components/admin/SummaryCards";
import DriverPerformanceChart from "../components/admin/DriverPerformanceChart";
import LowPerformingDrivers from "../components/admin/LowPerformingDrivers";
import Navbar from "../components/Navbar";
export default function AdminDashboardPage() {
  const [driverStats, setDriverStats] = useState([]);
  const [sentimentSummary, setSentimentSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [config, setConfig] = useState({ alertThreshold: 2.5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, summaryRes, alertsRes, configRes] = await Promise.all([
          getDriverStats(),       // array of per-driver stats
          getSentimentSummary(),  // aggregated sentiment summary
          getRecentAlerts(),      // recent alerts raised
          // fetchConfig()           // { feedbackFlags, alertThreshold }
        ]);

        setDriverStats(statsRes.data || []);
        setSentimentSummary(summaryRes.data || null);
        setAlerts(alertsRes.data || []);
      //  setConfig(configRes.data || { alertThreshold: 2.5 });
      } catch (err) {
        console.error(err);
        setError("Failed to load admin dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (<><Navbar /> 
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Driver Sentiment Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Monitor driver performance, sentiment trends, and alerts in real time.
          </p>
        </div>
        {/* <div className="text-xs text-slate-500">
          <span className="font-medium text-slate-700">Alert threshold:</span>{" "}
          {config.alertThreshold.toFixed ? config.alertThreshold.toFixed(2) : config.alertThreshold}/5
        </div> */}
      </header>

      {/* Top summary cards */}
      <SummaryCards summary={sentimentSummary} alerts={alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver performance graph */}
        <div className="lg:col-span-2">
          <DriverPerformanceChart
            stats={driverStats}
            alertThreshold={config.alertThreshold}
          />
        </div>

        {/* Low performing drivers */}
        <div className="lg:col-span-1">
          <LowPerformingDrivers
            stats={driverStats}
            alertThreshold={config.alertThreshold}
          />
        </div>
      </div>

      {/* Alerts list */}
      <section className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Recent Alerts
          </h2>
          <span className="text-xs text-slate-500">
            Showing last {alerts.length || 0} alerts
          </span>
        </div>

        {alerts.length === 0 ? (
          <p className="text-xs text-slate-500">
            No active alerts. All drivers are above threshold.
          </p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {alerts.map((alert) => (
              <li
                key={alert.id || alert._id}
                className="border border-red-100 bg-red-50 rounded-md px-3 py-2 text-xs"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-red-700">
                    {alert.driverName || "Unknown Driver"}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {alert.createdAt
                      ? new Date(alert.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 mt-1">
                  {alert.reason || "Average sentiment dropped below threshold."}
                </p>
                {alert.avgRating !== undefined && (
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Avg rating:{" "}
                    <span className="font-semibold">
                      {alert.avgRating.toFixed
                        ? alert.avgRating.toFixed(2)
                        : alert.avgRating}
                      /5
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  </>
      
  );
}
