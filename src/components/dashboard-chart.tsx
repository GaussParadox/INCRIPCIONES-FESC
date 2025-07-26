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

  const chartHeight = Math.max(data.length * 70, 350);

  return (
    <div style={{ height: chartHeight, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 30, right: 10, left: 30, bottom: 20 }}
          barCategoryGap={10}
        >
          <XAxis
            type="number"
            orientation="top"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="programa"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={150}
          />
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <Tooltip
            formatter={(value: number) => [value, "Inscritos"]}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#000000",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "#000000" }}
            itemStyle={{ color: "#000000" }}
          />
          <Bar dataKey="total" fill="#EF4444" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

