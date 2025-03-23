// import {
//     Card,
//     CardContent,
//   } from "@/components/ui/card"
  
//   interface MetricCardProps {
//     title: string,
//     value: number,
//   }
  
//   export function MetricCard({title, value}: MetricCardProps) {
//     return (
//       <div className="rounded-xl shadow-lg w-64 h-20">
//         <Card className="rounded-xl h-full ">
//           <CardContent className="flex justify-center">
//             <h3 className="text-sm text-muted-foreground ml-1.5">{title}</h3>
//             <p className="flex justify-center items-center">{value}</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }
  
import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface MetricCardProps {
  title: string,
  value: number,
}

export function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="rounded-xl shadow-lg w-64 h-20">
      <Card className="rounded-xl h-full">
        <CardContent className="flex flex-col justify-center items-center h-full">
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </div>
  );
}
