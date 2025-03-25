"use client";
import { useEffect, useState } from "react";
import plazaMercado from "../services/apiPlazaMercado";
import IInventario from "../interfaces/IInventario";

export default function PlazaMercadoList() {
  const initialStateInventario: IInventario[] = [{ cantidad: 0, producto: "", disponible: "" }]
  const [inventario, setInventarioPlaza] = useState(initialStateInventario);
  const [loading, setLoading] = useState(true);
  const initialStateError: string = ""
  const [error, setError] = useState(initialStateError);

  useEffect(() => {
    plazaMercado(
      setInventarioPlaza, 
      setError,
      setLoading
    )
  }, []);

  if (loading) return <p>Cargando stock plaza mercado...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Lista de ingredientes disponibles</h1> */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Producto</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Es producto disponible</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((inventario: any) => (
            <tr key={inventario.producto} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{inventario.producto}</td>
              <td className="border border-gray-300 px-4 py-2">{inventario.cantidad}</td>
              <td className="border border-gray-300 px-4 py-2">{inventario.disponible}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}