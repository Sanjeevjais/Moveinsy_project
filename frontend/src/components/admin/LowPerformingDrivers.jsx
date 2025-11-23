export default function LowPerformingDrivers({ stats, alertThreshold }) {
  const lowDrivers = (stats || []).filter(
    (d) => Number(d.avgRating || 0) < alertThreshold
  );

  return (
    <section className="bg-white rounded-xl shadow p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Low-performing Drivers
        </h2>
        <span className="text-[11px] text-slate-500">
          Below {alertThreshold.toFixed ? alertThreshold.toFixed(2) : alertThreshold}/5
        </span>
      </div>

      {lowDrivers.length === 0 ? (
        <p className="text-xs text-slate-500">
          No drivers below sentiment threshold. 🎉
        </p>
      ) : (
        <div className="max-h-[320px] overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-3 py-2 font-medium">Driver</th>
                <th className="px-3 py-2 font-medium text-right">Avg Rating</th>
                <th className="px-3 py-2 font-medium text-right">Feedbacks</th>
                <th className="px-3 py-2 font-medium">Last Feedback</th>
              </tr>
            </thead>
            <tbody>
              {lowDrivers.map((d) => (
                <tr
                  key={d.driverId}
                  className="border-b border-slate-100 hover:bg-red-50/60"
                >
                  <td className="px-3 py-2">
                    <p className="font-medium text-slate-800">
                      {d.driverName || d.driverUsername || "Unknown Driver"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {d.driverId}
                    </p>
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-red-600">
                    {Number(d.avgRating || 0).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {d.totalFeedbacks || 0}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-slate-500">
                    {d.lastFeedbackAt
                      ? new Date(d.lastFeedbackAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
