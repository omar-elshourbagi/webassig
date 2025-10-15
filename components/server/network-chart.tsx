"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// MVC Pattern - VIEW component for Network Traffic metrics
export default function NetworkChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = Array.from({ length: 20 }, (_, i) => `${i * 3}s`)
    const incomingData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 80)
    const outgoingData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 50)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Incoming (MB/s)",
            data: incomingData,
            borderColor: "rgb(34, 197, 94)", // green-500
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: "Outgoing (MB/s)",
            data: outgoingData,
            borderColor: "rgb(249, 115, 22)", // orange-500
            backgroundColor: "rgba(249, 115, 22, 0.1)",
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
            display: true,
            position: "top",
            labels: {
              color: "#9ca3af",
              usePointStyle: true,
              padding: 15,
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 31, 58, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#9ca3af",
              callback: (value) => `${value} MB/s`,
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
        const newIncoming = Math.floor(Math.random() * 100) + 80
        const newOutgoing = Math.floor(Math.random() * 80) + 50

        chart.data.labels?.push(`${chart.data.labels.length * 3}s`)
        chart.data.datasets[0].data.push(newIncoming)
        chart.data.datasets[1].data.push(newOutgoing)

        if (chart.data.labels && chart.data.labels.length > 20) {
          chart.data.labels.shift()
          chart.data.datasets[0].data.shift()
          chart.data.datasets[1].data.shift()
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
