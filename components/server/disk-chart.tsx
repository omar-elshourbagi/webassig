"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// MVC Pattern - VIEW component for Disk metrics (Doughnut Chart)
export default function DiskChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Disk usage breakdown
    const usedSpace = 73 // 73% used
    const freeSpace = 27 // 27% free

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Used Space", "Free Space"],
        datasets: [
          {
            data: [usedSpace, freeSpace],
            backgroundColor: [
              "rgb(236, 72, 153)", // pink-500
              "rgba(156, 163, 175, 0.2)", // gray-400 with opacity
            ],
            borderColor: ["rgb(236, 72, 153)", "rgba(156, 163, 175, 0.5)"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#9ca3af",
              padding: 15,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 31, 58, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgb(236, 72, 153)",
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.parsed || 0
                return `${label}: ${value}%`
              },
            },
          },
        },
      },
    })

    // Update disk usage every 5 seconds
    const interval = setInterval(() => {
      if (chartInstance.current) {
        const chart = chartInstance.current
        const newUsed = Math.floor(Math.random() * 20) + 65 // 65-85%
        const newFree = 100 - newUsed

        chart.data.datasets[0].data = [newUsed, newFree]
        chart.update()
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      chartInstance.current?.destroy()
    }
  }, [])

  return <canvas ref={chartRef} className="max-w-[300px] mx-auto" />
}
