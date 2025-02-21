import { FormData } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: FormData[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const totalConsumed = activities.reduce(
    (total, activity) => (activity.category === 1 ? total + activity.calories : total),
    0
  );
  const totalBurned = activities.reduce(
    (total, activity) => (activity.category === 2 ? total + activity.calories : total),
    0
  );

  const netCalories = totalConsumed - totalBurned;

  return (
    <div className="p-10 text-center uppercase text-white">
      <h2 className="text-4xl font-black">Resumen de Calorias</h2>
      <div className="flex flex-col items-center md:justify-between mt-10 gap-5 md:flex-row">
        <CalorieDisplay calories={totalConsumed} text="Consumidas" />
        <CalorieDisplay calories={totalBurned} text="Ejercicio" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </div>
  );
};

export default CalorieTracker;
