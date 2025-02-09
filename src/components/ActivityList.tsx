import { FormData } from "../types";
import { categories } from "../data/data";
import { useMemo } from "react";

type ActivityListProps = {
  activities: FormData[];
};

const ActivityList = ({ activities }: ActivityListProps) => {
  //Funcion helper para obtener el Name de categoria. UseMemo tiene el callback de la funcion y el callback creado por mi. Primero escribi const categoryName = (..... etc) y luego lo encerre en el useMemo con el array de dependencia activities
  const categoryName = useMemo(
    () => (category: FormData["category"]) => categories.map(cat => (cat.id === category ? cat.name : "")),
    [activities]
  );

  return (
    <>
      <h2 className="text-center font-bold text-4xl text-slate-600">Comida y Actividades</h2>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
          <div className="space-y-1 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 font-bold text-white uppercase ${categoryName(activity.category)[0] ===''?'bg-orange-500': 'bg-lime-500'}`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              <span>
                {activity.calories} {""}Calorias
              </span>
            </p>
          </div>

          <div></div>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
