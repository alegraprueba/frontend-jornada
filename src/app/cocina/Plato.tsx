"use client";

import { useEffect, useState } from "react";
import IPlato from "../interfaces/IPlato";
import listarPlatos from "../services/listarPlatos";
import ordenarPlato from "../services/ordenarPlato";
import recibirOrden from "../services/recibirOrden";
import seleccionarPlato from "../services/seleccionarPlato";

export default function PlatosList() {
  const initialValuePlato: IPlato[] = [{
    id: "", nombre: "", ingredientes: [{
      ingrediente: "", cantidad: 0
    }]
  }]
  const [platos, setPlatos] = useState(initialValuePlato);
  const [loading, setLoading] = useState(true);
  
  const initialValueError: string = ""
  const [error, setError] = useState(initialValueError);

  const initialValueOrdenGenerada: string = ""
  const [ordenGenerada, setOrdenGenerada] = useState(initialValueOrdenGenerada);

  const initialValueMessage: string = ""
  const [message, setMessage] = useState(initialValueMessage);

  const initialValuePlatoSeleccionado: IPlato = {
    id: "", nombre: "", ingredientes: [{
      ingrediente: "", cantidad: 0
    }]
  }
  const [platoSeleccionado, setPlatoSeleccionado] = useState(initialValuePlatoSeleccionado)

  useEffect(() => {
    listarPlatos(
      setPlatos,
      setError,
      setLoading
    )
  }, []);

  const handleOrdenarPlato = async () => {
    await ordenarPlato(setOrdenGenerada, setMessage);
    console.log("Orden generada: ", ordenGenerada)
    if(ordenGenerada != "") {
      alert(message)
    }
    else {
      alert("Ingrese de nuevo su solicitud.")
    }
  };

  const handlePlatoSeleccionado = async () => {
    await seleccionarPlato(
      setPlatoSeleccionado,
      setError,
      setLoading
    )

    if(platoSeleccionado.id != "") {
      await recibirOrden(
        platoSeleccionado,
        setMessage
      )
      alert(message)
    }
    else {
      alert("Seleccione un plato por favor.")
    }
  }

  if (loading) return <p>Cargando listado de platos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded disabled:bg-gray-400"
                  // disabled={pedido.estado === 'FINALIZADO'}
                  onClick={handleOrdenarPlato}
                >
                  NUEVA ORDEN
                </button>
            </td>
            <td>
              <button
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded disabled:bg-gray-400"
              // disabled={pedido.estado === 'FINALIZADO'}
              onClick={() => handlePlatoSeleccionado()}
              >
              SELECCIONAR PLATO
              </button>
            </td>
          </tr>
        </thead>
      </table>

      <ul className="space-y-4">
        {platos.map((plato: any) => (
          <li key={plato.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{plato.nombre}</h2>
            <p className="text-gray-600">Ingredientes:</p>
            <ul className="list-disc list-inside">
              {plato.ingredientes.map((ing: any, index: any) => (
                <li key={index}>{`${ing.cantidad} x ${ing.ingrediente}`}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
