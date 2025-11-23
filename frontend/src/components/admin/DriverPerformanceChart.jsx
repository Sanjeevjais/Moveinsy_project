import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function DriverPerformanceChart({ stats, alertThreshold }) {
  const data = (stats || []).map((d) => ({
    name: d.driverName || d.driverUsername || d.driverId,
    avgRating: Number(d.avgRating || 0),
  }));

  return (
    <section className="bg-white rounded-xl shadow p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Driver Performance (Average Rating)
        </h2>
        <span className="text-[11px] text-slate-500">
          Lower bars indicate potential risk drivers
        </span>
      </div>

      <div className="flex-1 min-h-[260px]">
        {data.length === 0 ? (
          <p className="text-xs text-slate-500">
            No driver feedback data available yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
            >
              <XAxis
                dataKey="name"
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
                tick={{ fontSize: 10 }}
              />
              <YAxis domain={[1, 5]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <ReferenceLine
                y={alertThreshold}
                stroke="red"
                strokeDasharray="3 3"
                label={{
                  value: `Threshold ${alertThreshold}`,
                  fontSize: 10,
                  fill: "red",
                }}
              />
              <Bar dataKey="avgRating" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
