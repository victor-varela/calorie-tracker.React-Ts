import { FormData } from "../types";

//Definimos los Type conforme vamos creando variables y funciones:

//InicialState debe tener tambien asignado un type. Ese state sera un array de objetos. Los objetos  son todas las interacciones del usuario que va a ir creando ya sea "comida" o "ejercicio" por eso el type es un array tambien. Es el mismo type que FormData que ya definimos en type. Entonces lo traemos a este componente.

/*Este paso previo o de preparacion es como una cascada de types

Este código define tipos en TypeScript utilizando una estructura en cascada. Veamos cómo funciona este patrón:

🌊 Cascada de Tipos en TypeScript
El concepto de cascada de tipos en este código significa que cada tipo se basa en otro previamente definido, creando una cadena de dependencias. Es como construir un edificio donde cada piso se apoya en el anterior.

🔹 Nivel 1: Tipo Base (FormData)
import { FormData } from "../types"

Aquí se importa un tipo llamado FormData desde otro archivo.
FormData es la base sobre la que se construyen los demás tipos.

🔹 Nivel 2: Tipo Intermedio (formDataState)

type formDataState = {
    activities: FormData[]
}
Se define un nuevo tipo formDataState.
formDataState tiene una propiedad activities, que es un array de FormData.
Conexión en la cascada: formDataState depende de FormData.

🔹 Nivel 3: Valor Inicial (initialSate)

export const initialSate: formDataState = {
    activities: []
}
Se declara una constante initialSate con el tipo formDataState.
La propiedad activities inicia como un array vacío ([]).
Conexión en la cascada: initialSate depende de formDataState, que a su vez depende de FormData.

🏗 Resumen Visual de la Cascada
1️⃣ FormData (tipo base) ➝
2️⃣ formDataState (usa FormData[]) ➝
3️⃣ initialSate (usa formDataState)

Cada nivel se apoya en el anterior, formando una cascada de tipos.
Esto hace que el código sea modular y fácil de extender sin repetir definiciones.

*EN RESUMEN: para crear el reducer como tal necesitamos 3 pasos como se ve mas adelante: 
1- Definir el estado inicial
2- Definir las acciones
3- Crear la funcion reducer.
Para cumplir el paso 1 y 'hacer feliz a typescript' debemos definir el Type de ese estado inicial, y para ello es que debemos definir los OTROS TYPES ASOCIADOS en cascada. Piensa que cuando arranacas el codigo te vas a encontrar con que inicialState debe tener un Type y eso te va a llevar o te va a obligar a crear los otros types. 
Como lo haces?: bueno inicialState debe tener un type. Por convencion es nombreState. 
En este caso.. que estructura de dato tiene el estado inicial de la app?: es un arreglo de 'actividades' mas genericamente de 'interacciones' y ese arreglo INICIA (initialState) vacio []. AJA, ya sabes que es un array de 'actividades'... pero si lo declaras asi nomas typescript va a 'chillar' dice: ¿de que type son las actividades? (en este caso lo infiere como never y es un error) entonces debes crear ese type. De que type son? bueno formData y un array vacio. 
Luego los formDataActions son mas descriptivos.


*/

export type formDataState = {
  activities: FormData[],
  activeId: FormData['id']
  editing: boolean
};

/*🔹 1. Definir el estado inicial
El estado inicial es un objeto o valor que representa el estado antes de cualquier cambio.*/

export const initialState: formDataState = {
  activities: [],
  activeId: '',
  editing: false
};
// 🔹 2. Definir las acciones:Este type describe las acciones (que TIPO 'type' de accion) del reducer- payload es la informacion que se va a agregar al state. Como son esos datos? un Objeto. por eso lo definimos { } es un objeto que va a tener una nueva actividad o nueva Data y de tipo FormData. Cada Accion tiene 2 partes el type (es la descripcion) y el payload (es la informacion que modifica el state o vamos a agregar al state)
export type formDataActions = 
{type: 'save-activity', payload: { newActivity: FormData }} |
{type: 'set-activeId', payload: { id: FormData['id'] }} |
{type: 'delete-activeId', payload: { id: FormData['id'] }} 

