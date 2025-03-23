import mongoose from 'mongoose';


const metricSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    sessions:{
        type:Number,
        required:true,
    },
    activeUsers:{
        type:Number,},

    conversionRate:{
        type:Number,
        required:true,
    },
    revenue:{
        type:Number,
        required:true,
    },
    bounceRate:{
        type:Number,
        required:true,
    },
    avgSessionTime:{
        type:Number,
        required:true,
    },
    
      channelStats: [
        {
            channel: {
                type: String,
                enum: ['organic', 'referral', 'Ads'],
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],

    locationStats: [
        {
            location: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ]
   
},
{timestamps:true},)



metricSchema.index({ createdAt: -1 });

export default mongoose.models.Metric || mongoose.model('Metric',metricSchema);