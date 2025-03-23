import { NextResponse } from 'next/server';
import { mongoconnect } from '@/lib/connection/mogoconnect';
import User from '@/model/user';
import Metric from '@/model/metric';

type StatItem = {
  _id: string;
  count: number;
};

export async function GET() {
    await mongoconnect();
 try{
    const now = new Date();
    const ThirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const result = await User.aggregate([
        {
            $match: {
                sessionStart: {
                    $gte: ThirtyDaysAgo,
                    $lte: now
                }
            }

        },
        {
            $facet: {
                totalSessions: [{ $count: "count" }],

                activeUsers: [{
                    $group: {
                        _id: '$userId'
                    },

                },
                { $count: 'count' }
                ],

                avgSessionTime: [{
                    $group: {
                        _id: null,
                        avgTime: { $avg: '$sessionDuration' }
                    }
                }],
                totalRevenue: [{
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$revenue' }
                    }
                }],
                bounceRate: [
                    {
                        $match: {
                            sessionDuration: { $lt: 10 },

                        }
                    },
                    { $count: 'bounced' }
                ],
                channelStats: [{
                    $group: {
                        _id: '$channel',
                        count: { $count: {} }
                    }
                }],
                locationStats: [{
                    $group: {
                        _id: '$location',
                        count: { $count: {} }
                    }
                }]



            }
        }
    ])

const data =result[0];

const sessions = data.totalSessions[0]?.count || 0;
const users = data.activeUsers[0]?.count || 0;
const avgTime = data.avgSessionTime[0]?.avgTime || 0;
const revenue = data.totalRevenue[0]?.totalRevenue || 0;
const bounced = data.bounceRate[0]?.bounced || 0;
const bounceRate= sessions? (bounced/sessions)*100:0;
const channel = data.channelStats.map((item: StatItem) => ({
  channel: item._id,
  count: item.count,
}));

const location= data.locationStats.map((item: StatItem) => ({
  location: item._id,
  count: item.count,
}));

  

console.log("bounced value",bounced);
const metricEntry= new Metric({
    date:now,
    sessions,
    activeUsers:users,
    revenue,
    bounceRate,
    conversionRate:0.5,
    avgSessionTime:avgTime,
    channelStats:channel,
    locationStats:location,

});

await metricEntry.save();
console.log(metricEntry);

const latestMetric = await Metric.findOne().sort({ createdAt: -1 });

return NextResponse.json({
  message: "Metric updated",
  data: latestMetric
});

     
 }
 catch(err){
    console.error(err);
    return NextResponse.json({message:'Error in calculating metric'})
 }

}