import { useState } from "react";
import { categories } from "../data/data";

const Form = () => {
  const [formData, setFormData] = useState({
    category: 1,
    name: "",
    calories: 0,
  });

  //Los type de e lo sacamos de Vs Code y usamos un pipe | para indicar que puede ser o tipo SelectElement o InputElement
  const handelChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form className="max-w-4xl bg-white mx-auto border rounded-lg shadow p-8 space-y-3">
      <div className="flex flex-col gap-3">
        <label htmlFor="category" className="font-bold" id="categories">
          Categoria:
        </label>
        <select
          className="border rounded-lg border-slate-300 bg-white w-full p-2"
          id="category"
          value={formData.category}
          onChange={handelChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          className="border rounded-lg border-slate-300 bg-white w-full p-2 "
          id="name"
          placeholder="Ej. Pesas, Yoga, Trote"
          value={formData.name}
          onChange={handelChange}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          className="border rounded-lg border-slate-300 bg-white w-full p-2 pl-2"
          id="calories"
          placeholder="Ej. 200, 300"
          value={formData.calories}
          onChange={handelChange}
        />
      </div>
      <input
        type="submit"
        value="Guardar Comida o Guardar ejercicio"
        className="w-full bg-gray-800 hover:bg-gray-900 font-bold text-white uppercase rounded p-2 cursor-pointer"
      />
    </form>
  );
};

export default Form;

// Este componente Form retorna un Form element---> esta bien, es mas coherente.
// Repaso de Html. Form, los lables deben tener el htmlFor atributte con el mismo nombre que el Id del input para que esten asociados
// Vieja leccion de FORM.. los input deben tener el htmlfor=id === atributo id del input. Y name igual para todos y value DIFERENTE. Los valores de un FORM se leen con e => e.target.value y por medio de onChange. Otra leccion: para que ts tome el type de value se agrega sigo + antes de e porque por default los value son strings y lo estamos declarando como number. OTRA VEZ!!

// OJO: segun la forma de trabajo del profesor me doy cuenta que los estilos de "ubicacion" ej: width, height, margin auto, flex, los declara en el contenedor de presentacion. Digamos en los "contenedores de brocha gorda" los que solo ubican el componente en el documento y los estilos "finos, de brocha fina" ej: bg-color, text, border, shadow, rounden los declara en el Componente mismo.

//El State: el state de este componente por ser un formulario conviene que sea un OBJETO. si, Js, Ts es todo un OBJETO! por que conviene por ser un formulario? porque los formularios sus campos estan RELACIONADOS entonces toda la data de un formulario es un OBJETO.  Como llamar a este STATE? veamos, es un formulario que guarda 2 cosas (categorias) actividad o comida. Se puede llamar Formdata (nombre bien generico), activityEntry, inputValues, etc.. las nombres de las propiedades de ese objeto son los nombres de los campos del formulario tal cual estan en sus labels-

//Para sincronizar el state con el formulario debemos tener el VALUE (es el que va a tener el valor de ese input) Y ONCHANGE

//La tecnica de la ABUELA para sincronizar inputs a un state OBJETO: los Ids de cada input deben ser IGUALES a las KEYS del objeto State. Se usa la sintaxis de corchetes y se crea una copia del objeto antes de la actualizacion.
