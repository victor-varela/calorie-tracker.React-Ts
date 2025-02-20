import { useEffect } from "react";
import { FormData } from "../types"

type CalorieTrackerProps={
    activities: FormData[]
}

const CalorieTracker = ({activities}: CalorieTrackerProps) => {
    console.log(activities);
    
    const totalConsumed = activities.reduce( (total, activity)=> activity.category=== 1? total + activity.calories: total, 0)
   
    

    
  return (
    <div>CalorieTracker

        <p className="text-white">Calorias Consumidas:{totalConsumed}</p>
    </div>
  )
}

export default CalorieTracker