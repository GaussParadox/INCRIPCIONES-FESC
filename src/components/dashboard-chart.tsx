"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DashboardChartProps {
  data: {
    programa: string;
    total: number;
  }[];
}

export function DashboardChart({ data }: DashboardChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[350px] w-full bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <XAxis dataKey="programa" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} angle={-35} textAnchor="end" interval={0} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            formatter={(value: number) => [value, "Inscritos"]}
            contentStyle={{
              backgroundColor: "#ffffffff",
              borderColor: "#000000",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "#000000" }}
            itemStyle={{ color: "#000000" }}
          />

          <Bar dataKey="total" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
