"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, registerables } from "chart.js"

// Register Chart.js components
Chart.register(...registerables)

interface MetricsChartProps {
  title: string
  description: string
  data: number[]
  label: string
  color: string
  maxValue: number
}

export default function MetricsChart({ title, description, data, label, color, maxValue }: MetricsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, i) => ""),
        datasets: [
          {
            label,
            data,
            borderColor: color,
            backgroundColor: color.replace("rgb", "rgba").replace(")", ", 0.1)"),
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
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
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: true,
            max: maxValue,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, label, color, maxValue])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <canvas ref={canvasRef} />
        </div>
      </CardContent>
    </Card>
  )
}
