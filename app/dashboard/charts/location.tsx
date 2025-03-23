'use client'

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';

interface ChannelData {
  location: string;
  count: number;
}

const chartConfig = {
  count: {
    label: 'Users',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export default function ChannelStatsChart() {
  const [data, setData] = useState<ChannelData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/metric/calculate')
      .then(res => res.json())
      .then(res => {
        const channelData = res.data.channelStats;
        setData(channelData);
      })
      .catch(err => console.error('Error fetching channel stats:', err));
  }, []);

  if (data.length === 0) return null;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="channel"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
