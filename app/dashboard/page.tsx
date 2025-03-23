import React from 'react';
import QuickContent from './cards/QuickContent';
import { Metric } from './cards/Metric';
import LocationStatsChart from './charts/channel';
import ChannelStatsChart from './charts/location';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-black flex items-center justify-center py-10">
        <h1 className="text-amber-100 font-sans text-xl h-20 flex items-center">
          Dashboard
        </h1>
      </div>

      {/* Main content container */}
      <div className="flex-1 p-4 flex flex-col gap-8">
        {/* Today Badge */}
        <div className="border-4 border-amber-100 self-start">
          <div className="h-10 w-32 bg-black text-amber-50 flex items-center justify-center font-sans text-lg">
            Today
          </div>
        </div>

        {/* QuickContent Section */}
        <QuickContent />

        {/* Metric Cards */}
        <div className="mt-6">
          <Metric />
        </div>
        <div className="border-4 border-amber-100 self-start">
        <div className="flex justify-center items-center bg-black text-amber-50 h-10 w-48 font-sans text-lg">
          Number of users
        </div>
        </div>

        {/* Charts Container */}
        <div className="flex flex-row justify-around mt-auto">  {/* Changed to flex-row */}
          <div className="w-64 h-64">
            <LocationStatsChart />
          </div>
          <div className="w-64 h-64">  {/* Added second container */}
            <ChannelStatsChart />
          </div>
        </div>
      </div>
    </div>
  );
}
