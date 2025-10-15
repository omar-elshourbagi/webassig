"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CpuChart from "./server/cpu-chart"
import MemoryChart from "./server/memory-chart"
import DiskChart from "./server/disk-chart"
import NetworkChart from "./server/network-chart"
import ActiveUsersChart from "./server/active-users-chart"
import { Activity, Cpu, HardDrive, Network, Users } from "lucide-react"

// MVC Pattern - This is the VIEW component
// It displays the server metrics data

interface ServerMetrics {
  cpu: number
  memory: number
  disk: number
  networkIn: number
  networkOut: number
  activeUsers: number
}

export default function ServerDashboard() {
  // State to hold current server metrics
  const [metrics, setMetrics] = useState<ServerMetrics>({
    cpu: 45,
    memory: 62,
    disk: 73,
    networkIn: 125,
    networkOut: 89,
    activeUsers: 342,
  })

  // Simulate real-time updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 40) + 30, // 30-70%
        memory: Math.floor(Math.random() * 30) + 50, // 50-80%
        disk: Math.floor(Math.random() * 20) + 65, // 65-85%
        networkIn: Math.floor(Math.random() * 100) + 80, // 80-180 MB/s
        networkOut: Math.floor(Math.random() * 80) + 50, // 50-130 MB/s
        activeUsers: Math.floor(Math.random() * 200) + 250, // 250-450 users
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Helper function to get status color based on value
  const getStatusColor = (value: number, threshold: number) => {
    if (value >= threshold) return "text-red-500"
    if (value >= threshold * 0.7) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="min-h-screen bg-[#0a1628] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Server Performance Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Real-time monitoring with Chart.js</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-2 border border-green-500/20">
            <Activity className="h-4 w-4 text-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-500">Server Online</span>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(metrics.cpu, 80)}`}>{metrics.cpu}%</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Memory (RAM)</CardTitle>
              <Activity className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(metrics.memory, 85)}`}>{metrics.memory}%</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Disk Usage</CardTitle>
              <HardDrive className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(metrics.disk, 90)}`}>{metrics.disk}%</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Network In</CardTitle>
              <Network className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{metrics.networkIn}</div>
              <p className="text-xs text-gray-500">MB/s</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Network Out</CardTitle>
              <Network className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{metrics.networkOut}</div>
              <p className="text-xs text-gray-500">MB/s</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{metrics.activeUsers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* CPU Usage Chart */}
          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-cyan-500" />
                CPU Usage Over Time
              </CardTitle>
              <p className="text-sm text-gray-400">Processor utilization percentage</p>
            </CardHeader>
            <CardContent>
              <CpuChart />
            </CardContent>
          </Card>

          {/* Memory Usage Chart */}
          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Memory (RAM) Usage
              </CardTitle>
              <p className="text-sm text-gray-400">RAM consumption over time</p>
            </CardHeader>
            <CardContent>
              <MemoryChart />
            </CardContent>
          </Card>

          {/* Disk Usage Chart */}
          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-pink-500" />
                Disk Storage Usage
              </CardTitle>
              <p className="text-sm text-gray-400">Storage space allocation</p>
            </CardHeader>
            <CardContent className="flex justify-center">
              <DiskChart />
            </CardContent>
          </Card>

          {/* Network Traffic Chart */}
          <Card className="bg-[#0f1f3a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-green-500" />
                Network Traffic
              </CardTitle>
              <p className="text-sm text-gray-400">Incoming and outgoing data</p>
            </CardHeader>
            <CardContent>
              <NetworkChart />
            </CardContent>
          </Card>
        </div>

        {/* Active Users Chart - Full Width */}
        <Card className="bg-[#0f1f3a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Active Users Over Time
            </CardTitle>
            <p className="text-sm text-gray-400">Number of concurrent users on the server</p>
          </CardHeader>
          <CardContent>
            <ActiveUsersChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
