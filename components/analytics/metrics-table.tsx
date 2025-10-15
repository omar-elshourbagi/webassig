import { TrendingUp, TrendingDown } from "lucide-react"

const metrics = [
  {
    period: "Today",
    sessions: { value: "2,568", trend: "up" },
    newUsers: { value: "2,080", trend: "up" },
    bounceRate: { value: "57.4%", trend: "down" },
    avgDuration: { value: "126.5 sec", trend: "up" },
    goal1Compl: { value: "37", trend: "up" },
    goal1CVR: { value: "1.4%", trend: "up" },
  },
  {
    period: "This Week",
    sessions: { value: "10,635", trend: "up" },
    newUsers: { value: "8,576", trend: "up" },
    bounceRate: { value: "61.2%", trend: "up" },
    avgDuration: { value: "128.4 sec", trend: "down" },
    goal1Compl: { value: "209", trend: "down" },
    goal1CVR: { value: "2.0%", trend: "down" },
  },
  {
    period: "This Month",
    sessions: { value: "39,489", trend: "down" },
    newUsers: { value: "31,750", trend: "down" },
    bounceRate: { value: "61.5%", trend: "up" },
    avgDuration: { value: "127.9 sec", trend: "down" },
    goal1Compl: { value: "844", trend: "up" },
    goal1CVR: { value: "2.1%", trend: "up" },
  },
]

export function MetricsTable() {
  return (
    <div className="overflow-x-auto rounded-lg bg-[#0f1f3a] p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1a2f4a]">
            <th className="pb-4 text-left text-sm font-medium text-white"></th>
            <th className="pb-4 text-center text-sm font-medium text-white">Sessions</th>
            <th className="pb-4 text-center text-sm font-medium text-white">New Users</th>
            <th className="pb-4 text-center text-sm font-medium text-white">Bounce Rate</th>
            <th className="pb-4 text-center text-sm font-medium text-white">Avg. Session Duration</th>
            <th className="pb-4 text-center text-sm font-medium text-white">Goal 1 Compl.</th>
            <th className="pb-4 text-center text-sm font-medium text-white">Goal 1 CVR</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((row, idx) => (
            <tr key={idx} className="border-b border-[#1a2f4a] last:border-0">
              <td className="py-4 text-left text-sm font-medium text-white">{row.period}</td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{row.sessions.value}</span>
                  {row.sessions.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#ff006e]" />
                  )}
                </div>
              </td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{row.newUsers.value}</span>
                  {row.newUsers.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#ff006e]" />
                  )}
                </div>
              </td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{row.bounceRate.value}</span>
                  {row.bounceRate.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-[#ff006e]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#00d9ff]" />
                  )}
                </div>
              </td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{row.avgDuration.value}</span>
                  {row.avgDuration.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#ff006e]" />
                  )}
                </div>
              </td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{row.goal1Compl.value}</span>
                  {row.goal1Compl.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#ff006e]" />
                  )}
                </div>
              </td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{row.goal1CVR.value}</span>
                  {row.goal1CVR.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#ff006e]" />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
