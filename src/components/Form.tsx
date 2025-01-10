import { categories } from "../data/data";
const Form = () => {
  return (
    <div className="bg-lime-500 py-20">
      <form className="max-w-4xl bg-white mx-auto border rounded-lg shadow p-8 space-y-3">
        <div className="flex flex-col gap-3">
          <label htmlFor="category" className="font-bold" id="categories">
            Categoria:
          </label>
          <select className="border rounded-lg border-slate-300 bg-white w-full p-2" name="categories" id="category">
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="activity" className="font-bold">Actividad:</label>
          <input
            type="text"
            className="border rounded-lg border-slate-300 bg-white w-full p-2 "
            name="activity"
            id="activity"
            placeholder="Ej. Pesas, Yoga, Trote"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="calories" className="font-bold">Calorias:</label>
          <input
            type="number"
            className="border rounded-lg border-slate-300 bg-white w-full p-2 pl-2"
            name="calories"
            id="calories"
            placeholder="Ej. 200, 300"
          />
        </div>
        <input 
          type="submit"
          value="Guardar Comida o Guardar ejercicio"
          className="w-full bg-gray-800 hover:bg-gray-900 font-bold text-white uppercase rounded p-2 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Form;
