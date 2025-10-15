"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function SessionsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Generate dates for last 30 days
    const dates = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push(date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }))
    }

    // Mock data
    const sessionsData = [
      800, 1600, 1400, 1200, 1500, 1800, 1300, 1100, 1400, 1700, 1500, 1300, 1600, 1900, 1200, 1000, 1300, 1600, 1400,
      1200, 1500, 1800, 1600, 1400, 1700, 2000, 1800, 1600, 1900, 1000,
    ]
    const newUsersData = [
      700, 1400, 1200, 1000, 1300, 1600, 1100, 900, 1200, 1500, 1300, 1100, 1400, 1700, 1000, 800, 1100, 1400, 1200,
      1000, 1300, 1600, 1400, 1200, 1500, 1800, 1600, 1400, 1700, 900,
    ]
    const avgDurationData = [
      120, 125, 128, 122, 126, 130, 124, 121, 127, 132, 128, 125, 129, 134, 123, 120, 126, 131, 127, 124, 128, 133, 130,
      127, 131, 135, 132, 129, 133, 125,
    ]

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Sessions",
            data: sessionsData,
            borderColor: "#00d9ff",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "New Users",
            data: newUsersData,
            borderColor: "#ff006e",
            backgroundColor: "rgba(255, 0, 110, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Avg Session Duration",
            data: avgDurationData,
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: "#ffffff",
              usePointStyle: true,
              padding: 15,
            },
          },
          tooltip: {
            backgroundColor: "#1a2f4a",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#00d9ff",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: {
              color: "#1a2f4a",
            },
            ticks: {
              color: "#8b9bb3",
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            type: "linear",
            position: "left",
            grid: {
              color: "#1a2f4a",
            },
            ticks: {
              color: "#8b9bb3",
            },
            title: {
              display: true,
              text: "Sessions | New Users",
              color: "#8b9bb3",
            },
          },
          y1: {
            type: "linear",
            position: "right",
            grid: {
              display: false,
            },
            ticks: {
              color: "#8b9bb3",
            },
            title: {
              display: true,
              text: "Avg Session Duration (sec)",
              color: "#8b9bb3",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="rounded-lg bg-[#0f1f3a] p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Sessions, Avg Session Duration (in sec) & New Users</h3>
        <p className="text-sm text-[#8b9bb3]">last 30 days</p>
      </div>
      <div className="h-[300px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
