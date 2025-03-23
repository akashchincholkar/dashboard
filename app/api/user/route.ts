import User from '@/model/user';
import { mongoconnect } from '@/lib/connection/mogoconnect';
import { NextResponse } from 'next/server';

export async function POST(req:Request){

    await mongoconnect();
    try{
   const body = await req.json();
   const newUser =await new User({
    userId:body.userId,
    sessionStart:body.sessionStart,
    sessionEnd:body.sessionEnd,
    sessionDuration:body.sessionDuration,
    channel:body.channel,
    location:body.location,
    revenue:body.revenue,
   });
    await newUser.save();

    return NextResponse.json({message:"User added successfully"});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Error in adding user"});
    }

}