"use client";
import { useEffect, useState } from "react";
import listarIngredientes from "../services/listarIngredientes";
import IIngrediente from "../interfaces/IIngrediente";

export default function IngredientesList() {
  const initialStateIngrediente: IIngrediente[] = [{
    id: "", nombre: "", cantidad: 0, medida: ""
  }]
  const [ingredientes, setIngredientes] = useState(initialStateIngrediente);
  const [loading, setLoading] = useState(true);
  const initialStateError: string = ""
  const [error, setError] = useState(initialStateError);

  useEffect(() => {
    listarIngredientes(
      setIngredientes, 
      setError,
      setLoading
    )
  }, []);

  if (loading) return <p>Cargando ingredientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Lista de ingredientes disponibles</h1> */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ingrediente: any) => (
            <tr key={ingrediente.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{ingrediente.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{ingrediente.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
