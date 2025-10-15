import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string
  icon: ReactNode
  trend: "high" | "normal"
}

export default function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card className={trend === "high" ? "border-destructive/50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${trend === "high" ? "text-destructive" : ""}`}>{value}</div>
      </CardContent>
    </Card>
  )
}
