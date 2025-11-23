export default function SummaryCards({ summary, alerts }) {
  const totalFeedbacks = summary?.totalFeedbacks || 0;
  const positive = summary?.positive || 0;
  const neutral = summary?.neutral || 0;
  const negative = summary?.negative || 0;
  const avgRating =
    summary && summary.avgRating !== undefined
      ? Number(summary.avgRating).toFixed(2)
      : "N/A";

  const activeAlerts = alerts?.length || 0;

  const cards = [
    {
      title: "Total Feedback",
      value: totalFeedbacks,
      subtitle: "All feedback entries processed",
    },
    {
      title: "Avg Sentiment Score",
      value: avgRating,
      subtitle: "Weighted across all drivers",
    },
    {
      title: "Positive / Neutral / Negative",
      value: `${positive}/${neutral}/${negative}`,
      subtitle: "Feedback sentiment distribution",
    },
    {
      title: "Active Alerts",
      value: activeAlerts,
      subtitle: "Drivers below sentiment threshold",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-4 flex flex-col gap-1"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {card.title}
          </p>
          <p className="text-2xl font-semibold text-slate-800">
            {card.value}
          </p>
          <p className="text-xs text-slate-500">{card.subtitle}</p>
        </div>
      ))}
    </section>
  );
}
