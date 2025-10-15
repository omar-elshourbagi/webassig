"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// MVC Pattern - VIEW component for Active Users metrics
export default function ActiveUsersChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = Array.from({ length: 20 }, (_, i) => `${i * 3}s`)
    const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 200) + 250)

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Active Users",
            data,
            backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 31, 58, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 1,
            callbacks: {
              label: (context) => `Users: ${context.parsed.y}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#9ca3af",
            },
            grid: {
              color: "rgba(156, 163, 175, 0.1)",
            },
          },
          x: {
            ticks: {
              color: "#9ca3af",
            },
            grid: {
              color: "rgba(156, 163, 175, 0.1)",
            },
          },
        },
      },
    })

    const interval = setInterval(() => {
      if (chartInstance.current) {
        const chart = chartInstance.current
        const newValue = Math.floor(Math.random() * 200) + 250

        chart.data.labels?.push(`${chart.data.labels.length * 3}s`)
        chart.data.datasets[0].data.push(newValue)

        if (chart.data.labels && chart.data.labels.length > 20) {
          chart.data.labels.shift()
          chart.data.datasets[0].data.shift()
        }

        chart.update("none")
      }
    }, 3000)

    return () => {
      clearInterval(interval)
      chartInstance.current?.destroy()
    }
  }, [])

  return <canvas ref={chartRef} className="h-[300px]" />
}
