import { useEffect, useReducer } from "react";
import Form from "./components/Form";
import { formDataReducer, initialState } from "./reducers/formData-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(formDataReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestart = () => state.activities.length > 0;

  return (
    <>
      <header className="bg-lime-600 w-full p-5 flex justify-around">
        <h1 className="font-bold text-white uppercase text-xl">Contador de Calorias</h1>
        <button
          onClick={() => dispatch({ type: "restart-app" })}
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={!canRestart()}
        >
          Reiniciar App
        </button>
      </header>
      <section className="bg-lime-500 py-20">
        {/* contendor "centrador-brocha gorda" que rodea al Componente */}
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      {state.activities.length > 0 ? (
        <>
        <section className="bg-gray-800">
          <div className="mx-auto max-w-4xl">
            <CalorieTracker 
              activities={state.activities}
            />
          </div>

        </section>
        <section className="p-10 mx-auto max-w-4xl">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </section>
        </>
      ) : (
        <h2 className="text-center font-bold text-4xl text-slate-600 p-10">Registra una nueva actividad</h2>
      )}
    </>
  );
}

export default App;

//Los contenedores de presentacion "brocha gorda" se dejan en App.tsx y los estilos de los componentes se hacen en el mismo componente. Este enfoque dicta que si voy a renderizar un componente que esta dentro de un contenedor entonces ese contenedor estilizarlo fuera del componente. Asi el componente es mas "limpio" con los estilos mas personalizados. El div que rodea a Form es un div "centrador- para ubicarlo en el centro del documento solo establece las medidas" el Form tiene en sus estilos la apariencia mas especifica. Entonces, usa los Divs centradores o de maquetacion como en este caso el section solo tiene el color de fondo y se aplica a todo el ancho del documento y la separacion vertical y el div que rodea al Form que ya se dijo su funcion. Se puede decir que hay 2 divs por cada componente, el "grande- Section" y el "centrador" luego viene el componente.

/*UseReducer: al no tener un estado global debemos importar useReducer desde App.tsx y pasar al componente Form lo que necesitamos.
- useReducer se usa asi: const [state, dispatch] = useReducer(funcionReducerCreadaPorMi, initialStateCreadoPorMi)
- Vamos a pasar dispatch por props a Form. En Form creamos el type FormProps como ya hemos visto. Dispatch es de tipo 'FormDataActions' creado por mi. Para definirlo debemos usar generics <> en su type importamos Dispatch de React y en el generics el <FormDataActions>
*/

/*
  LocalStorage: nos servimos del State en APP.tx para setear localStorage ya que al detectar cualquier cambio en el state por medio de un useEffect ya sabemos que debemos actualizar localStorage.
  Inicializamos el storage en el reducer y verificamos si hay algo en el storage lo seteamos y sino lo inicializamos en un array vacio.

  Boton canRestart: la logica es asi: si hay algo en activities (activities.length > 0) entonces Sí se puede reiniciar, es decir, el valor de canRestart (se puede reiniciar) es TRUE. El atributo disabled en el html que dice? disabled={tal cosa}, si el valor de canRestart es true diria disabled= true y aplica los estilos correspondientes a cuando esta deshabilitado (disabled), entonces para que que se apliquen los estilos para NO deshabilitados el valor de canRestart debe ser FALSE. Por eso se NIEGA ! el valor de canREstart, en semantica humana es deshabilitar cuando NO se puede reiniciar--->> disbled={!canRestart()}
*/
