import { FormData } from "../types";

type ActivityListProps = {
  activities: FormData[];
};

const ActivityList = ({ activities }: ActivityListProps) => {
  console.log(activities);

  return (
    <>
      <h2 className="text-center font-bold text-4xl text-slate-600">Comida y Actividades</h2>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
          <div className="space-y-1 relative">
            <p>{activity.category}</p>
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
