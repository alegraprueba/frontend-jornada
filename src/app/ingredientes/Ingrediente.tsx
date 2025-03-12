"use client";
import { useEffect, useState } from "react";

export default function IngredientesList() {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const response = await fetch(
          "https://vmq0un5d82.execute-api.us-east-2.amazonaws.com/ingredientes"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los ingredientes");
        }
        const data = await response.json();
        setIngredientes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientes();
  }, []);

  if (loading) return <p>Cargando ingredientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Ingredientes</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Medida</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ingrediente) => (
            <tr key={ingrediente.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{ingrediente.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{ingrediente.cantidad}</td>
              <td className="border border-gray-300 px-4 py-2">{ingrediente.medida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
