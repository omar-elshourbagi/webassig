"use client"

import { MetricsTable } from "./analytics/metrics-table"
import { SessionsChart } from "./analytics/sessions-chart"
import { ChannelChart } from "./analytics/channel-chart"
import { CountryMap } from "./analytics/country-map"
import { TopCountriesChart } from "./analytics/top-countries-chart"

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-[#0a1628] p-6">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Metrics Table */}
        <MetricsTable />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sessions Line Chart */}
          <SessionsChart />

          {/* Channel Bar Chart */}
          <ChannelChart />

          {/* Country Map */}
          <CountryMap />

          {/* Top Countries Chart */}
          <TopCountriesChart />
        </div>
      </div>
    </div>
  )
}
