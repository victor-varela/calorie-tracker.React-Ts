import Form from "./components/Form";

function App() {
  return (
    <>
      <header className="bg-lime-600 w-full p-5 flex justify-around">
        <h1 className="font-bold text-white uppercase text-xl">Contador de Calorias</h1>
        <button>Reiniciar App</button>
      </header>
      <Form />
    </>
  );
}

export default App;
