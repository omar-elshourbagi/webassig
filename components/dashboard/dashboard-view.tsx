"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Cpu, HardDrive, Network } from "lucide-react"
import MetricsChart from "./metrics-chart"
import MetricCard from "./metric-card"

// This is the VIEW in MVC - handles UI display
export default function DashboardView() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    requests: 0,
  })

  const [cpuHistory, setCpuHistory] = useState<number[]>([])
  const [memoryHistory, setMemoryHistory] = useState<number[]>([])
  const [networkHistory, setNetworkHistory] = useState<number[]>([])
  const [requestsHistory, setRequestsHistory] = useState<number[]>([])

  useEffect(() => {
    // Connect to real-time updates
    const eventSource = new EventSource("/api/metrics")

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)

      // Update current metrics
      setMetrics(data)

      // Update history (keep last 20 data points)
      setCpuHistory((prev) => [...prev.slice(-19), data.cpu])
      setMemoryHistory((prev) => [...prev.slice(-19), data.memory])
      setNetworkHistory((prev) => [...prev.slice(-19), data.network])
      setRequestsHistory((prev) => [...prev.slice(-19), data.requests])
    }

    eventSource.onerror = () => {
      console.log("[v0] Connection error, reconnecting...")
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Real-Time Server Metrics</h1>
          <p className="text-muted-foreground">Live monitoring dashboard with Chart.js visualization</p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="CPU Usage"
            value={`${metrics.cpu.toFixed(1)}%`}
            icon={<Cpu className="h-4 w-4" />}
            trend={metrics.cpu > 70 ? "high" : "normal"}
          />
          <MetricCard
            title="Memory Usage"
            value={`${metrics.memory.toFixed(1)}%`}
            icon={<HardDrive className="h-4 w-4" />}
            trend={metrics.memory > 80 ? "high" : "normal"}
          />
          <MetricCard
            title="Network Traffic"
            value={`${metrics.network.toFixed(0)} MB/s`}
            icon={<Network className="h-4 w-4" />}
            trend="normal"
          />
          <MetricCard
            title="Requests/sec"
            value={metrics.requests.toFixed(0)}
            icon={<Activity className="h-4 w-4" />}
            trend="normal"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <MetricsChart
            title="CPU Usage Over Time"
            description="Real-time CPU utilization percentage"
            data={cpuHistory}
            label="CPU %"
            color="rgb(59, 130, 246)"
            maxValue={100}
          />
          <MetricsChart
            title="Memory Usage Over Time"
            description="Real-time memory utilization percentage"
            data={memoryHistory}
            label="Memory %"
            color="rgb(168, 85, 247)"
            maxValue={100}
          />
          <MetricsChart
            title="Network Traffic"
            description="Real-time network throughput"
            data={networkHistory}
            label="MB/s"
            color="rgb(34, 197, 94)"
            maxValue={Math.max(...networkHistory, 100)}
          />
          <MetricsChart
            title="Request Rate"
            description="Requests per second"
            data={requestsHistory}
            label="Requests"
            color="rgb(251, 146, 60)"
            maxValue={Math.max(...requestsHistory, 100)}
          />
        </div>

        {/* Info Card */}
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-400">📚 Student Project Info</CardTitle>
            <CardDescription className="text-foreground/70">
              This is a demo of Real-Time Dashboards using MVC Architecture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-foreground/80">
            <p>
              <strong className="text-blue-400">Model:</strong> /app/api/metrics/route.ts (generates server metrics
              data)
            </p>
            <p>
              <strong className="text-blue-400">View:</strong> /components/dashboard/* (displays the UI)
            </p>
            <p>
              <strong className="text-blue-400">Controller:</strong> Server-Sent Events (SSE) API endpoint
            </p>
            <p>
              <strong className="text-blue-400">Technology:</strong> Next.js + Chart.js + Server-Sent Events
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
