"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function ChannelChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Organic\nSearch", "Direct\nSearch", "Paid\nSearch", "Social", "Referral", "Email"],
        datasets: [
          {
            label: "Sessions",
            data: [13000, 9000, 5900, 5000, 4000, 2000],
            backgroundColor: "#00d9ff",
            borderRadius: 4,
          },
          {
            label: "BounceRate",
            data: [7200, 4900, 5900, 7100, 5400, 6200],
            backgroundColor: "#a855f7",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            callbacks: {
              afterLabel: (context) => {
                const datasetIndex = context.datasetIndex
                const dataIndex = context.dataIndex
                const percentages = [
                  [72, 69, 59, 71, 54, 62],
                  [72, 69, 59, 71, 54, 62],
                ]
                return datasetIndex === 1 ? `${percentages[datasetIndex][dataIndex]}%` : ""
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#8b9bb3",
            },
          },
          y: {
            grid: {
              color: "#1a2f4a",
            },
            ticks: {
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
        <h3 className="text-lg font-semibold text-white">Sessions & Bounce Rate by Channel</h3>
        <p className="text-sm text-[#8b9bb3]">last 30 days</p>
      </div>
      <div className="h-[300px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
