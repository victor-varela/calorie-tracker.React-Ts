import { Dispatch, useMemo } from "react";
import { FormData } from "../types";
import { categories } from "../data/data";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { formDataActions } from "../reducers/formData-reducer";

type ActivityListProps = {
  activities: FormData[];
  dispatch : Dispatch<formDataActions>
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  //Funcion helper para obtener el Name de categoria. UseMemo tiene el callback de la funcion y el callback creado por mi. Primero escribi const categoryName = (..... etc) y luego lo encerre en el useMemo con el array de dependencia activities
  const categoryName = useMemo(
    () => (category: FormData["category"]) => categories.map(cat => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const getCategoryColor = (cat: FormData["category"]) => {
    if (cat === 1) {
      return "bg-lime-500";
    }
    if (cat === 2) {
      return "bg-orange-500";
    } else {
      return "bg-gray-200";
    }
  };

  const handleEdition = (id: FormData['id'])=>{
    dispatch({type:'set-activeId', payload:{id: id}})
  }

  return (
    <>
      <h2 className="text-center font-bold text-4xl text-slate-600">Comida y Actividades</h2>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
          <div className="space-y-1 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 font-bold text-white uppercase ${getCategoryColor(
                activity.category
              )}`}
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

          <div className="flex gap-5 items-center">
            <button
              onClick={()=>handleEdition(activity.id)}
            >
              <PencilSquareIcon className='size-8 text-gray-800' />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
