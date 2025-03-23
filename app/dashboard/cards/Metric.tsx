'use client'

import React from 'react'
import { MetricCard } from '@/components/metricCard'
import { useEffect,useState } from 'react'


export const Metric = () => {
const [data,setdata]=useState<any>(null)
 
useEffect(()=>{
    fetch('http://localhost:3000/api/metric/calculate')
    .then(res=>res.json())
    .then(data=>setdata(data.data))
    .catch(err=>console.log(err))
},[])

if(!data) return null
  return (
    
        <div className= "flex flex-row justify-around  gap-4 ">
                <MetricCard title= "Active users" value= {data.activeUsers}/>
                <MetricCard title= "Sessions" value= {data.sessions}/>
                <MetricCard title= "revenue" value= {data.revenue}/>
                <MetricCard title = "Bounce Rate" value = {`${data.bounceRate.toFixed(2)}%`}/>
                <MetricCard title = "Conversion Rate" value ={ `${data.conversionRate}%`}/>
            </div>


  )
}
