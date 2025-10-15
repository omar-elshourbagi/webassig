"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Register Chart.js components
Chart.register(...registerables)

// MVC Pattern - This is a VIEW component for CPU metrics
export default function CpuChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate initial data (last 20 time points)
    const labels = Array.from({ length: 20 }, (_, i) => `${i * 3}s`)
    const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 40) + 30)

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "CPU Usage (%)",
            data,
            borderColor: "rgb(6, 182, 212)", // cyan-500
            backgroundColor: "rgba(6, 182, 212, 0.1)",
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
            borderColor: "rgb(6, 182, 212)",
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

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (chartInstance.current) {
        const chart = chartInstance.current
        const newValue = Math.floor(Math.random() * 40) + 30

        // Add new data point
        chart.data.labels?.push(`${chart.data.labels.length * 3}s`)
        chart.data.datasets[0].data.push(newValue)

        // Remove old data point (keep only last 20)
        if (chart.data.labels && chart.data.labels.length > 20) {
          chart.data.labels.shift()
          chart.data.datasets[0].data.shift()
        }

        chart.update("none") // Update without animation for smooth real-time feel
      }
    }, 3000)

    return () => {
      clearInterval(interval)
      chartInstance.current?.destroy()
    }
  }, [])

  return <canvas ref={chartRef} className="h-[250px]" />
}
