"use client"

export function TopCountriesChart() {
  const countries = [
    { name: "United States of America", sessions: 23000, bounceRate: 64, color: "#00d9ff" },
    { name: "India", sessions: 4700, bounceRate: 60, color: "#00d9ff" },
    { name: "United Kingdom", sessions: 3200, bounceRate: 60, color: "#00d9ff" },
    { name: "Canada", sessions: 2300, bounceRate: 72, color: "#00d9ff" },
    { name: "Germany", sessions: 1200, bounceRate: 66, color: "#00d9ff" },
  ]

  const maxSessions = Math.max(...countries.map((c) => c.sessions))

  return (
    <div className="rounded-lg bg-[#0f1f3a] p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Sessions & Bounce Rate - Top 5 Countries</h3>
        <p className="text-sm text-[#8b9bb3]">last 30 days</p>
      </div>
      <div className="space-y-4">
        {countries.map((country, idx) => {
          const sessionWidth = (country.sessions / maxSessions) * 100
          const bounceWidth = (country.sessions / maxSessions) * (country.bounceRate / 100) * 100

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white">{country.name}</span>
              </div>
              <div className="relative h-8">
                {/* Sessions bar (cyan) */}
                <div
                  className="absolute left-0 top-0 h-full rounded bg-[#00d9ff]"
                  style={{ width: `${sessionWidth}%` }}
                >
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">
                    {(country.sessions / 1000).toFixed(1)}k
                  </span>
                </div>
                {/* Bounce rate bar (purple overlay) */}
                <div className="absolute left-0 top-0 h-full rounded bg-[#a855f7]" style={{ width: `${bounceWidth}%` }}>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">
                    {country.bounceRate}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#00d9ff]"></div>
            <span className="text-sm text-[#8b9bb3]">Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#a855f7]"></div>
            <span className="text-sm text-[#8b9bb3]">BounceRate</span>
          </div>
        </div>
      </div>
    </div>
  )
}