/*🔹 3. Crear la función reducer
La función reducer toma dos parámetros:

state: El estado actual.
action: Un objeto que define el tipo de acción a realizar. action es el objeto que describe qué cambio se quiere hacer en el estado.
Cada propiedad debe tener definido su TYPE
Por cada tipo de accion (action.type) se ejecuta una funcion (codigo que actualiza el state)
DISPATCH es quien conecta o DISPARA las ACCIONES del reducer y cada accion lleva un payload. Por eso DISPATCH maneja action.type o action.payload.
*/

export const formDataReducer = (
    state: formDataState = initialState, 
    action: formDataActions
) => {
    if(action.type === 'save-activity'){
        //Este codigo maneja la logica para actualizar el state. Luego Siempre va return {}
        let upDatedActivities: FormData[] = []
        if(state.activeId){
            upDatedActivities= state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
          
        }else{
            upDatedActivities = [...state.activities, action.payload.newActivity]
          
        }

        return{
            ...state,
            activities: upDatedActivities,
            activeId : '',
            editing: false
        }
        
    }

    if(action.type === 'set-activeId'){

        return{
            ...state,
            activeId: action.payload.id,
            editing: true
        }
    }

    if (action.type === 'delete-activeId'){
      let upDatedActivities =  state.activities.filter(activity => activity.id !== action.payload.id)
        return{
            ...state,
            activities : upDatedActivities
        }
    }


    return state
};

/*Explicacion del Reducer:

Actualización del estado


return{
    ...state,
    activities: [...state.activities, action.payload.newActivity]
}
Se retorna un nuevo objeto de estado con:
...state: Copia el estado actual para no perder otros datos.
activities: [...state.activities, action.payload.newActivity]:
Se copia el array de activities actual.
Se agrega una nueva actividad (action.payload.newActivity).

Cuando estamos editando, creamos una variable UpdatedActivities y REESCRIBIMOS la actividad cuando activeId tenga algo y sino AGREGAMOS la newActivity

Reescribir: 
if(state.activeId){
            upDatedActivities= state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)

Agregar:
 }else{
            upDatedActivities = [...state.activities, action.payload.newActivity]
        }

Retornamos: 
    return{
            ...state,
            activities: upDatedActivities,
            activeId : ''
        }

Retorno por defecto:
return state;
Si la acción no es 'save-activity', el reducer simplemente devuelve el estado sin cambios.


*/


/*El término "reducer" proviene del concepto de reducción en programación funcional. En este contexto, el nombre tiene su origen en el método reduce() que existe en lenguajes como JavaScript, donde una operación se aplica de manera acumulativa sobre una colección para reducirla a un solo valor.

En React, un reducer es una función que toma un estado actual y una acción, y los "reduce" a un nuevo estado. Esencialmente, reduce múltiples entradas (estado actual y acción) a una sola salida: el nuevo estado

Así como reduce() en JavaScript convierte un array a un único valor, el reducer convierte dos entradas (estado actual y acción) en una única salida (nuevo estado).

reducer()--> toma estado actual y una accion

initialSate()--> lo que tiene inicialmente el form {objeto...} en base a las "entradas-interacciones del usuario" se va actualizando el state.. esas acciones se van a REDUCIR a un NUEVO ESTADO, es similar a los valores de inicio de useState

*/

/* Para Editar: usamos map que devuelve un array. Cuando encontramos el id igual al id activo, retornamos ese mismo objeto, es decir, lo reescribimos todo (newActivity tiene todos los campos id, cat, caloroies, name) cuando lo retornamos en UpdatedActivities lo retornamos TODO, con el ID que YA tenia. Si los Ids son diferentes retornamos la misma actividad que esta en el array

*/
