import { MetricCard } from '@/components/metricCard'

export default function QuickContent(){
    return(
        <div className= "flex flex-row justify-around  gap-4 ">
            <MetricCard title= "ENGAGEMENT" value= {23}/>
            <MetricCard title= "AI ACCURACY" value= {18}/>
            <MetricCard title= "POSITIVE MOOD" value= {14}/>
        </div>
        
    )
}