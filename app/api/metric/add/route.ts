import {NextResponse} from 'next/server';
import Metric from '@/model/metric';
import { mongoconnect } from '@/lib/connection/mogoconnect';
import { error } from 'console';


export async  function POST(req:Request){
    try{
    await mongoconnect();

    const body= await req.json();

    const newmetric= await new Metric({
        date:body.date,
        sessions:body.sessions,
        activeUsers:body.activeUsers,
        conversionRate:body.conversionRate,
        revenue:body.revenue,
        bounceRate:body.bounceRate,
        avgSessionTime:body.avgSessionTime,
        channel:body.channel,
        location:body.location
    })
    await newmetric.save();
    console.log(newmetric);
    return NextResponse.json({message:"Metric added successfully"});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Error in adding metric"});
    }


};