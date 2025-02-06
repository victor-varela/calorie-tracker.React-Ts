import { Dispatch, useState } from "react";
import { v4 as uuidv4 } from "uuid"; //dependencia para Ids
import { categories } from "../data/data";
import type { FormData } from "../types";
import { formDataActions } from "../reducers/formData-reducer";

type FormProps = {
  dispatch: Dispatch<formDataActions>;
};

const initialState: FormData = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

const Form = ({ dispatch }: FormProps) => {
  const [formData, setFormData] = useState<FormData>(initialState);

  //Los type de e lo sacamos de Vs Code y usamos un pipe | para indicar que puede ser o tipo SelectElement o InputElement
  const handelChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setFormData({
      ...formData,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  //ESta funcion devuelve true cuando cumple la condicion*
  const isValidForm = () => {
    const { name, calories } = formData;

    return name.trim() !== "" && calories > 0;
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Usamos la funcion dispatch

    dispatch({ type: "save-activity", payload: { newActivity: formData } });
    setFormData({
      ...initialState,
      id: uuidv4()
    });
  };

  return (
    <form className="max-w-4xl bg-white mx-auto border rounded-lg shadow p-8 space-y-3" onSubmit={handelSubmit}>
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
          {formData.category === 1 ? "Comida:" : "Actividad:"}
        </label>
        <input
          type="text"
          className="border rounded-lg border-slate-300 bg-white w-full p-2 "
          id="name"
          placeholder={formData.category === 1 ? "Ej. Asado, Ensalada, Manzana" : "Ej. Yoga, Pesas, Trote"}
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
        value={`guardar  ${formData.category === 1 ? "comida" : "ejercicio"}  `}
        className="w-full bg-gray-800 hover:bg-gray-900 font-bold text-white uppercase rounded p-2 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
        disabled={!isValidForm()}
      />
    </form>
  );
};

export default Form;

// Este componente Form retorna un Form element---> esta bien, es mas coherente.
// Repaso de Html. Form, los lables deben tener el htmlFor atributte con el mismo nombre que el Id del input para que esten asociados
// Vieja leccion de FORM.. los input deben tener el htmlfor=id === atributo id del input. Y name igual para todos y value DIFERENTE. Los valores de un FORM se leen con e => e.target.value y por medio de onChange. Otra leccion: para que ts tome el type de value se agrega signo + antes de e porque por default los value son strings y lo estamos declarando como number. OTRA VEZ!!

// OJO: segun la forma de trabajo del profesor me doy cuenta que los estilos de "ubicacion" ej: width, height, margin auto, flex, los declara en el contenedor de presentacion. Digamos en los "contenedores de brocha gorda" los que solo ubican el componente en el documento y los estilos "finos, de brocha fina" ej: bg-color, text, border, shadow, rounded los declara en el Componente mismo.

//El State: el state de este componente por ser un formulario conviene que sea un OBJETO. si, Js, Ts es todo un OBJETO! por que conviene por ser un formulario? porque en los formularios sus campos estan RELACIONADOS entonces toda la data de un formulario es un OBJETO.  Como nombrar a este STATE? veamos, es un formulario que guarda 2 cosas (categorias) actividad o comida. Se puede llamar Formdata (nombre bien generico), activityEntry, inputValues, etc.. las nombres de las propiedades de ese objeto son los nombres de los campos del formulario tal cual estan en sus labels-

//Para sincronizar el state con el formulario debemos tener el VALUE (es el que va a tener el valor de ese input) Y ONCHANGE

//La tecnica de la ABUELA para sincronizar inputs a un state OBJETO: los nombres de los Ids de cada input deben ser IGUALES a las KEYS del objeto State. Se usa la sintaxis de corchetes y se crea una copia del objeto antes de la actualizacion.

//Tenemos en nuestro State propiedades con diferentes tipos de dato. category y calories son number y activity es string. Tenemos que respetar la integridad de esos tipos y en un Form por ser Form, los campos se guardan como string. Ya lo vimos en vieja leccion de Form mas arriba. Entonces, ANTES de guardar los campos en el state tenemos que: 1- Identificar si el campo donde esta el usuario es de tipo number. Si es asi, entonces el dato lo guardamos con la tecnica de signo de + antes de la instruccion. Si no esta en el campo number entonces se guarda asi nomas. En el codigo eso es lo que hace la funcion isNumberField --> nos dice si esta en ese campo el usuario. Como sabemos? por el id del input.Piensa en un arreglo como una lista y en .includes(valor) como preguntar:"¿Esta lista tiene este objeto específico?"

//Funciones logicas del componente: const isNumberField = ["category", "calories"].includes(e.target.id)---> esta funcion devuelve true o false porque nos servimos del metodo includes. La funcion isValidForm TAMBIEN devuelve true o false porque nos servimos del return y la condicion.

//Cuando almacenamos datos (basicamente states) debemos poder enonctrarlos facilmente y para eso usamos IDs. Los states son objetos, por ello creamos la propiedad id en cada nuevo objeto. UUID es una dependencia para crear Ids. Existe la API de Js crypto.randomUUID() para crear Ids nativos
