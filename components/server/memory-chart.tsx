"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// MVC Pattern - VIEW component for Memory metrics
export default function MemoryChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = Array.from({ length: 20 }, (_, i) => `${i * 3}s`)
    const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 50)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Memory Usage (%)",
            data,
            borderColor: "rgb(168, 85, 247)", // purple-500
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
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
            borderColor: "rgb(168, 85, 247)",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: "#9ca3af",
              callback: (value) => `${value}%`,
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
        const newValue = Math.floor(Math.random() * 30) + 50

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

  return <canvas ref={chartRef} className="h-[250px]" />
}
