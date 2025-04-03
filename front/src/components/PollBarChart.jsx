// components/PollBarChart.js
import { emphasize } from '@mui/material/styles'
import React from 'react'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartColors } from '../constants/charColors'

export default function PollBarChart({ options, hoveredIndex }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={options}
        barSize={30}
        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 14 }}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 14 }}
        />
        <Tooltip
          contentStyle={{ borderRadius: 10, fontSize: 13 }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
        />
        <Bar radius={[6, 6, 0, 0]} dataKey="votes">
          {options.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                index === hoveredIndex
                  ? emphasize(chartColors[index % chartColors.length], 0.2)
                  : chartColors[index % chartColors.length]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
