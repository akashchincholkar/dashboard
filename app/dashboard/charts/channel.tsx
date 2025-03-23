'use client'

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';

interface LocationData {
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
  const [data, setData] = useState<LocationData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/metric/calculate')
      .then(res => res.json())
      .then(res => {
        const locationData = res.data.locationStats;
        setData(locationData);
      })
      .catch(err => console.error('Error fetching location stats:', err));
  }, []);

  if (data.length === 0) return null; // Optional: add loading skeleton later

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="location"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}



