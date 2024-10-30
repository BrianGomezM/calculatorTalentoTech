import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Boton from './Boton';
import Axios from 'axios';

function App() {
  const [mostrar, setMostrar] = useState("0");
  const [operador, setOperador] = useState(null);
  const [evaluar, setEvaluar] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const clicknumero = (num) => {
    setMostrar((prev) => (prev === "0" ? String(num) : prev + num));
  };

  const clickOperador = (op) => {
    setOperador(op);
    setEvaluar(mostrar);
    setMostrar("0");
  };

  const calcular = () => {
    if (operador && evaluar) {
      const actual = parseFloat(mostrar);
      const previo = parseFloat(evaluar);
      let result;

      switch (operador) {
        case "+":
          result = previo + actual;
          break;
        case "-":
          result = previo - actual;
          break;
        case "*":
          result = previo * actual;
          break;
        case "/":
          result = actual !== 0 ? previo / actual : "Error";
          break;
        case "%":
          result = (previo * actual) / 100;
          break;
        default:
          return;
      }
      setMostrar(String(result));
      setOperador(null);
      setEvaluar(null);
    }
  };

  const limpiar = () => {
    setMostrar("0");
    setEvaluar(null);
    setOperador(null);
  };

  const leerArchivo = (event) => {
    const dato = event.target.files[0];
    if (dato) {
      const leer = new FileReader();
      leer.onload = (e) => {
        const json = JSON.parse(e.target.result);
        setJsonData(json);
        console.log(json);
      };
      leer.readAsText(dato);
    }
  };

  const enviarJson = async () => {
    try {
      const response = await Axios.post('http://localhost:3001/json', {
        json: jsonData
      });
      alert(`Datos enviados correctamente: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Error al enviar:', error);
    }
  };

  return (
    <div className="App">
      <div className="datos">
        <header className="bg-primary text-white py-3">
          <div className="container">
            <h4 className="text-center">Proyecto de Nivelación Calculadora</h4>
          </div>
        </header>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="form-control text-end mb-3 fs-3">{mostrar}</div>
              <div className="row g-2">
                {[7, 8, 9].map((num) => (
                  <div className="col-3" key={num}>
                    <Boton texto={num} onClick={() => clicknumero(num)} />
                  </div>
                ))}
                <div className="col-3">
                  <Boton texto="/" onClick={() => clickOperador("/")} tipo="primario" />
                </div>
              </div>
              <div className="row g-2 mt-2">
                {[4, 5, 6].map((num) => (
                  <div className="col-3" key={num}>
                    <Boton texto={num} onClick={() => clicknumero(num)} />
                  </div>
                ))}
                <div className="col-3">
                  <Boton texto="*" onClick={() => clickOperador("*")} tipo="primario" />
                </div>
              </div>
              <div className="row g-2 mt-2">
                {[1, 2, 3].map((num) => (
                  <div className="col-3" key={num}>
                    <Boton texto={num} onClick={() => clicknumero(num)} />
                  </div>
                ))}
                <div className="col-3">
                  <Boton texto="-" onClick={() => clickOperador("-")} tipo="primario" />
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col-3">
                  <Boton texto="0" onClick={() => clicknumero(0)} />
                </div>
                <div className="col-3">
                  <Boton texto="%" onClick={() => clickOperador("%")} />
                </div>
                <div className="col-3">
                  <Boton texto="." onClick={() => clicknumero(".")} />
                </div>
                <div className="col-3">
                  <Boton texto="+" onClick={() => clickOperador("+")} tipo="primario" />
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col-12">
                  <Boton texto="=" onClick={calcular} tipo="primario" />
                </div>
                <div className="col-12 mt-2">
                  <Boton texto="C" onClick={limpiar} tipo="primario" />
                </div>
                <div className="col-12 mt-2">
                  <input
                    type="file"
                    className="form-control"
                    onChange={leerArchivo}
                  />
                  <div className="col-12">
                    <Boton texto="Procesar" onClick={enviarJson} tipo="primario" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>Hecho por Brayan Julio Gomez Muñoz</p>
        </div>
        <p className="footer-copy">© 2024 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;
