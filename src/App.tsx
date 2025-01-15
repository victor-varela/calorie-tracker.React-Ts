import Form from "./components/Form";

function App() {
  return (
    <>
      <header className="bg-lime-600 w-full p-5 flex justify-around">
        <h1 className="font-bold text-white uppercase text-xl">Contador de Calorias</h1>
        <button>Reiniciar App</button>
      </header>
      <section className="bg-lime-500 py-20">
      {/* contendor "centrador-brocha gorda" que rodea al Componente */}
        <div className="max-w-4xl mx-auto"> 
          <Form />
        </div>
      </section>
    </>
  );
}

export default App;

//Los contenedores de presentacion "brocha gorda" se dejan en App.tsx y los estilos de los componentes se hacen en el mismo componente. Este enfoque dicta que si voy a renderizar un componente que esta dentro de un contenedor entonces ese contenedor estilizarlo fuera del componente. Asi el componente es mas "limpio" con los estilos mas personalizados. El div que rodea a Form es un div "centrador- para ubicarlo en el centro del documento solo establece las medidas" el Form tiene en sus estilos la apariencia mas especifica. Entonces, usa los Divs centradores o de maquetacion como en este caso el section solo tiene el color de fondo y se aplica a todo el ancho del documento y la separacion vertical y el div que rodea al Form que ya se dijo su funcion. Se puede decir que hay 2 divs por cada componente, el "grande- Section" y el "centrador" luego viene el componente.
