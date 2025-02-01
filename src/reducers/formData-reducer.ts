import { FormData } from "../types";

//Definimos los Type conforme vamos creando variables y funciones:

//Este type describe las acciones del reducer
export type formDataActions = {};

//InicialState debe tener tambien asignado un type. Ese state sera un array de objetos. Los objetos  son todas las interacciones del usuario que va a ir creando ya sea "comida" o "ejercicio" por eso el type es un array tambien. Es el mismo type que FormData que ya definimos en type. Entonces lo traemos a este componente.

/*Este paso previo o de preparacion es como una cascada de types
🌊 Cascada de Tipos en TypeScript
El concepto de cascada de tipos en este código significa que cada tipo se basa en otro previamente definido, creando una cadena de dependencias. Es como construir un edificio donde cada piso se apoya en el anterior.


Este código define tipos en TypeScript utilizando una estructura en cascada. Veamos cómo funciona este patrón:

🌊 Cascada de Tipos en TypeScript
El concepto de cascada de tipos en este código significa que cada tipo se basa en otro previamente definido, creando una cadena de dependencias. Es como construir un edificio donde cada piso se apoya en el anterior.

🔹 Nivel 1: Tipo Base (FormData)
import { FormData } from "../types"

Aquí se importa un tipo llamado FormData desde otro archivo.
FormData es la base sobre la que se construyen los demás tipos.


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


*/

type formDataState = {
  activities: FormData[];
};

/*🔹 1. Definir el estado inicial
El estado inicial es un objeto o valor que representa el estado antes de cualquier cambio.*/

export const initialSate: formDataState = {
  activities: [],
};

/*🔹 2. Crear la función reducer
La función reducer toma dos parámetros:

state: El estado actual.
action: Un objeto que define el tipo de acción a realizar
Cada propiedad debe tener definido su TYPE
*/

export const formDataReducer = (
    state: formDataState = initialSate, 
    action: formDataActions
) => {
    
};

/*El término "reducer" proviene del concepto de reducción en programación funcional. En este contexto, el nombre tiene su origen en el método reduce() que existe en lenguajes como JavaScript, donde una operación se aplica de manera acumulativa sobre una colección para reducirla a un solo valor.

En React, un reducer es una función que toma un estado actual y una acción, y los "reduce" a un nuevo estado. Esencialmente, reduce múltiples entradas (estado actual y acción) a una sola salida: el nuevo estado

Así como reduce() en JavaScript convierte un array a un único valor, el reducer convierte dos entradas (estado actual y acción) en una única salida (nuevo estado).

reducer()--> toma estado actual y una accion

initialSate()--> lo que tiene inicialmente el form {objeto...} en base a las "entradas-interacciones del usuario" se va actualizando el state.. esas acciones se van a REDUCIR a un NUEVO ESTADO, es similar a los valores de inicio de useState

*/
